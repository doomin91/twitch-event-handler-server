import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface RequestWithTime extends Request {
  startTime: number;
}

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const ctx = context.switchToHttp();
    const request: RequestWithTime = ctx.getRequest();

    request.startTime = now;

    return next.handle().pipe(tap(() => {}));
  }
}
