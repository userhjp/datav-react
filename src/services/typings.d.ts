import { Method, ResponseType } from 'axios';

declare namespace API {
  type Response = {
    code: number;
    data: any;
    message: string;
    [key: string]: any;
  };

  type AxiosRequest = {
    method?: Method;
    headers?: any;
    params?: any;
    data?: any;
    responseType?: ResponseType;
    socketPath?: string | null;
    cancelToken?: CancelToken;
    paramsSerializer?: (params: any) => string;
    onUploadProgress?: (progressEvent: any) => void;
    onDownloadProgress?: (progressEvent: any) => void;
    validateStatus?: ((status: number) => boolean) | null;
  };
}
