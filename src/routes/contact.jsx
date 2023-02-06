import { Form, useLoaderData, useFetcher } from 'react-router-dom';
import { getContact, updateContact } from '../contacts';

export const contactLoader = async ({ params }) => {
  const contact = await getContact(params.contactId);
  if (!contact) {
    throw new Response('', {
      status: 404,
      statusText: 'Not Found',
    });
  }
  return contact;
};

export const contactAction = async ({ params, request }) => {
  const formData = await request.formData();
  return updateContact(params.contactId, { favorite: formData.get('favorite') === 'true' });
};

export default function Contact() {
  const contact = useLoaderData();

  return (
    <div id="contact">
      <div>
        <img src={contact.avatar || null} alt={contact.first} key={contact.avatar} />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No name</i>
          )}

          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a href={`https://twitter.com/${contact.twitter}`} target="_blank">
              @{contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>

          <Form
            action="destroy"
            method="post"
            onSubmit={(e) => {
              if (!confirm('Please confirm you want to delete this contact.')) {
                e.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

const Favorite = ({ contact }) => {
  const fetcher = useFetcher();

  let fav = contact.favorite;
  if (fetcher.formData) {
    fav = fetcher.formData.get('favorite') === 'true';
  }

  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={fav ? 'false' : 'true'}
        aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
      >
        {fav ? '★' : '☆'}
      </button>
    </fetcher.Form>
  );
};
