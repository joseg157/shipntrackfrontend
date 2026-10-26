import { RouterProvider } from 'react-router';
import { ToastContainer } from 'react-toastify';

import router from './router';
import TanstackQueryProvider from './TanstackQueryProvider';
import MuiProvider from './MuiProvider';
import { useUnAuth } from '@features/auth';

function UnAuth() {
  useUnAuth();
  return null;
}

function AppContextManager() {
  return (
    <TanstackQueryProvider>
      <MuiProvider>
        <div className="app">
          <RouterProvider router={router} />
        </div>
        <ToastContainer limit={10} />
        <UnAuth />
      </MuiProvider>
    </TanstackQueryProvider>
  );
}

export default AppContextManager;
