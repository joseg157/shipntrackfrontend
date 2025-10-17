import { toast } from 'react-toastify';
import { isAxiosError, AxiosError } from 'axios';

interface ErrorResponse {
  message?: string;
}

const errorToastHandler = (error: Error | AxiosError) => {
  if (!isAxiosError(error)) {
    return; // Do nothing if it's not an axios error
  }

  const response = error?.response?.data as ErrorResponse | string | undefined;

  const errorMessage = typeof response === 'string' ? response : response?.message;

  toast.error(errorMessage || error?.message || 'An unexpected error occurred');
};

export default errorToastHandler;
