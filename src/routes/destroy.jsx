import { redirect } from 'react-router-dom';
import { deleteContact } from '../contacts';

export const destroyAction = async ({ params }) => {
  await deleteContact(params.contactId);
  return redirect(`/`);
};
