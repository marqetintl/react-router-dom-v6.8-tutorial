import { Link, Outlet, useLoaderData, Form } from 'react-router-dom';
import { getContacts, createContact } from '../contacts';

export const rootLoader = async () => {
  const contacts = await getContacts();
  return {
    contacts,
  };
};

export const rootAction = async () => {
  const contacts = await createContact();
  return { contacts };
};

export default function Root() {
  const { contacts } = useLoaderData();

  return (
    <>
      <div id="sidebar">
        <h1>React router contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input type="search" name="q" id="q" placeholder="Search" aria-label="Search contacts" />
            <div id="search-spinner" aria-hidden hidden={true} />
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
                  <Link to={`contacts/${contact.id}`}>
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{' '}
                    {contact.favorite && <span>★</span>}
                  </Link>
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
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
