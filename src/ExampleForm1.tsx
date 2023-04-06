import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import { Button, TextField } from '@mui/material';

const validationSchema = yup.object({
  email: yup
    .string()
    .email()
    .required('Email is required')
    .test('email-exists', 'Email Validation Error', (value, ctx) => {
      console.log('Email field');
      if (value !== ctx.currentValue) {
        console.log('Email field test logic is executed');
        return new Promise(async (resolve) => {
          const response = await axios.get(`http://localhost:3000/users?email=${value}`);
          resolve(response.data.length ? ctx.createError({ message: 'Email Exists' }) : true);
        });
      }
    }),
  password: yup.string().min(8, 'Password should be of minimum 8 characters length').required('Password is required'),
});

export const ExampleForm1 = () => {
  const formik = useFormik({
    initialValues: {
      email: 'foobar@example.com',
      password: 'foobar',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onInput={formik.handleChange}
          error={Boolean(formik.errors.email)}
          helperText={formik.errors.email}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};
