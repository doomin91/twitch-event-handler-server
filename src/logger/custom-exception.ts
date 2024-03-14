import { HttpException } from '@nestjs/common';

class CustomException extends HttpException {
  constructor(message: string, statusCode: number, constants?: any) {
    if (constants.default) {
      constants = constants.default;
    }

    if (constants && constants.translates && constants.translates[message]) {
      const translate = constants.translates[message];
      super({ message, translate, statusCode }, statusCode);
    } else {
      super({ message, statusCode }, statusCode);
    }
  }
}

export class CustomExceptionBuilder {
  constructor(private constants: any) {}

  throwBadRequestException(message: string) {
    throw new CustomException(message, 400, this.constants);
  }

  throwUnauthorizedException(message: string) {
    throw new CustomException(message, 401, this.constants);
  }

  throwInternalServerErrorException(message: string) {
    throw new CustomException(message, 500, this.constants);
  }

  throwNotFoundException(message: string) {
    throw new CustomException(message, 404, this.constants);
  }

  throwForbiddenException(message: string) {
    throw new CustomException(message, 403, this.constants);
  }

  throwConflictException(message: string) {
    throw new CustomException(message, 409, this.constants);
  }

  throwRequestTimeoutException(message: string) {
    throw new CustomException(message, 408, this.constants);
  }

  throwGatewayTimeoutException(message: string) {
    throw new CustomException(message, 504, this.constants);
  }

  throwServiceUnavailableException(message: string) {
    throw new CustomException(message, 503, this.constants);
  }
}
