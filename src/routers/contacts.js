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

import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

const router = Router();
router.use(authenticate);
router.get('/', ctrlWrapper(getContactsController));

router.get(
  '/:contactId',

  isValidId,
  ctrlWrapper(getContactByIdController),
);
router.post(
  '/',
  upload.single('photo'),
  validateBody(createContactScheme),
  ctrlWrapper(createContactController),
);
router.patch(
  '/:contactId',
  isValidId,
  upload.single('photo'),
  validateBody(updateContactScheme),
  ctrlWrapper(patchContactController),
);
router.delete(
  '/:contactId',
  isValidId,

  ctrlWrapper(deleteContactController),
);
router.put(
  '/:contactId',
  isValidId,
  upload.single('photo'),
  ctrlWrapper(upsertContactController),
);
export default router;
