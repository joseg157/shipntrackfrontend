import { toast } from 'react-toastify';
import { isAxiosError, AxiosError } from 'axios';

interface ErrorResponse {
  errorId?: string;
  message?: string;
}

interface AxiosErrorWithResponse extends AxiosError<ErrorResponse> {}

const errorToastHandler = (error: Error | AxiosErrorWithResponse) => {
  if (!isAxiosError<ErrorResponse>(error)) {
    return;
  }

  // Network related errors might not have a response

  let offlineResponse: string | undefined;

  // Network related errors
  switch (error.code) {
    case AxiosError.ERR_NETWORK:
      offlineResponse = 'Network error: Please check your internet connection.';
      break;
    case AxiosError.ETIMEDOUT:
      offlineResponse = 'Request timed out: The server took too long to respond.';
      break;
    case AxiosError.ECONNABORTED:
      offlineResponse = 'Connection aborted: The request was cancelled.';
      break;
    case AxiosError.ERR_BAD_RESPONSE:
      offlineResponse = `Bad response from server: ${error?.response?.statusText || 'Unknown error'}`;
      break;
    case AxiosError.ERR_BAD_REQUEST:
      offlineResponse = `Bad request: ${error?.response?.data?.message || 'The request was invalid.'}`;
      break;
    case AxiosError.ERR_CANCELED:
      offlineResponse = 'Request cancelled: The request was cancelled.';
      break;
    default:
      break;
  }

  if (error.response?.data?.message) {
    // Server Response
    toast.error(
      `Error: ${error.response.data.message}, Status: ${error.response.status} ${error.response.data?.errorId ? `, Error ID: ${error.response.data.errorId}` : ''}`,
    );
  } else if (offlineResponse) {
    // Network or offline related errors
    toast.error(offlineResponse);
  } else {
    // Unknown error
    toast.error('An unknown error occurred.');
  }
};

export default errorToastHandler;
