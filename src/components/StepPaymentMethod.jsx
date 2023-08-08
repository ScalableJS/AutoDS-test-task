import React from 'react';
import { Controller } from 'react-hook-form';
import { Radio, Form } from 'antd';
import StepPaymentPayPal from './StepPaymentPayPal';
import StepPaymentCreditCard from './StepPaymentCreditCard';
import * as yup from 'yup';

export const paymentMethodSchema = yup.object({
    paymentMethod: yup
        .string()
        .required('Payment Method is required')
        .required('Please select a payment method'),
    paypalEmail: yup
        .string()
        .when('paymentMethod', (paymentMethod, schema) =>
            paymentMethod[0] === 'pp'
                ? schema
                      .required('PayPal Email is required')
                      .email('Invalid email format')
                : yup.string().nullable(),
        ),
    cardNumber: yup
        .string()
        .when('paymentMethod', (paymentMethod, schema) =>
            paymentMethod[0] === 'cc'
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
                            <Radio value="pp">PayPal</Radio>
                            <Radio value="cc">Credit Card</Radio>
                        </Radio.Group>
                    )}
                />
                {errors.paymentMethod && <p>{errors.paymentMethod.message} </p>}
            </Form.Item>

            {paymentMethod === 'pp' && (
                <StepPaymentPayPal control={control} errors={errors} />
            )}
            {paymentMethod === 'cc' && (
                <StepPaymentCreditCard control={control} errors={errors} />
            )}
        </>
    );
};

export default StepPaymentMethod;
