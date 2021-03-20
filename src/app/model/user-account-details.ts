export class UserAccountDetails{
  cheque_book_request: ChequeBookRequest;
  cards: Cards[];
  GH15: GHDetails[];
  CustDetails: CustomerDetails;
}

export class ChequeBookRequest{
  ACCOUNT: string;
  STATUS: string;
  INSERTDT: string;
  STATUSDESC: string;
  NOOFLEAVES: string;
}
export class Cards{
  DESCRIPTION: string | null;
  CARD_TYPE:string | null;
  CARD_STATUS:string | null;
  CARD_NUMBER:string | null;
}
export class GHDetails{
  REQTYPE: string;
  INSERTDT: string;
  FORMTYPE: string;
}

export class CustomerDetails{
  limit_used: string;
  national_id: string;
  status: string;
}
