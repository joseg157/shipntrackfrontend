import { RouterProvider } from 'react-router';
import { ToastContainer } from 'react-toastify';

import { AuthProvider, PersistLogin } from '@features/auth';
import router from './router';
import TanstackQueryProvider from './TanstackQueryProvider';
import MuiProvider from './MuiProvider';

function AppContextManager() {
  return (
    <TanstackQueryProvider>
      <MuiProvider>
        <AuthProvider>
          <PersistLogin>
            <div className="app">
              <RouterProvider router={router} />
            </div>
          </PersistLogin>
        </AuthProvider>
        <ToastContainer limit={10} />
      </MuiProvider>
    </TanstackQueryProvider>
  );
}

export default AppContextManager;
