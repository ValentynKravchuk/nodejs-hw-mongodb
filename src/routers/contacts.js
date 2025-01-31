import { Router } from 'express';
import {
  createContactController,
  deleteContactController,
  getContactByIdController,
  getContactsController,
  patchContactController,
  upsertContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactScheme,
  updateContactScheme,
} from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();
router.get('/contacts', ctrlWrapper(getContactsController));

router.get(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(getContactByIdController),
);
router.post(
  '/contacts',
  validateBody(createContactScheme),
  ctrlWrapper(createContactController),
);
router.patch(
  '/contacts/:contactId',
  isValidId,
  validateBody(updateContactScheme),
  ctrlWrapper(patchContactController),
);
router.delete(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(deleteContactController),
);
router.put(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(upsertContactController),
);
export default router;
