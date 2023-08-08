import React from 'react';
import { Controller } from 'react-hook-form';
import { Input, Alert, Form } from 'antd';
import * as yup from 'yup';

export const accountInfoSchema = yup.object({
    email: yup
        .string()
        .required('Email is required')
        .email('Invalid email format'),
    password: yup
        .string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(
            /^(?=.*[A-Z])(?=.*\d)/,
            'Password must contain at least one uppercase letter and one digit',
        ),
    confirmPassword: yup
        .string()
        .required('Confirm Password is required')
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const StepAccountInfo = ({ control, errors }) => {
    return (
        <>
            <Form.Item label="Email" htmlFor="email">
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => <Input id="email" {...field} />}
                />
                {errors.email && (
                    <Alert message={errors.email.message} type="error" />
                )}
            </Form.Item>
            <Form.Item label="Password" htmlFor="password">
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <Input id="password" type="password" {...field} />
                    )}
                />
                {errors.password && (
                    <Alert message={errors.password.message} type="error" />
                )}
            </Form.Item>
            <Form.Item label="Confirm Password" htmlFor="confirmPassword">
                <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field }) => (
                        <Input
                            id="confirmPassword"
                            type="password"
                            {...field}
                        />
                    )}
                />
                {errors.confirmPassword && (
                    <Alert
                        message={errors.confirmPassword.message}
                        type="error"
                    />
                )}
            </Form.Item>
        </>
    );
};

export default StepAccountInfo;
