import { Domain } from './Domain';

/**
 * @deprecated
 */
export class Session extends Domain {
  id!: string;
  sess!: {
    cookie: {
      originalMaxAge: number;
      expires: string;
      httpOnly: boolean;
      path: string;
    };
    [key: string]: any;
  };
  expired!: number;

  static tableName = 'omscentral_session';

  static jsonAttributes = ['sess'];
}
