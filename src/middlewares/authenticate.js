import createHttpError from 'http-errors';
import { SessionsCollection } from '../db/models/session.js';
import { UsersCollection } from '../db/models/user.js';

export const authenticate = async (req, res, next) => {
  const sessionId = req.cookies?.sessionId;

  if (!sessionId) {
    return next(createHttpError(401, 'Unauthorized: No session cookie found'));
  }

  const session = await SessionsCollection.findOne({ _id: sessionId });

  if (!session) {
    return next(createHttpError(401, 'Unauthorized: Session not found'));
  }

  const isSessionExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionExpired) {
    return next(createHttpError(401, 'Unauthorized: Session expired'));
  }

  const user = await UsersCollection.findById(session.userId);

  if (!user) {
    return next(createHttpError(401, 'Unauthorized: User not found'));
  }

  req.user = user;
  next();
};
