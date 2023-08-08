import React from 'react';
import { Controller } from 'react-hook-form';
import { Input, Alert, Form } from 'antd';
import { en } from '../translations/en';

const StepPaymentPayPal = ({ control, errors }) => {
    return (
        <>
            <Form.Item label={en.paypalEmail} htmlFor="paypalEmail">
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
