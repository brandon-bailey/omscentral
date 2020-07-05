import { User } from '../models';
import { Role, AuthProvider } from '../enums';

const unknownUser: User = new User();

unknownUser.id = 'c36c1a3f-6655-4f31-b0a4-971fdc87fbe6';
unknownUser.auth_provider = AuthProvider.Password;
unknownUser.name = 'Unknown';
unknownUser.role = Role.Basic;
unknownUser.anonymous = false;

export { unknownUser };
