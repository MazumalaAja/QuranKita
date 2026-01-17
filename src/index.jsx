import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./resources/css/app.css"
import "./resources/css/style.css"
import { RouterProvider } from 'react-router-dom'
import router from './routes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AnimateOnScroll } from '../libs/aos'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AnimateOnScroll>
        <RouterProvider router={router} />
      </AnimateOnScroll>
    </QueryClientProvider>
  </StrictMode>
)