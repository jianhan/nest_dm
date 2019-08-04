import { HttpException, HttpStatus } from '@nestjs/common';
import * as _ from 'lodash';

export class InvalidProfileException extends HttpException {
  constructor(message: string) {
    super(
      `Invalid user profile: ${_.toLower(message)}`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}