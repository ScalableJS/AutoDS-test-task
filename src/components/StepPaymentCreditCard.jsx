import React from 'react';
import { Controller } from 'react-hook-form';
import { Input, Alert, Form } from 'antd';

const StepPaymentCreditCard = ({ control, errors }) => {

  return (
    <>
      <Form.Item label="Credit Card Number" htmlFor="cardNumber" required>
        <Controller
          name="cardNumber"
          control={control}
          render={({ field }) => <Input id="cardNumber" {...field} />}
        />
        {errors.cardNumber && <Alert message={errors.cardNumber.message} type="error" />}
      </Form.Item>
      
    </>
  );
};

export default StepPaymentCreditCard;
