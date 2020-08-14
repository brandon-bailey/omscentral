import { firebase } from '../components';
import { User } from '../models';

export const deleteUser = async (id: string): Promise<void> => {
  await Promise.all([
    firebase.auth().deleteUser(id),
    User.query().deleteById(id),
  ]);
};
