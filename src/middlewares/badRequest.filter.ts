import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { ResponseFormat } from 'src/shared/type';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = 400;

    const exres = exception.getResponse();
    const errorResponse: ResponseFormat = {
      message: 'Bad request',
      errors: typeof exres == 'string' ? exres : exres['message'],
      data: null,
    };

    response.status(status).json(errorResponse);
  }
}
