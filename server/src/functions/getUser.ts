import { User } from '../models';

export const getUser = (id: string) => User.eagerQuery().findById(id);
