#############################################################
#
# PART 1
# ENVIRONMENT SETUP
#
#############################################################

CHARTMUSEUM := http://172.16.0.32:9191
CURRENT=$(shell pwd)

#*Change Per Application
CHARTNAME := nuclei-on-prem-csr-ui

.DEFAULT_GOAL := all

APPNAME := federal

ifndef NAMESPACE
NAMESPACE := default
endif

ifndef JAVA_IMAGE
JAVA_IMAGE := asia.gcr.io/kubernets-sdk/java-docker:v2
endif


CONFIGFILE := Chart/nuclei-on-prem-csr-ui/values.yaml

OS := $(shell uname)

ifndef IMAGE_TAG
IMAGE_TAG := $(shell git rev-parse --short HEAD)
endif

ifndef NAMESPACE
NAMESPACE := cabs-staging
endif

ifndef PROFILE
PROFILE := federal-uat
endif

CHART_VERSION := $(subst v,,${tag})

ifndef DOCKER_REGISTRY
DOCKER_REGISTRY := mycluster.icp:8500/default
endif

ifndef CHART_API
CHART_API := http://10.250.24.111:8080/api/nuclei/uat/charts
endif

ifndef CHART_REPO
CHART_REPO := museum111
endif

#############################################################
#
# PART 2
# a) Kubernetes Cluster Configuration
# b) Building the Application's Jar File using Gradlew and Docker
# c) Testing the Application using Gradlew and Docker
# d) Building the Docker Image and Pushing it to docker repository
# e) Cleaning the Application Build

.PHONY: all main-start build-jar docker-build chart-publish chart-install chart-upgrade chart-delete

all: main-start build-jar docker-build chart-publish chart-delete chart-install

main-start: #mainstart
	@echo "Starting off by checking Git status...\n"
	@git status
	@echo "Changing the Kubernetes Cluster Configuration ..."
	@sudo kubectl config set-context ${KUBE_CLUSTER} --namespace ${NAMESPACE}

build-jar: #Building the Jar File
	@echo "The App is being Built now."
	#@echo ${CURRENT}
	@sudo docker run  -v ${CURRENT}:/app ${JAVA_IMAGE} sh -c "./gradlew clean build -x test"
	#@./gradlew clean build #-x test
	@echo App Built

testing-gradle: #Running Tests using Gradle
	@echo "Running Tests now"
	@sudo docker run  -v ${CURRENT}:/app ${JAVA_IMAGE} sh -c "./gradlew test"
	@echo "Test Result = ${BUILD_STATUS}"

docker-build:
	docker build --no-cache -t ${DOCKER_REGISTRY}/${CHARTNAME}:${CHART_VERSION} .
	docker push ${DOCKER_REGISTRY}/${CHARTNAME}:${CHART_VERSION}

build-service:
	sudo docker run  -v ${CURRENT}:/app ${JAVA_IMAGE} sh -c "./gradlew clean build -x test"

skaffold-build:  #Docker Image Build and Push

	VERSION=`cat VERSION` skaffold build -f skaffold.yaml -p ${PROFILE} -n ${NAMESPACE} --default-repo ${DOCKER_REGISTRY}

skaffold-deploy:  #Docker Image Build and Push
	VERSION=`cat VERSION` skaffold deploy -f skaffold.yaml -p ${PROFILE} -n ${NAMESPACE} --default-repo ${DOCKER_REGISTRY}

publish-service:
	helm package --version ${CHART_VERSION} --app-version ${CHART_VERSION} ./Chart/${CHARTNAME}
	-curl -X DELETE ${CHART_API}/${CHARTNAME}/${CHART_VERSION}
	curl --data-binary "@${CHARTNAME}-${CHART_VERSION}.tgz" ${CHART_API}
clean-build:
	@sudo docker run -v "${HOME}/.gradle":/root/.gradle -v ${CURRENT}:/app ${JAVA_IMAGE} sh -c "./gradlew clean"

#
# END OF PART 2
#
#############################################################
#############################################################
#
# PART 3
#
# a) Update the Chart Version
# b) Publish the Chart by creating a package and pushing to Chartmuseum
# c) Install the Chart, deploying the application into Kubernetes and show Pods, Deps, Services and VS
# d) Upgrade the release (Change Existing Pods)
# e) Delete the release (purge and remove all resources)

