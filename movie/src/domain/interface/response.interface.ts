import { HttpStatus } from '@nestjs/common';
export interface IResponse {
  status: HttpStatus;
  message: string;
  [key: string]: string | number | Date | any;
}
