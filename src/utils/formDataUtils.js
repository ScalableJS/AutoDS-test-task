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

export default formatFormData;