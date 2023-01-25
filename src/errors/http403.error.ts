import { BaseError } from './base.error';
import { HttpStatusCodeName } from '../constant';
import { HttpStatusCode } from './codes';

export class HTTP403Error extends BaseError {
  constructor(description: string) {
    super(HttpStatusCodeName.NOT_AUTHORIZED, HttpStatusCode.FORBIDEN, description, true);
  }
}
