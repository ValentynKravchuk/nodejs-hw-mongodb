import { model, Schema } from 'mongoose';

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    isFavourite: {
      type: Boolean,
      required: true,
      default: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      default: 'personal',
      required: true,
    },
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },

    photo: { type: String },
  },
  { timestamps: true, versionKey: false },
);

export const ContactsCollection = model('contacts', contactsSchema);
