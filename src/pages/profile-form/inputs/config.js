export const usernameInputConfig = (formError) => ({
  label: 'Username',
  name: 'username',
  required: false,
  validateStatus: formError.username ? 'error' : '',
  help: formError.username || '',
  rules: [
    { required: true, message: 'Please input your Username!' },
    { max: 20, message: 'Username length must be to 20' },
    { min: 3, message: 'Username length must be from 3' },
  ],
});

export const passwordInputConfig = (formError, editCondition) => ({
  name: 'password',
  label: !editCondition ? 'Password' : 'New password',
  required: false,
  validateStatus:
    formError.password || formError['email or password'] ? 'error' : '',

  help: formError.password,
  rules: [
    { required: !editCondition, message: 'Please input your password!' },
    { max: 40, message: 'Password length must be to 40' },
    { min: 3, message: 'Password length must be from 6' },
  ],
  hasFeedback: true,
});

export const confirmPasswordInputConfig = {
  name: 'confirm',
  label: 'Confirm Password',
  required: false,
  dependencies: ['password'],
  hasFeedback: true,
  rules: [
    { required: true, message: 'Please confirm your password!' },
    ({ getFieldValue }) => ({
      validator(rule, value) {
        if (!value || getFieldValue('password') === value) {
          return Promise.resolve();
        }
        return Promise.reject(
          new Error('The two passwords that you entered do not match!')
        );
      },
    }),
  ],
};

export const emailInputConfig = (formError) => ({
  label: 'Email address',
  name: 'email',
  validateStatus:
    formError.email || formError['email or password'] ? 'error' : '',

  help: formError.email,
  required: false,
  rules: [
    { required: true, message: 'Please input your Email!' },
    {
      type: 'email',
      message: 'The input is not valid E-mail!',
    },
  ],
});

export const imageURLConfig = {
  name: 'image',
  label: 'Avatar image (url)',
  rules: [{ type: 'url', message: 'Please input correcet URL-address' }],
};
