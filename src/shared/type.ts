export interface ResponseFormat<T = any> {
  message: string;
  errors: any;
  data: T;
}
