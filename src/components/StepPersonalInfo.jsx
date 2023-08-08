import React from 'react';
import { Controller } from 'react-hook-form';
import { Alert, Input, Form } from 'antd';
import * as yup from 'yup';

export const personalInfoSchema = yup.object({
    fullName: yup
        .string()
        .required('Full Name is required')
        .matches(
            /^[a-zA-Z]{3,}\s[a-zA-Z]{3,}$/,
            'Full Name should contain at least 2 words, each with at least 3 letters and only letters',
        ),
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
