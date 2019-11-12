import { UnprocessableEntityException, NotFoundException } from '@nestjs/common';
import { ValidationError, ElementNotFoundError, isEmptyOrNil } from '@kerthin/utils';
import * as R from 'ramda';

// TODO: improve this method - be able to scale with the time (this method it's too coupled)
export const catchGeneralErrors = (error: Error) => {
  if (error instanceof ValidationError) {
    throw new UnprocessableEntityException(error.message);
  }
  if (error instanceof ElementNotFoundError) {
    throw new NotFoundException(error.message);
  }

  throw error;
};

export const notFoundGenException = (message) => () => { throw new NotFoundException(message); };
export const notFound = (message) => R.cond([
  [isEmptyOrNil, notFoundGenException(message)],
  [R.T, R.identity],
])

