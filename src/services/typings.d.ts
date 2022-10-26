import { Method, ResponseType } from 'axios';

declare namespace API {
  type Response = {
    code: number;
    data: any;
    message: string;
    [key: string]: any;
  };
}
