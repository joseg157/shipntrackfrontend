import { QueryClient, QueryClientProvider, QueryCache, MutationCache } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import errorToastHandler from '@helpers/errorToastHandler';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      ...(import.meta.env.DEV
        ? { refetchOnWindowFocus: false, refetchOnMount: false }
        : { refetchOnWindowFocus: true, retry: 2, refetchOnMount: false }),
    },
  },
  queryCache: new QueryCache({
    onError: errorToastHandler,
  }),
  mutationCache: new MutationCache({
    onError: errorToastHandler,
  }),
});

interface TanstackQueryProviderProps {
  children: React.ReactNode;
}

function TanstackQueryProvider({ children }: TanstackQueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
    </QueryClientProvider>
  );
}

export default TanstackQueryProvider;
