export class UserBasicDetails {
  walletDetails: WalletDetails;
  VPAs: VPAS[];
  accounts: Account[];
  userDetails: UserDetails;
  user_type: string;
}

export class WalletDetails{
  walletStatus: string;
  cash: string;
  cashback: string;
}

export class VPAS{
  VIRTUAL_ID: string;
}

export class Account{
  ACCOUNTNUMBER: string;
  CATEGORY: string;
  IFSC: string;
}

export class UserDetails{
  mobile: string;
  email: string;
  user_uid: string;
  device_id: string;
  analytics_id: string;
  partner_name: string;
  partner_id: string;
  status: string;
  app_version_code: string;
  multiple_partners: string;
  is_rooted_device: string;
  is_referred_user:string;
  referred_user: string;
  customer_name: string;
  login_date_time: string;
  login_mode: string;
  created_time: string;
  dob: string;
  login_failure_attempt: number;
  cust_quick_limit: string;
  address1: string;
  state: string;
  default_account_number: string;
  city: string;
  country: string;
  pin: string;
  last_pwd_change_date: string;
  login_failure_date: string;
  address2: string;
  upi_status: string;
  wallet_status: string;
  non_operative: string;
}
