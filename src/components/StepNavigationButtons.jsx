import React from 'react';
import { Button, Space } from 'antd';

const StepNavigationButtons = ({ onBack, currentStep, maxStep }) => {
    return (
        <Space
            direction="horizontal"
            size="middle"
            style={{
                display: 'flex',
            }}
        >
            {currentStep > 0 && (
                <Button type="default" onClick={onBack}>
                    Back
                </Button>
            )}
            {currentStep < maxStep ? (
                <Button type="primary" htmlType="submit">
                    Next
                </Button>
            ) : (
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            )}
        </Space>
    );
};

export default StepNavigationButtons;
