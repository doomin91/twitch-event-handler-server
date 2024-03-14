import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import _ from 'lodash';
import { NextFunction, Response } from 'express';
import { WinstonLogger, WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { getClientIp } from 'request-ip';
import { RequestWithTime } from './logger.interceptor';

@Injectable()
class LoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: WinstonLogger,
  ) {}

  use(request: RequestWithTime, response: Response, next: NextFunction) {
    response.on('finish', () => {
      const { method, originalUrl, path } = request;
      const { statusCode } = response;

      const { startTime } = request;
      const now = Date.now();
      let responseTime = now - startTime;

      if (!responseTime) {
        responseTime = 0;
      }

      const responseTimeSec = `${responseTime / 1000}s`;

      const ip = getClientIp(request);
      const { headers } = request;
      const { body } = request;
      const { query } = request;
      const accountId = _.get(request, 'session.accountId')
        ? _.get(request, 'session.accountId')
        : '';
      const service = _.get(request, 'session.service')
        ? _.get(request, 'session.service')
        : '';
      const responseBody = _.get(response, 'body')
        ? _.get(response, 'body')
        : {};
      const responseHeader = _.get(response, 'headers')
        ? _.get(response, 'headers')
        : {};

      const indent = process.env.NODE_ENV === 'prod' ? 0 : 2;

      const logObjectSimple = JSON.stringify(
        {
          ip,
          url: originalUrl,
          method,
          statusCode,
          responseTime: responseTimeSec,
        },
        null,
        indent,
      );

      const logObjectDetail = JSON.stringify(
        {
          ip,
          url: originalUrl,
          method,
          statusCode,
          headers,
          body,
          query,
          accountId,
          service,
          responseTime: responseTimeSec,
          responseBody,
          responseHeader,
        },
        null,
        indent,
      );

      this.logger.setContext('HTTP');

      if (statusCode >= 500) {
        return this.logger.error(logObjectDetail, '');
      }

      if (statusCode >= 400) {
        return this.logger.warn(logObjectDetail);
      }
      if (
        path.startsWith(process.env.ADMIN_API_PREFIX) ||
        path.startsWith(process.env.EXTERNAL_API_PREFIX) ||
        method !== 'GET'
      ) {
        return this.logger.log(logObjectDetail);
      }
      return this.logger.log(logObjectSimple);
    });

    next();
  }
}

export default LoggerMiddleware;
