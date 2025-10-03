export interface ResponseObjectJsonDto<T> {
  message: string;
  code: number;
  response: T;
}

