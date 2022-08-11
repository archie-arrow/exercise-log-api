import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
  ValidationError,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class BetterValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    if (value && typeof value === 'object') {
      const obj = plainToInstance(metadata.metatype, value);
      const errors = await validate(obj);

      if (errors.length) {
        const messages = errors
          .map((err: ValidationError) => ({ [err.property]: Object.values(err.constraints).join(', ') }))
          .reduce((prev: { [key: string]: string }, curr: { [key: string]: string }) => Object.assign(prev, curr), {});
        throw new HttpException({ messages, statusCode: HttpStatus.BAD_REQUEST }, HttpStatus.BAD_REQUEST);
      }
    }

    return value;
  }
}
