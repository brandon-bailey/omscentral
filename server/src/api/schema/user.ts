import { object, string, number } from '@hapi/joi';

import { AuthProvider } from '../../enums';

export const schema = object().keys({
  id: string().required(),
  auth_provider: string()
    .valid(...Object.values(AuthProvider))
    .required(),
  email: string().allow(null),
  name: string().allow(null),
  photo_url: string().allow(null),
  program_id: string().allow(null),
  specialization_id: string().allow(null),
  last_signed_in: number(),
});
