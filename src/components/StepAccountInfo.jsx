import React from 'react';
import { Controller } from 'react-hook-form';
import { Input, Alert, Form } from 'antd';

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
