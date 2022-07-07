interface PaymentDisplyObject {
  card_quita?: Array<number>;
  digital?: boolean;
  vbank_due?: string;
  m_redirect_url?: string;
  app_scheme?: string;
  biz_num?: string;
}

interface PaymentData {
  pg?: string;
  pay_method: string;
  escrow?: boolean;
  merchant_uid: string;
  name?: string;
  amount: number;
  custom_data?: object;
  tax_free?: number;
  currency?: string;
  language?: string;
  buyer_name?: string;
  buyer_tel: string;
  buyer_email?: string;
  buyer_addr?: string;
  buyer_postcode?: string;
  confirm_url?: string;
  notice_url?: string | Array<string>;
  display?: PaymentDisplyObject;
}

export interface PayBtnPropsType {
  data: PaymentData;
  amountText: string;
}

export interface ProductPropsType {
  name: string;
  price: string;
  allProduct?: string;
}

export interface callbackRes {
  success: boolean;
  error_code: string;
  error_msg: string;
  imp_uid: string;
  merchant_uid: string;
  pay_method?: string;
  paid_amount?: number;
  status?: string;
  name?: string;
  pg_provider?: string;
  emb_pg_provider?: string;
  pg_tid?: string;
  buyer_name?: string;
  buyer_email?: string;
  buyer_tel?: string;
  buyer_addr?: string;
  buyer_postcode?: string;
  custom_data?: object;
  paid_at?: number;
  receipt_url?: string;
  apply_num?: string;
  vbank_num?: string;
  vbank_name?: string;
  vbank_holder?: string;
  vbank_date?: number;
}

export interface ShippingProps {
  inputType: string;
  name: string;
  id?: string;
  value: string;
  changeUserData?: JSX.IntrinsicElements["input"]["onChange"];
  important?: boolean;
}

export interface PayBtnProps {
  name: string;
  isPayType: boolean;
  // payTypeClick: any;
  payTypeClick?: JSX.IntrinsicElements["label"]["onClick"];
  id?: string;
}
