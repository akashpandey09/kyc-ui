export class OrderInfoDetails {
    order_details: any;
    cashback_details: CashbackDetails;
    coupon_details: CouponAppliedDetails;
    payment_details: PaymentInfo;
    pricing_details: PricingDetails;
    refund_details: RefundDetails;
}

export class CommonOrderDetails {
    transaction_id: string;
    transaction_date: string;
    last_status_change_date: string;
    payment_gateway: string;
    category_id: number;
    category_name: string;
    order_state: string;
    order_uid: string;
    service_provider: string;
    reason_for_failure: string;
}

export class RechargeOrderDetails extends CommonOrderDetails{
    sub_category: string;
    ezypay_status: string;
    mobile_number: string;
    operator_ref_id: string;
    is_first_recharge: string;
}

export class BillpaymentsOrderDetails extends CommonOrderDetails {
    bill_type: string;
    coupon_code: string;
    sub_category: number;
    mobile_number: number;
    bill_company_type: string;
    biller: string;
    consumer_id: string;
    bill_generation_date: string;
    bill_amount: number;
    is_first_billpayment: string;
}

export class FlightsOrderDetails extends CommonOrderDetails {
    external_order_id: string;
    eticket: string;
    base_fare: number;
    total_fare: number;
    tax: number;
    service_charge: number;
    company_address: string;
    company_name: string;
    GST_No: string;
    refund_amount: number;
    cancelled_date: string;
    customer_id: string;
    adults: number;
    children: number;
    infants: number;
    airline_charges: number;
    departure_time: string;
    arrival_time: string;
    departure: string;
    onward_refundable: string;
    return_refundable: string;
    arrival: string;
    return_date: string;
    onward_date: string;
    journey_date: string;
}

export class CabsOrderDetails extends CommonOrderDetails{
    external_order_id: string;
    fare_estimate: number;
    actual_fare_charged: number;
    trip_start_time: string;
    is_first_ride: string;
    distance: string;
    vehicle_type: string;
    duration: string;
    booking_status: string;
    total_owed_amount: number;
}

export class PaymentInfo {
    payment_mode: string;
    name: string;
    payment_status: string;
}

export class CashbackDetails {
    credit_type: string;
    credit_status: string;
    credit_effective_date: string;
    amount: number;
    message: string;
    points_redeemed: string;
    redeemed_date: string;
}

export class PricingDetails {
    order_value: number;
    final_payable: number;
    GST: number;
    packaging_charges: number;
}

export class CouponAppliedDetails {
    coupon_code: string;
    status: string;
    coupon_type: string;
    description: string;
    terms: string;
    count_of_coupon_applied_by_user: number;
}

export class RefundDetails {
    is_refund_initiated: string;
    is_refund_requested: string;
    refund_status: string;
    refund_date: string;
    refund_amount: number;
    refund_type: string;
}