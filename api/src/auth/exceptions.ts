import { HttpException, HttpStatus } from '@nestjs/common';
import * as _ from 'lodash';

/**
 * MissingProfileValueException will be thrown whenever profile was not valid
 * from oauth2 authentication.
 *
 * @export
 * @class MissingProfileValueException
 * @extends {HttpException}
 */
export class MissingProfileValueException extends HttpException {
  constructor(message: string) {
    super(
      `Invalid user profile: ${_.toLower(message)}`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
