import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Inject,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { getConnection } from 'typeorm';
import moment from 'moment';
import { WinstonLogger, WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import ErrorLog from './error-log.entity';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: WinstonLogger,
  ) {}

  async catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const now = moment(new Date()).format('yyyy-MM-DD hh:mm:ss');
    let status = 500;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
    }

    const exceptionResponse = (exception as unknown as any).response;

    if (status < 500) {
      response.status(status).json(exceptionResponse);
    } else {
      this.saveDB(exception, request);

      const resJson: any = {
        message: exception.message,
        name: exception.name,
        stack: exception.stack,
        statusCode: status,
        timestamp: now,
        path: request.url,
      };

      if (exceptionResponse && exceptionResponse.translate) {
        resJson.translate = exceptionResponse.translate;
      }

      if (process.env.NODE_ENV !== 'prod') {
        response.status(status).json(resJson);
      } else {
        delete resJson.stack;
        delete resJson.name;

        response.status(status).json(resJson);
      }
    }
  }

  async saveDB(exception: Error, request: Request) {
    if (!request.body) {
      request.body = {};
    }

    if (!request.headers) {
      request.headers = {};
    }

    if (!request.query) {
      request.query = {};
    }

    const requestBody = JSON.stringify(request.body);
    const requestQuery = JSON.stringify(request.query);
    const requestHeader = JSON.stringify(request.headers);
    const callStack = exception.stack;
    const indent = process.env.NODE_ENV === 'prod' ? 0 : 2;

    try {
      const errorObject = {
        message: exception.message,
        ip: request.ip,
        method: request.method,
        url: request.url,
        protocol: request.protocol,
        requestBody: request.body,
        requestQuery: request.query,
        requestHeader: request.headers,
      };

      this.logger.setContext('SYSTEM');
      this.logger.error(
        JSON.stringify(errorObject, null, indent),
        exception.stack,
      );

      await getConnection()
        .getRepository(ErrorLog)
        .save({
          ...errorObject,
          requestBody,
          requestQuery,
          requestHeader,
          callStack,
        });
    } catch (e) {
      this.logger.error(e, e.stack);
    }
  }
}
