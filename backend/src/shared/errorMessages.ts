import { HttpException } from '@nestjs/common';

export function getError(error: string, status: number) {
  const errorObject = {
    error,
    status,
  };
  return new HttpException(error, status);
}
