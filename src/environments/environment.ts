// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  login_url: 'https://10.199.14.55/api/on-prem-csr/auth',
    search_url: "https://10.199.14.55/api/on-prem-csr",
    page_size: 10
};
