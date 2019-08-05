import { HttpException, HttpStatus } from '@nestjs/common';
import * as _ from 'lodash';

/**
 * InvalidProfileException represents exception when profile
 * unable to be processed by the system.
 *
 * @export
 * @class InvalidProfileException
 * @extends {HttpException}
 */
export class InvalidProfileException extends HttpException {
  constructor(message: string) {
    super(
      `Invalid user profile: ${_.toLower(message)}`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
