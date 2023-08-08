import { PaymentMethods } from './constants';
const formatFormData = (data) => {
    const fullNameParts = data.fullName.split(' ');

    const formattedData = {
        firstName: fullNameParts[0],
        lastName: fullNameParts[1],
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        paymentMethod: {},
    };

    if (data.paymentMethod === PaymentMethods.PAYPAL) {
        formattedData.paymentMethod = {
            type: PaymentMethods.PAYPAL,
            email: data.paypalEmail,
        };
    } else if (data.paymentMethod === PaymentMethods.CREDIT_CARD) {
        formattedData.paymentMethod = {
            type: PaymentMethods.CREDIT_CARD,
            cardNumber: data.cardNumber,
        };
    }

    return formattedData;
};

export default formatFormData;
