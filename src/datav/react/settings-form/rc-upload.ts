import type { UploadRequestOption, UploadRequestError, UploadProgressEvent } from 'rc-upload/lib/interface';

function getError(option: UploadRequestOption, xhr: XMLHttpRequest) {
  const msg = `cannot ${option.method} ${option.action} ${xhr.status}'`;
  const err = new Error(msg) as UploadRequestError;
  err.status = xhr.status;
  err.method = option.method;
  err.url = option.action;
  return err;
}

function getBody(xhr: XMLHttpRequest) {
  const text = xhr.responseText || xhr.response;
  if (!text) {
    return text;
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}

export default function upload(option: UploadRequestOption<any>) {
  if (!option.action.startsWith('http://') && !option.action.startsWith('https://') && !option.action.startsWith('//')) {
    option.action = `${API_URL}${option.action}`;
  }
  const xhr = new XMLHttpRequest();
  if (option.onProgress && xhr.upload) {
    xhr.upload.onprogress = function progress(e: UploadProgressEvent) {
      if (e.total > 0) {
        e.percent = (e.loaded / e.total) * 100;
      }
      option.onProgress(e);
    };
  }

  const formData = new FormData();

  if (option.data) {
    Object.keys(option.data).forEach((key) => {
      const value = option.data[key];
      // support key-value array data
      if (Array.isArray(value)) {
        value.forEach((item) => {
          // { list: [ 11, 22 ] }
          // formData.append('list[]', 11);
          formData.append(`${key}[]`, item);
        });
        return;
      }

      formData.append(key, option.data[key] as any);
    });
  }

  if (option.file instanceof Blob) {
    formData.append(option.filename, option.file, (option.file as any).name);
  } else {
    formData.append(option.filename, option.file);
  }

  xhr.onerror = function error(e) {
    option.onError(e);
  };

  xhr.onload = function onload() {
    const res = getBody(xhr);
    // allow success when 2xx status
    // see https://github.com/react-component/upload/issues/34
    if (xhr.status < 200 || xhr.status >= 300) {
      return option.onError(getError(option, xhr), res);
    }
    if (res.code === 0) {
      res.data.url = res.data.fullurl;
      return option.onSuccess(res.data, xhr);
    }
    return option.onError(res, xhr);
  };

  xhr.open(option.method, option.action, true);

  // Has to be after `.open()`. See https://github.com/enyo/dropzone/issues/179
  if (option.withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true;
  }

  const headers = option.headers || {};

  // when set headers['X-Requested-With'] = null , can close default XHR header
  // see https://github.com/react-component/upload/issues/33
  if (headers['X-Requested-With'] !== null) {
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  }

  Object.keys(headers).forEach((h) => {
    if (headers[h] !== null) {
      xhr.setRequestHeader(h, headers[h]);
    }
  });

  xhr.send(formData);

  return {
    abort() {
      xhr.abort();
    },
  };
}
