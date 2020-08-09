import { firebase } from '../components';

export const deleteUser = (id: string): Promise<void> =>
  firebase.auth().deleteUser(id);
