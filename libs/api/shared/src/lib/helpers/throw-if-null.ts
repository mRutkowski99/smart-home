import { HttpException, InternalServerErrorException } from '@nestjs/common';

export function throwIfNull<T>(entity: T | null, exception?: HttpException): T {
  if (entity === null) throw exception ?? new InternalServerErrorException();
  else return entity;
}
