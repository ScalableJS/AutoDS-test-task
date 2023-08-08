# AutoDS test task
# Create a Registration Form:

## Task:

- Create a registration form that will consist of the following three steps:
    - Step 1: Full Name (validation for at least 2 words, each word must have at least 3 characters, and only letters are allowed)
    - Step 2: Email (validation for a valid email format), Password (validation for at least 8 characters, at least one uppercase letter, and one digit), Confirm Password (must match the "Password" field)
    - Step 3: Payment Method selection (PayPal, Credit Card) using radio buttons:
        - PayPal: Email field (validation for a valid email format)
        - Credit Card: Card Number field (validation for a valid 16-digit card number)
- When clicking the "Next" button, the form should validate the fields of the current step. If the validation passes, proceed to the next step. If not, display the validation errors.
- When clicking the "Back" button, the form should navigate to the previous step.
- When clicking the "Submit" button, the form should validate all fields. If the validation passes, print the form data to the console. If not, display the validation errors.

## Requirements:

- The output object should have the following structure:
    {
        firstName: 'John',
        lastName: 'Doe',
        email: 'test@email.com',
        password: 'aBcd1234',
        confirmPassword: 'aBcd1234',
        // If PayPal is selected
        paymentMethod: {
            type: 'pp',
            email: 'paypal@email.com',
        },
        // If Credit Card is selected
        paymentMethod: {
            type: 'cc',
            cardNumber: '1234567890123456',
        },
    }
- Styling of the form is not mandatory.
- It is advisable to use react-hook-form (https://github.com/react-hook-form/react-hook-form) for form handling and yup (https://github.com/jquense/yup) for form validation.



# Создать форму регистрации:

## Задание:

- Создать форму регистрации, которая будет содержать следующие три шага:
    - Шаг 1: Имя и фамилия одно поле(валидация на минимум 2 слова, минимум 3 символа в каждом слове и только буквы)
    - Шаг 2: Email(валидация на валидный email), пароль(валидация на не менее 8 символов, минимум одну цифру, одну
      заглавную букву), подтверждение пароля(должно совпадать с полем "пароль")
    - Шаг 3: Выбор метода оплаты (PayPal, Credit Card) радио кнопками:
        - PayPal: поле Email(валидация на валидный email)
        - Credit Card: поле Номер карты(валидация на валидный номер карты 16 цифр)
- При нажатии на кнопку "Next" должна происходить валидация полей текущего шага, если валидация пройдена, то переходить
  на следующий шаг, если нет, то отображать ошибки валидации
- При нажатии на кнопку "Back" должен происходить переход на предыдущий шаг
- При нажатии на кнопку "Submit" должна происходить валидация всех полей, если валидация пройдена,
  то выводить данные формы в консоль, если нет, то отображать ошибки валидации

## Условия:

- Объект на выходе должен иметь следующую структуру:
    {
        firstName: 'John',
        lastName: 'Doe',
        email: 'test@email.com',
        password: 'aBcd1234',
        confirmPassword: 'aBcd1234',
        // если выбран PayPal
        paymentMethod: {
            type: 'pp',
            email: 'paypal@email.com',
        },
        // если выбран Credit Card
        paymentMethod: {
            type: 'cc',
            cardNumber: '1234567890123456',
        },
    }
- Стилизация формы не обязательна
- Желательно использовать react-hook-form https://github.com/react-hook-form/react-hook-form для создания и
  yup https://github.com/jquense/yup для валидации формы