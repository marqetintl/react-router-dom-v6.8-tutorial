import { Form, useLoaderData, redirect, useNavigate } from 'react-router-dom';
import { updateContact } from '../contacts';

export const editAction = async ({ params, request }) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
};

export default function EditContact() {
  const contact = useLoaderData();
  const navigate = useNavigate();

  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input
          required
          type="text"
          name="first"
          defaultValue={contact.first}
          placeholder="First"
          aria-label="First name"
        />
        <input required type="text" name="last" defaultValue={contact.last} placeholder="Last" aria-label="Last name" />
      </p>
      <label>
        <span>Twitter</span>
        <input type="text" name="twitter" defaultValue={contact.twitter} placeholder="Twitter handle without the @" />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          type="text"
          name="avatar"
          defaultValue={contact.avatar}
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
        />
      </label>

      <label>
        <span>Notes</span>
        <textarea name="notes" defaultValue={contact.notes} rows={6} />
      </label>

      <p>
        <button type="submit">Save</button>
        <button
          type="button"
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </button>
      </p>
    </Form>
  );
}
