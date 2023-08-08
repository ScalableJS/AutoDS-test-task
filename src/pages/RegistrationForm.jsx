import React, { useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Steps, message, Form } from 'antd';
import StepPersonalInfo, {
    personalInfoSchema,
} from '../components/StepPersonalInfo';
import StepAccountInfo, {
    accountInfoSchema,
} from '../components/StepAccountInfo';
import StepPaymentMethod, {
    paymentMethodSchema,
} from '../components/StepPaymentMethod';
import StepNavigationButtons from '../components/StepNavigationButtons';

const formatFormData = (data) => {
    const fullNameParts = data.fullName.split(' ');

    const formattedData = {
        firstName: fullNameParts[0],
        lastName: fullNameParts[1],
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        paymentMethod: {},
    };

    if (data.paymentMethod === 'pp') {
        formattedData.paymentMethod = {
            type: 'pp',
            email: data.paypalEmail,
        };
    } else if (data.paymentMethod === 'cc') {
        formattedData.paymentMethod = {
            type: 'cc',
            cardNumber: data.cardNumber,
        };
    }

    return formattedData;
};

const RegistrationForm = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const schema = [personalInfoSchema, accountInfoSchema, paymentMethodSchema][
        currentStep
    ];

    const {
        handleSubmit,
        control,
        formState: { errors },
        watch,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            fullName: 'asd asd',
            email: 'test@email.com',
            password: 'aBcd1234',
            confirmPassword: 'aBcd1234',
            paymentMethod: 'pp',
        },
    });

    // Watch for changes in the paymentMethod field
    const paymentMethod = watch('paymentMethod');

    const steps = [
        {
            title: 'Step 1: Personal Info',
            content: <StepPersonalInfo control={control} errors={errors} />,
        },
        {
            title: 'Step 2: Account Info',
            content: <StepAccountInfo control={control} errors={errors} />,
        },
        {
            title: 'Step 3: Payment Method',
            content: (
                <StepPaymentMethod
                    control={control}
                    paymentMethod={paymentMethod}
                    errors={errors}
                />
            ),
        },
    ];

    const nextStep = () =>
        setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

    const onSubmit = (data) => {
        if (currentStep === steps.length - 1) {
            const formattedData = formatFormData(data);
            console.log(formattedData);
            message.success('Form submitted successfully!');
        } else {
            nextStep();
        }
    };

    return (
        <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
            <Steps current={currentStep} items={steps}></Steps>
            <div>{steps[currentStep].content}</div>
            <StepNavigationButtons
                onBack={prevStep}
                currentStep={currentStep}
                maxStep={steps.length}
            />
        </Form>
    );
};

export default RegistrationForm;
