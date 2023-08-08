import React, { useMemo } from 'react';
import { Controller } from 'react-hook-form';
import { Radio, Form, Alert } from 'antd';
import StepPaymentPayPal from './StepPaymentPayPal';
import StepPaymentCreditCard from './StepPaymentCreditCard';
import * as yup from 'yup';
import { PaymentMethods } from '../utils/constants';
import { en } from '../translations/en';

export const paymentMethodSchema = yup.object({
    paymentMethod: yup.string().required(en.requiredPaymentMethod),
    paypalEmail: yup
        .string()
        .when('paymentMethod', (paymentMethod, schema) =>
            paymentMethod[0] === PaymentMethods.PAYPAL
                ? schema
                      .required(en.requiredPayPalEmail)
                      .email(en.invalidPayPalEmail)
                : yup.string().nullable(),
        ),
    cardNumber: yup
        .string()
        .when('paymentMethod', (paymentMethod, schema) =>
            paymentMethod[0] === PaymentMethods.CREDIT_CARD
                ? schema
                      .required(en.requiredCardNumber)
                      .matches(/^\d{16}$/, en.invalidCardNumber)
                : yup.string().nullable(),
        ),
});

const StepPaymentMethod = ({ control, paymentMethod, errors }) => {
    const paymentComponent = useMemo(() => {
        if (paymentMethod === PaymentMethods.PAYPAL) {
            return <StepPaymentPayPal control={control} errors={errors} />;
        }
        if (paymentMethod === PaymentMethods.CREDIT_CARD) {
            return <StepPaymentCreditCard control={control} errors={errors} />;
        }
        return null;
    }, [paymentMethod, control, errors]);
    return (
        <>
            <Form.Item
                label={en.paymentMethod}
                htmlFor="paymentMethod"
                required
            >
                <Controller
                    name="paymentMethod"
                    control={control}
                    render={({ field }) => (
                        <Radio.Group id="paymentMethod" {...field}>
                            <Radio value={PaymentMethods.PAYPAL}>PayPal</Radio>
                            <Radio value={PaymentMethods.CREDIT_CARD}>
                                Credit Card
                            </Radio>
                        </Radio.Group>
                    )}
                />
                {errors.paymentMethod && (
                    <Alert
                        message={errors.paymentMethod.message}
                        type="error"
                    />
                )}
            </Form.Item>

            {paymentComponent}
        </>
    );
};

export default StepPaymentMethod;
