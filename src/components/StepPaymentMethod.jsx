import React, { useMemo } from 'react';
import { Controller } from 'react-hook-form';
import { Radio, Form, Alert } from 'antd';
import StepPaymentPayPal from './StepPaymentPayPal';
import StepPaymentCreditCard from './StepPaymentCreditCard';
import * as yup from 'yup';
import { PaymentMethods } from '../utils/constants';

export const paymentMethodSchema = yup.object({
    paymentMethod: yup.string().required('Please select a payment method'),
    paypalEmail: yup
        .string()
        .when('paymentMethod', (paymentMethod, schema) =>
            paymentMethod[0] === PaymentMethods.PAYPAL
                ? schema
                      .required('PayPal Email is required')
                      .email('Invalid email format')
                : yup.string().nullable(),
        ),
    cardNumber: yup
        .string()
        .when('paymentMethod', (paymentMethod, schema) =>
            paymentMethod[0] === PaymentMethods.CREDIT_CARD
                ? schema
                      .required('Credit Card Number is required')
                      .matches(
                          /^\d{16}$/,
                          'Invalid card number. Must be 16 digits',
                      )
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
            <Form.Item label="Payment Method" htmlFor="paymentMethod" required>
                <Controller
                    name="paymentMethod"
                    control={control}
                    rules={{
                        required: 'Please select a payment method',
                    }}
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
