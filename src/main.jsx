import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';

import Root, { rootAction, rootLoader } from './routes/root';
import ErrorPage from './error-page';
import Contact, { contactLoader } from './routes/contact';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    action: rootAction,
    loader: rootLoader,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/contacts/:contactId',
        element: <Contact />,
        loader: contactLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
