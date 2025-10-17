import { useState } from 'react';

import {
  Paper,
  Typography,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
  Link as MuiLink,
  Backdrop,
  CircularProgress,
  TextField,
} from '@mui/material';

import { IoMdEye, IoMdEyeOff } from 'react-icons/io';

import withDocumentTitle from '@components/withDocumentTitle';
import { Form, createRHFController } from '@features/form';
// eslint-disable-next-line import/no-unresolved
import LogisticsSupplyChainImg from '/images/logist_supply_chain.jpeg';

type LoginRequest = {
  username: string;
  password: string;
};

const defaultValues: LoginRequest = {
  username: '',
  password: '',
};

const RHFController = createRHFController<LoginRequest>();

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div className="tw:flex tw:h-[calc(100dvh-var(--tw-spacing-topbar))]">
      <Backdrop open={false}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <div className="tw:hidden tw:flex-1 tw:lg:block tw:lg:flex-3">
        <img
          src={LogisticsSupplyChainImg}
          alt="Logistics Supply Chain"
          loading="lazy"
          className="tw:inset-0 tw:h-full tw:w-full tw:object-cover"
        />
      </div>

      <div className="tw:mt-20 tw:flex tw:flex-1 tw:justify-center tw:lg:mt-0 tw:lg:flex-2 tw:lg:items-center">
        <div className="tw:px-4 tw:lg:px-6">
          <Paper className="tw:p-6 tw:md:p-8">
            <Form
              defaultValues={defaultValues}
              submitButtonText="Login"
              title="Login"
              slotProps={{
                resetButtonProps: { hideResetButton: true },
                submitButtonProps: { fullWidth: true },
              }}
            >
              <RHFController
                name="username"
                label="Username"
                component={TextField}
                rules={{ required: 'Username is required' }}
              />

              <RHFController
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                component={TextField}
                rules={{ required: 'Password is required' }}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={togglePasswordVisibility}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <div className="tw:flex tw:flex-col tw:sm:flex-row tw:sm:items-center tw:sm:justify-between">
                <FormControlLabel
                  className="tw:underline"
                  control={<Checkbox />}
                  label="Remember me"
                  slotProps={{
                    typography: {
                      className: 'tw:text-sm',
                    },
                  }}
                />
                <MuiLink className="tw:text-center tw:text-sm tw:no-underline tw:hover:underline tw:sm:text-left">
                  Forgot your password?
                </MuiLink>
              </div>
            </Form>

            <Typography className="tw:mt-5 tw:text-center" variant="body2">
              Don&apos;t have an account?{' '}
              <MuiLink className="tw:no-underline tw:hover:underline" color="primary">
                Sign up
              </MuiLink>
            </Typography>
          </Paper>
        </div>
      </div>
    </div>
  );
}

const LoginWithDocumentTitle = withDocumentTitle(Login, {
  documentTitle: 'Login',
});

export default LoginWithDocumentTitle;
