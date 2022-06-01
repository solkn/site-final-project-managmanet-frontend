import * as Yup from 'yup';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link as RouterLink, Navigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Typography
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from 'src/features/auth/AuthAction';
// import { Toaster } from 'react-hot-toast';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const state = useSelector((state) => state.auth);
  console.log(state.loading);


  const user_id = localStorage.getItem('user_id');
  const is_student = localStorage.getItem('is_student');
  const is_superadmin = localStorage.getItem('is_superadmin');
  const is_advisor = localStorage.getItem('is_advisor');
  const is_examiner = localStorage.getItem('is_examiner');
  const is_coordinator = localStorage.getItem('is_coordinator');
  const is_staff = localStorage.getItem('is_staff');

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    // password: Yup.string().required('Password is required'),
    password: Yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      console.log("onsubmit: " + state.loading);
      console.log(values.username);
      const creds = {
        username: values.username,
        password: values.password
      };
      dispatch(signIn(creds));
      console.log("ondispatch: " + state.loading);

      if (user_id) {
        console.log('suppepperrrr adminnnn: ' + state.is_superadmin);
        if (is_superadmin === 'true') {
          return <Navigate to="/admin/dashboard" />;
        } if (is_student === 'true') {
          return <Navigate to="/student/dashboard" />;
        }
        if (is_coordinator === 'true') {
          return <Navigate to="/coordinator/dashboard" />;
        }
        if ((is_advisor === 'true' || is_examiner === 'true') && is_staff === 'true') {
          return <Navigate to="/staff/dashboard" />;
        }

      }
    }
  });

  const { errors, touched, values, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  return (
    <>
      {/* <div><Toaster /></div> */}
      <motion.div
        whileInView={{ opacity: [0, 1] }}
        initial={{ x: -150 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 50 }}
      >
        <>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Login
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>Enter your cridentials below.</Typography>
          </Stack>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  data-cy='username'
                  fullWidth
                  autoComplete="username"
                  type="text"
                  label="Username"
                  {...getFieldProps('username')}
                  error={Boolean(touched.username && errors.username)}
                  helperText={touched.username && errors.username}
                />
                <TextField
                  data-cy='password'
                  fullWidth
                  autoComplete="current-password"
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  {...getFieldProps('password')}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword} edge="end">
                          <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />
              </Stack>

              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ my: 2 }}
              >
                <FormControlLabel
                  control={<Typography {...getFieldProps('remember')} checked={values.remember} />}
                  label=""
                />

                <Link component={RouterLink} variant="subtitle2" to="#" underline="hover">
                  Forgot password?
                </Link>
              </Stack>

              <LoadingButton
                data-cy='loginbtn'
                fullWidth
                color="primary"
                size="large"
                type="submit"
                variant="contained"
                loading={state.loading}
              >
                Login
              </LoadingButton>
            </Form>
          </FormikProvider>
        </>
      </motion.div>
    </>
  );
}
