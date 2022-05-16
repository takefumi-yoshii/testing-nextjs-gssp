import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

type Data<T> = {
  data: T;
  err?: undefined;
};

type Err = {
  data?: undefined;
  err: { message: string; code: string };
};

export function convoluteData<T>(data: T): Data<T> {
  return { data };
}

export function convoluteErr(err: unknown): Err {
  if (err instanceof PrismaClientKnownRequestError) {
    return { err: { code: err.code, message: err.message } };
  }
  throw err;
}

export const NotFoundError = () =>
  new PrismaClientKnownRequestError("Not Found", "P2025", "1");
