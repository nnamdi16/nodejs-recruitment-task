import { Roles } from './role.enum';

export interface TokenPayload {
  userId?: number;
  name?: string;
  role?: Roles;
  iat?: Date;
  exp?: Date;
  iss?: string;
  sub?: string;
  [key: string]: any;
}
