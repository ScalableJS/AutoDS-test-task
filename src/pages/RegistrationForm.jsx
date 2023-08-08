import React, { useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Steps, Button, message, Space, Form } from 'antd';
import StepPersonalInfo from '../components/StepPersonalInfo';
import StepAccountInfo from '../components/StepAccountInfo';
import StepPaymentMethod from '../components/StepPaymentMethod';
import StepNavigationButtons from '../components/StepNavigationButtons';

const schemaStep1 = yup.object({
  fullName: yup
    .string()
    .required('Full Name is required')
    .matches(/^[a-zA-Z]{3,}\s[a-zA-Z]{3,}$/, 'Full Name should contain at least 2 words, each with at least 3 letters and only letters'),
});

const schemaStep2 = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/^(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter and one digit'),
  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const schemaStep3 = yup.object({
  paymentMethod: yup.string().required('Please select a payment method'),
  paypalEmail: yup
    .string()
    .when('paymentMethod', (paymentMethod, schema) =>
      paymentMethod[0] === 'pp'
        ? schema.required('PayPal Email is required').email('Invalid email format')
        : yup.string().nullable()
    ),
  cardNumber: yup
    .string()
    .when('paymentMethod', (paymentMethod, schema) =>
      paymentMethod[0] === 'cc'
        ? schema.required('Credit Card Number is required').matches(/^\d{16}$/, 'Invalid card number. Must be 16 digits')
        : yup.string().nullable()
    ),
});


const RegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const schema = [schemaStep1, schemaStep2, schemaStep3][currentStep]

  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
    watch
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: 'asd asd',
      email: 'test@email.com',
      password: 'aBcd1234',
      confirmPassword: 'aBcd1234',
      paymentMethod: 'pp'
    }
  });

  // Watch for changes in the paymentMethod field
  const paymentMethod = watch('paymentMethod');

  const steps = [
    { title: 'Step 1: Personal Info', content: <StepPersonalInfo control={control} errors={errors} /> },
    { title: 'Step 2: Account Info', content: <StepAccountInfo control={control} errors={errors} /> },
    { title: 'Step 3: Payment Method', content: <StepPaymentMethod control={control} paymentMethod={paymentMethod} errors={errors} /> },
  ];

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const onSubmit = (data) => {
    if (currentStep === steps.length - 1) {
      console.log(data)
      message.success('Form submitted successfully!');
    } else {
      nextStep();
    }
  };

  return (
    <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
      <Steps current={currentStep} items={steps}></Steps>
      <div>
        {steps[currentStep].content}
      </div>
      <StepNavigationButtons onBack={prevStep} currentStep={currentStep} maxStep={steps.length} />
    </Form>
  );
};

export default RegistrationForm;
