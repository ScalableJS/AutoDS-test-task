import React from 'react';
import { Controller } from 'react-hook-form';
import { Alert, Input, Form } from 'antd';
import * as yup from 'yup';
import { en } from '../translations/en';

export const personalInfoSchema = yup.object({
    fullName: yup
        .string()
        .required(en.requiredFullName)
        .matches(/^[a-zA-Z]{3,}\s[a-zA-Z]{3,}$/, en.invalidFullName),
});

const StepPersonalInfo = ({ control, errors }) => (
    <>
        <Form.Item label="Full Name" htmlFor="fullName">
            <Controller
                name="fullName"
                control={control}
                render={({ field }) => <Input id="fullName" {...field} />}
            />
            {errors.fullName && (
                <Alert message={errors.fullName.message} type="error" />
            )}
        </Form.Item>
    </>
);

export default StepPersonalInfo;
