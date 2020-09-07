import axios from 'axios';

import { ApiConfig } from '@config';
import { ArrayUtil } from '@util';

const AUTH_PREFIX = 'token';

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = ApiConfig.apiUrls.APP_API_URL;
axios.defaults.timeout = 120000;

export function getDefaultAuthorization() {
  return axios.defaults.headers.common.Authorization;
}

export function setDefaultAuthorization(authorization?: string) {
  axios.defaults.headers.common.Authorization = authorization && `${AUTH_PREFIX} ${authorization}`;
}

export function createRequest(actionClass?: string) {
  return function request<R>(action: string, payload: Record<string, any> = {}) {
    return axios
      .post<R>(ArrayUtil.compactJoin([actionClass, action], '/'), { ...payload })
      .catch(err => {
        throw err.response;
      });
  };
}
