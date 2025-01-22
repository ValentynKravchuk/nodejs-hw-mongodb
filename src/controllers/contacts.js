import createHttpError from 'http-errors';
import { getAllContacts, getContactById } from '../services/contacts.js';

export const getContactsController = async (req, res, next) => {
  const contacts = await getAllContacts();
  try {
    res
      .status(200)
      .json({ message: 'Successfully found contacts!', data: contacts });
  } catch (error) {
    next;
    error;
  }
};
export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    throw createHttpError(404, 'Contacts not found');
  }
  res.status(200).json({
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};