get-tags:
	$(eval CHARTVERSION_OLD := $(shell grep -w version Chart/${CHARTNAME}/Chart.yaml | sed -e 's/^.\{9\}//'))
	@echo ${CHARTVERSION_OLD}
	$(eval VERSION := $(shell docker run ${SEM_VER_IMAGE} sh -c "./app up patch ${CHARTVERSION_OLD}"))
	@echo ${VERSION} > VERSION


tag-service:
ifeq ($(OS),Darwin)
	sed -i "" -e "s|repository: .*|repository: ${DOCKER_REGISTRY}/${CHARTNAME}|" ./Chart/${CHARTNAME}/values.yaml
	sed -i "" -e "s/tag: .*/tag: ${CHART_VERSION}/" Chart/${CHARTNAME}/values.yaml
else ifeq ($(OS),Linux)
	sed -i -e "s|repository: .*|repository: ${DOCKER_REGISTRY}/${CHARTNAME}|" ./Chart/${CHARTNAME}/values.yaml
	sed -i -e "s/tag: .*/tag: ${CHART_VERSION}/" Chart/${CHARTNAME}/values.yaml
endif

tags:
ifeq ($(OS),Darwin)
	@sed -i "" -e "s/version:.*/version: ${VERSION}/" Chart/${CHARTNAME}/Chart.yaml
	@sed -i "" -e "s|repository: .*|repository: ${IMAGE}|" Chart/${CHARTNAME}/values.yaml
	@sed -i "" -e "s/tag: .*/tag: ${IMAGE_TAG}/" Chart/${CHARTNAME}/values.yaml
else ifeq ($(OS),Linux)
	@sed -i -e "s/version:.*/version: ${VERSION}/" Chart/${CHARTNAME}/Chart.yaml
	@sed -i -e "s|repository: .*|repository: ${IMAGE}|" Chart/${CHARTNAME}/values.yaml
	@sed -i -e "s/tag: .*/tag: ${IMAGE_TAG}/" Chart/${CHARTNAME}/values.yaml
endif


chart-publish: #Helm Package Creation, Duplicate Deleted from Museum and Push
	@sudo rm -rf *.tgz
	@sudo helm package ./Chart/${CHARTNAME} --version ${VERSION} --app-version ${VERSION}
	@echo "Chart Created with the name ${CHARTNAME}.tgz "
	@sudo helm repo update
	@echo $(VERSION)
	-curl -X DELETE ${CHARTMUSEUM}/api/nuclei/dev/charts/${CHARTNAME}/${VERSION}
	@for n in {1..3}; do echo "" ; done
	@echo " Removed any Old Chart With Same Version "
	@sudo helm push ${CHARTNAME}-${VERSION}.tgz ${CHART_REPO}

chart-install: #Helm Install from Package
	@-sudo helm repo update
	@echo "Helm is now Installing the Chart."
	@sudo helm install -f ${CONFIGFILE} --name ${HELMRELEASENAME} ${CHART_REPO}/${CHARTNAME} --namespace ${NAMESPACE} --set ingress.gateway=${NAMESPACE}-gateway --set ingress.hostname=${HOST_URL}
	@sudo helm ls -d
	@echo "Helm has installed the chart."
	@echo " PODS "
	@kubectl get pods -n ${NAMESPACE}
	@echo " DEPLOYMENTS "
	@kubectl get deployments -n ${NAMESPACE}
	@echo " SERVICES "
	@kubectl get svc -n ${NAMESPACE}
	@echo " VIRTUAL SERVICES "
	@kubectl get virtualservice -n ${NAMESPACE}

chart-upgrade: #Helm Upgrading the Release
	@echo "Helm will now upgrade the chart."
	@sudo helm upgrade ${HELMRELEASENAME} ./Chart/${CHARTNAME} -f ${CONFIGFILE}

chart-delete: #Helm Deletion of Release
	@echo "Helm will now purge this release"
	@-sudo helm delete --purge ${HELMRELEASENAME}

#
# END OF PART 3
#############################################################
# Test auto trigger
#
