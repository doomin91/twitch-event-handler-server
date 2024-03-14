/* eslint-disable @typescript-eslint/ban-types */
import { TransformFnParams } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max,
  Min,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
  IsDate,
  IsArray,
} from 'class-validator';

interface DefaultValidationCofnig extends ValidationOptions {
  required: boolean;
}

interface StringValidationConfig extends DefaultValidationCofnig {
  minLength: number;
  maxLength: number;
}

interface NumberValidationConfig extends DefaultValidationCofnig {
  minNumber: number;
  maxNumber: number;
  each?: boolean;
}

interface EnumValidationConfig extends DefaultValidationCofnig {
  type: object;
}

type BooleanValidationConfig = DefaultValidationCofnig;
type EmailValidationConfig = DefaultValidationCofnig;

interface MatchesValidationConfig extends DefaultValidationCofnig {
  pattern: RegExp;
}

type DateValidationConfig = DefaultValidationCofnig;

function IsBoolean() {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isBoolean',
      target: object.constructor,
      propertyName: propertyName,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (value === 'true' || value === true) {
            return true;
          } else if (value === 'false' || value === false) {
            return true;
          } else {
            return false;
          }
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a boolean value`;
        },
      },
    });
  };
}

function IsCustomString(config: StringValidationConfig) {
  return function (object: object, propertyName: string) {
    if (!config.required) {
      IsOptional()(object, propertyName);
    } else {
      IsNotEmpty()(object, propertyName);
    }
    if (config.each) {
      IsArray()(object, propertyName);
      IsString({ each: config.each })(object, propertyName);
      Length(config.minLength, config.maxLength, { each: config.each })(
        object,
        propertyName,
      );
    } else {
      IsString()(object, propertyName);
      Length(config.minLength, config.maxLength)(object, propertyName);
    }
  };
}

function IsCustomNumber(config: NumberValidationConfig) {
  return function (object: object, propertyName: string) {
    if (!config.required) {
      IsOptional()(object, propertyName);
    } else {
      IsNotEmpty()(object, propertyName);
    }
    if (config.each) {
      IsInt({ each: config.each })(object, propertyName);
      Min(config.minNumber, { each: config.each })(object, propertyName);
      Max(config.maxNumber, { each: config.each })(object, propertyName);
    } else {
      IsNumber()(object, propertyName);
      Min(config.minNumber)(object, propertyName);
      Max(config.maxNumber)(object, propertyName);
    }
  };
}

function IsCustomEnum(config: EnumValidationConfig) {
  return function (object: object, propertyName) {
    if (!config.required) {
      IsOptional()(object, propertyName);
    } else {
      IsNotEmpty()(object, propertyName);
    }
    IsEnum(config.type)(object, propertyName);
  };
}

function IsCustomBoolean(config: BooleanValidationConfig) {
  return function (object: object, propertyName: string) {
    if (!config.required) {
      IsOptional()(object, propertyName);
    } else {
      IsNotEmpty()(object, propertyName);
    }
    IsBoolean()(object, propertyName);
  };
}

function IsCustomEmail(config: EmailValidationConfig) {
  return function (object: object, propertyName: string) {
    if (!config.required) {
      IsOptional()(object, propertyName);
    } else {
      IsNotEmpty()(object, propertyName);
    }
    IsEmail()(object, propertyName);
  };
}

function IsCustomMatches(config: MatchesValidationConfig) {
  return function (object: object, propertyName: string) {
    if (!config.required) {
      IsOptional()(object, propertyName);
    } else {
      IsNotEmpty()(object, propertyName);
    }
    Matches(config.pattern)(object, propertyName);
  };
}

function IsCustomDate(config: DateValidationConfig) {
  return function (object: object, propertyName: string) {
    if (!config.required) {
      IsOptional()(object, propertyName);
    } else {
      IsNotEmpty()(object, propertyName);
    }
    IsDate()(object, propertyName);
  };
}

function TransformBoolean(value: any) {
  if (!value) {
    return false;
  }
  if (value.value.toString().toLocaleLowerCase() === 'true') {
    return true;
  } else {
    return false;
  }
}

function TransformDate(transformFnParams: TransformFnParams) {
  const { value } = { ...transformFnParams };
  if (!value) return new Date();

  return new Date(value);
}

export {
  IsCustomBoolean,
  IsCustomEmail,
  IsCustomMatches,
  IsCustomString,
  IsCustomEnum,
  IsCustomNumber,
  IsCustomDate,
  TransformBoolean,
  TransformDate,
};
