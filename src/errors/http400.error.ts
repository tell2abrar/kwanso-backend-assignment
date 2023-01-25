import { BaseError } from './base.error';
import { HttpStatusCodeName } from '../constant';
import { HttpStatusCode } from './codes';

export class HTTP400Error extends BaseError {
  constructor(description: string) {
    super(HttpStatusCodeName.BAD_REQUEST, HttpStatusCode.BAD_REQUEST, description, true);
  }
}
