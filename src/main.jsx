import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, createRoutesFromElements } from 'react-router-dom';

import './index.css';

import Root, { rootAction, rootLoader } from './routes/root';
import ErrorPage from './error-page';
import Contact, { contactAction, contactLoader } from './routes/contact';
import EditContact, { editAction } from './routes/edit';
import { destroyAction } from './routes/destroy';
import Index from './routes';
import { Route } from 'react-router-dom';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Root />,
//     action: rootAction,
//     loader: rootLoader,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         errorElement: <ErrorPage />,
//         children: [
//           { index: true, element: <Index /> },
//           {
//             path: '/contacts/:contactId',
//             element: <Contact />,
//             loader: contactLoader,
//             action: contactAction,
//           },
//           {
//             path: '/contacts/:contactId/edit',
//             element: <EditContact />,
//             loader: contactLoader,
//             action: editAction,
//           },
//           {
//             path: '/contacts/:contactId/destroy',
//             action: destroyAction,
//             errorElement: <div>Oops! There was an error.</div>,
//           },
//         ],
//       },
//     ],
//   },
// ]);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} loader={rootLoader} action={rootAction} errorElement={<ErrorPage />}>
      <Route errorElement={<ErrorPage />}>
        <Route index element={<Index />} />
        <Route path="/contacts/:contactId" element={<Contact />} loader={contactLoader} action={contactAction} />
        <Route path="/contacts/:contactId/edit" element={<EditContact />} loader={contactLoader} action={editAction} />
        <Route
          path="/contacts/:contactId/destroy"
          action={destroyAction}
          errorElement={<div>Oops! There was an error.</div>}
        />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
