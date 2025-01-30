const parseContactType = (contactType) => {
  const isString = typeof contactType === 'string';
  if (!isString) return;
  const isContactType = (contactType) =>
    ['work', 'home', 'personal'].includes(contactType);

  if (isContactType(contactType)) return contactType;
};

const parseBoolean = (value) => {
  if (typeof value !== 'string') return null;
  if (value === 'true') return true;
  if (value === 'false') return false;
  return null;
};

export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  const parsedContactType = parseContactType(type);
  const parsedFavourite = parseBoolean(isFavourite);

  return {
    type: parsedContactType,
    isFavourite: parsedFavourite,
  };
};
