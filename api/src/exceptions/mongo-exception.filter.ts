import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { MongoError } from 'mongodb';
import { Request, Response } from 'express';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    let statusCode: number = 400;
    let error: string = 'Unable to process input data.';
    switch (exception.code) {
      case 11000:
        statusCode = 400;
        error = 'Duplicate entry found.';
    }
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    response.status(statusCode).json({
      statusCode,
      error,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
