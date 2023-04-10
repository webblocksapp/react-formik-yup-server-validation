import { useFormik } from 'formik';
import { Button, TextField } from '@mui/material';
import { useMemo } from 'react';
import { validationSchema } from './schema';

export const ExampleForm1 = () => {
  const formik = useFormik({
    initialValues: {
      email: 'foobar@example.com',
      password: 'foobar',
    },
    validationSchema: useMemo(validationSchema, []),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const formik2 = useFormik({
    initialValues: {
      email: 'foobar@example.com',
      password: 'foobar',
    },
    validationSchema: useMemo(validationSchema, []),
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

      <br />
      <br />

      <form onSubmit={formik2.handleSubmit}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik2.values.email}
          onInput={formik2.handleChange}
          error={Boolean(formik2.errors.email)}
          helperText={formik2.errors.email}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik2.values.password}
          onChange={formik2.handleChange}
          error={formik2.touched.password && Boolean(formik2.errors.password)}
          helperText={formik2.touched.password && formik2.errors.password}
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};
