import { User } from '../models';

export const getUser = (id: string) => User.query().findById(id);
