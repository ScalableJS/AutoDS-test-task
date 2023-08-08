import React from 'react';
import { Controller } from 'react-hook-form';
import { Input, Alert, Form } from 'antd';
import * as yup from 'yup';

const StepPaymentPayPal = ({ control, errors }) => {
    return (
        <>
            <Form.Item label="PayPal Email" htmlFor="paypalEmail">
                <Controller
                    name="paypalEmail"
                    control={control}
                    render={({ field }) => (
                        <Input id="paypalEmail" {...field} />
                    )}
                />
                {errors.paypalEmail && (
                    <Alert message={errors.paypalEmail.message} type="error" />
                )}
            </Form.Item>
        </>
    );
};

export default StepPaymentPayPal;
