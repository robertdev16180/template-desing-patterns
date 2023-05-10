import PaymentType from "../enums/payment-type";
import IPaymentMethod from "./payment-method.interface";
import MasterCard from "./types/MasterCard";
import PayPal from "./types/PayPal";
import Visa from "./types/Visa";

export default class PaymentMethodFactory {

    private static readonly typeCreators: { [key in PaymentType]: () => IPaymentMethod } = {
        [PaymentType.Mastercard]: () => new MasterCard(),
        [PaymentType.PayPal]:     () => new PayPal(),
        [PaymentType.Visa]:       () => new Visa()
    }

    public static createPaymentType(type: PaymentType): IPaymentMethod {

        const paymentMethodCreator = PaymentMethodFactory.typeCreators[type];

        if (paymentMethodCreator) {
            return paymentMethodCreator();
        }

        throw new Error(`Invalid payment method type: ${PaymentType[type]}`);
    }
}