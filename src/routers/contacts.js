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
import { ROLES } from '../constants/index.js';
import { checkRoles } from '../middlewares/checkRoles.js';

const router = Router();
router.get('/', checkRoles(ROLES.TEACHER), ctrlWrapper(getContactsController));

router.get(
  '/:contactId',
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  isValidId,
  ctrlWrapper(getContactByIdController),
);
router.post(
  '/',
  checkRoles(ROLES.TEACHER),
  validateBody(createContactScheme),
  ctrlWrapper(createContactController),
);
router.patch(
  '/:contactId',
  isValidId,
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  validateBody(updateContactScheme),
  ctrlWrapper(patchContactController),
);
router.delete(
  '/:contactId',
  isValidId,
  checkRoles(ROLES.TEACHER),
  ctrlWrapper(deleteContactController),
);
router.put(
  '/:contactId',
  isValidId,
  checkRoles(ROLES.TEACHER),
  ctrlWrapper(upsertContactController),
);
export default router;
