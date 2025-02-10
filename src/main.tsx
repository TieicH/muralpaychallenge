import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import { AppRoutes } from './routes.tsx';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './index.css'
import { Toaster } from './components/ui/toaster.tsx';

const queryClient = new QueryClient(
  {
    defaultOptions:{
      queries:{
        refetchOnWindowFocus: false,
        retry: false
      }
    }
  }
)

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <StrictMode>
        <AppRoutes />
        <Toaster />
      </StrictMode>
    </QueryClientProvider>
  </BrowserRouter>
)
