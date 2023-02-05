import { Form } from 'react-router-dom';

export default function Contact() {
  const contact = {
    first: 'First name',
    last: 'Last name',
    avatar: 'https://placekitten.com/g/200/200',
    twitter: 'handle',
    notes: 'Some notes',
    favorite: true,
  };
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
            <a href={`https://twitter.com/${contact.twitter}`} target="_blank"></a>
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
  let fav = contact.favorite;

  return (
    <Form method="post">
      <button
        name="favorite"
        value={fav ? 'false' : 'true'}
        aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
      >
        {fav ? '★' : '☆'}
      </button>
    </Form>
  );
};
