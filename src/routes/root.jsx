import * as React from 'react';
import { NavLink, Outlet, useLoaderData, Form, redirect, useNavigation, useSubmit } from 'react-router-dom';

import { getContacts, createContact } from '../contacts';

export const rootLoader = async ({ request }) => {
  const url = new URL(request.url);
  const q = url.searchParams.get('q');
  const contacts = await getContacts(q);

  return { contacts, q };
};

export const rootAction = async () => {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
};

export default function Root() {
  const { contacts, q } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();

  React.useEffect(() => {
    document.getElementById('q').value = q;
    if (q) {
      document.title = `Search results for "${q}"`;
    } else {
      document.title = 'React router contacts';
    }
  }, [q]);

  const searching = navigation.location && new URLSearchParams(navigation.location.search).has('q');

  return (
    <>
      <div id="sidebar">
        <h1>React router contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              required
              type="search"
              name="q"
              defaultValue={q}
              onChange={(event) => {
                const isFirstSearch = q == null;
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                });
              }}
              id="q"
              className={searching ? 'loading' : ''}
              placeholder="Search"
              aria-label="Search contacts"
            />
            <div id="search-spinner" hidden={!searching} aria-hidden />
            <div className="sr-only" aria-live="polite" />
          </Form>

          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>

        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) => (isActive ? 'active' : isPending ? 'pending' : '')}
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{' '}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>

      <div id="detail" className={navigation.state === 'loading' ? 'loading' : ''}>
        <Outlet />
      </div>
    </>
  );
}
