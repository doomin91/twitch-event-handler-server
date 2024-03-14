import { Logger } from '@nestjs/common';
import { Logger as TypeORMLogger } from 'typeorm';

export class CustomDbLogger implements TypeORMLogger {
  private loggerLog: Logger = new Logger('QUERY_LOG');

  private loggerError: Logger = new Logger('QUERY_ERROR');

  private loggerSlow: Logger = new Logger('QUERY_SLOW');

  logQuery(query: string, parameters: any[] = []) {
    if (process.env.NODE_ENV === 'dev') {
      this.loggerLog.log(`${query}, ${parameters}`);
    }
  }

  logQueryError(
    error: string | Error,
    query: string,
    parameters: any[] = [],
  ): any {
    this.loggerError.log(`${error} ${query}, ${parameters}`);
  }

  logQuerySlow(time: number, query: string, parameters: any[] = []): any {
    this.loggerSlow.log(`${time} ${query}, ${parameters}`);
  }

  // eslint-disable-next-line class-methods-use-this
  logSchemaBuild() {}

  // eslint-disable-next-line class-methods-use-this
  logMigration(): any {}

  // eslint-disable-next-line class-methods-use-this
  log() {}
}
