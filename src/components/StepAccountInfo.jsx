import React from 'react';
import { Controller } from 'react-hook-form';
import { Input, Alert, Form } from 'antd';
import * as yup from 'yup';
import { en } from '../translations/en';

export const accountInfoSchema = yup.object({
    email: yup.string().required(en.requiredEmail).email(en.invalidEmail),
    password: yup
        .string()
        .required(en.requiredPassword)
        .min(8, en.minLengthPassword)
        .matches(/^(?=.*[A-Z])(?=.*\d)/, en.patternPassword),
    confirmPassword: yup
        .string()
        .required(en.requiredConfirmPassword)
        .oneOf([yup.ref('password'), null], en.passwordsMustMatch),
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
