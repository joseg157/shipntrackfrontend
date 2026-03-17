import { toast } from 'react-toastify';
import { isAxiosError, AxiosError } from 'axios';

interface ErrorResponse {
  errorId?: string;
  message?: string;
}

interface AxiosErrorWithResponse extends AxiosError<ErrorResponse> {}

export const errorMessage = (error: Error | AxiosErrorWithResponse): string => {
  if (!isAxiosError(error)) {
    return error.message;
  }
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

  let responseErrorMessage: string | undefined;
  const errorResponseData = error?.response?.data as ErrorResponse | string | undefined;

  if (typeof errorResponseData === 'string') {
    responseErrorMessage = `Error: ${errorResponseData}, Status: ${error.response?.status}`;
  } else if (errorResponseData?.message) {
    responseErrorMessage = `Error: ${errorResponseData.message}, Status: ${error.response?.status} ${errorResponseData.errorId ? `, Error ID: ${errorResponseData.errorId}` : ''}`;
  }

  if (responseErrorMessage) return responseErrorMessage;
  else if (offlineResponse) return offlineResponse;

  return `An unexpected error occurred: ${error.message}`;
};

export const errorToastHandler = (error: Error | AxiosErrorWithResponse) => {
  const message = errorMessage(error);

  toast.error(message);
};
