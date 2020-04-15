import axios from 'axios';

import { ApiConfig } from '@config';

export function createRequest(actionType?: string) {
  return async function request<P, R>(action: string, params: P): Promise<R> {
    return axios.post([ApiConfig.apiUrls.APP_API_URL, actionType, action].filter(val => val).join('/'), {
      data: params
    });
  };
}
