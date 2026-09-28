import { RouterProvider } from 'react-router';
import { ToastContainer } from 'react-toastify';

import router from './router';
import TanstackQueryProvider from './TanstackQueryProvider';
import MuiProvider from './MuiProvider';

function AppContextManager() {
  return (
    <TanstackQueryProvider>
      <MuiProvider>
        <div className="app">
          <RouterProvider router={router} />
        </div>
        <ToastContainer limit={10} />
      </MuiProvider>
    </TanstackQueryProvider>
  );
}

export default AppContextManager;
