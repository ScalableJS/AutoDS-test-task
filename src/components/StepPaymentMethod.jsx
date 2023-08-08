import React from 'react';
import { Controller } from 'react-hook-form';
import { Radio, Form } from 'antd';
import StepPaymentPayPal from './StepPaymentPayPal';
import StepPaymentCreditCard from './StepPaymentCreditCard';

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
