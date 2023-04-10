import axios from 'axios';
import * as yup from 'yup';

export const validationSchema = () =>
  yup.object({
    email: yup
      .string()
      .email()
      .required('Email is required')
      .test('email-exists', 'Email Validation Error', (value, ctx) => {
        let emailExists = true;
        return new Promise(async (resolve) => {
          if (value !== ctx.currentValue) {
            const response = await axios.get(`http://localhost:3000/users?email=${value}`);
            emailExists = Boolean(response.data.length);
          }
          resolve(emailExists ? ctx.createError({ message: 'Email Exists' }) : true);
        });
      }),
    password: yup.string().min(8, 'Password should be of minimum 8 characters length').required('Password is required'),
  });
