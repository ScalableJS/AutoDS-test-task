import React, { useState, useMemo } from 'react';
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
import formatFormData from '../utils/formDataUtils';
import { en } from '../translations/en';

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
        defaultValues: {},
    });

    // Watch for changes in the paymentMethod field
    const paymentMethod = watch('paymentMethod');

    const steps = useMemo(
        () => [
            {
                title: en.step1Title,
                content: <StepPersonalInfo control={control} errors={errors} />,
            },
            {
                title: en.step2Title,
                content: <StepAccountInfo control={control} errors={errors} />,
            },
            {
                title: en.step3Title,
                content: (
                    <StepPaymentMethod
                        control={control}
                        paymentMethod={paymentMethod}
                        errors={errors}
                    />
                ),
            },
        ],
        [control, errors, paymentMethod],
    );

    const nextStep = () =>
        setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

    const onSubmit = (data) => {
        if (currentStep === steps.length - 1) {
            const formattedData = formatFormData(data);
            console.log(formattedData);
            message.success(en.formSubmittedSuccess);
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
