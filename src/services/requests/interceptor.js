import * as localStorageManager from 'constants/LocalStorageManager';
import { toast } from 'react-toastify';

/**
 * Interceptor to catch Unauthenticated responses.
 * 
 * @param {*} err - Response error 
 */
export function unAuthenticatedResponseHandlerIncerceptor(err) {
  if (err && err.response && err.response.status === 401) {
    localStorageManager.clear();
  }

  throw err;
}
