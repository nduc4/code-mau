import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { ResponseFormat } from '@shared/type';
import { Response } from 'express';

@Catch()
export class InternalServerException implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = (exception as HttpException)?.getStatus() || 500;
    const message =
      (exception as HttpException)?.getResponse()['message'] ||
      'Internal Server';
    const errors =
      (exception as HttpException)?.getResponse()['error'] ||
      exception.cause ||
      exception;

    const errorResponse: ResponseFormat = {
      errors,
      message,
      data: null,
    };

    response.status(status).json(errorResponse);
  }
}
