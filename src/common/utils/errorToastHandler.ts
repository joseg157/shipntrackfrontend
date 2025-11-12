import { toast } from 'react-toastify';
import { isAxiosError, AxiosError } from 'axios';

interface ErrorResponse {
  message?: string;
}

interface AxiosErrorWithResponse extends AxiosError<ErrorResponse> {}

const errorToastHandler = (error: Error | AxiosErrorWithResponse) => {
  if (!isAxiosError<ErrorResponse>(error)) {
    return;
  }

  // Network related errors might not have a response

  let response: string | undefined;

  switch (error.code) {
    case AxiosError.ERR_NETWORK:
      response = 'Network error: Please check your internet connection.';
      break;
    case AxiosError.ETIMEDOUT:
      response = 'Request timed out: The server took too long to respond.';
      break;
    case AxiosError.ECONNABORTED:
      response = 'Connection aborted: The request was cancelled.';
      break;
    case AxiosError.ERR_BAD_RESPONSE:
      response = `Bad response from server: ${error?.response?.statusText || 'Unknown error'}`;
      break;
    case AxiosError.ERR_BAD_REQUEST:
      response = `Bad request: ${error?.response?.data?.message || 'The request was invalid.'}`;
      break;
    case AxiosError.ERR_CANCELED:
      response = 'Request cancelled: The request was cancelled.';
      break;
    default:
      response = `Error: ${error?.response?.status}, Message: ${error?.response?.data?.message}`;
      break;
  }

  // Worse case, we if we dont get any following network errors
  // No response from server, we show the error code and message

  // Fallback message
  const faultBack = `Error: ${error?.code || 'Unknown'}, Message: ${response}`;
  const serverMessage = `Error: ${error?.response?.data?.message || 'An error occurred.'}, Status: ${error?.response?.status}`;

  const didWeGetErrorResponse = Boolean(error?.response?.data?.message);

  toast.error(didWeGetErrorResponse ? serverMessage : faultBack);
};

export default errorToastHandler;
