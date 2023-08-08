import React from 'react';
import { Button, Space } from 'antd';
import { en } from '../translations/en';

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
                    {en.back}
                </Button>
            )}
            {currentStep < maxStep ? (
                <Button type="primary" htmlType="submit">
                    {en.next}
                </Button>
            ) : (
                <Button type="primary" htmlType="submit">
                    {en.submit}
                </Button>
            )}
        </Space>
    );
};

export default React.memo(StepNavigationButtons);
