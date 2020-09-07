import { CommonUtil } from '@util';
import { ApiService } from '@service';

const AUTH_CACHE_KEY = 'authorization';
const AUTH_PATH = '/login';
const MAIN_PATH = '/home/dashboard';

export function getAuthCache() {
  return window.localStorage.getItem(AUTH_CACHE_KEY);
}

export function setAuthCache(authorization: string) {
  window.localStorage.setItem(AUTH_CACHE_KEY, authorization);
}

export function removeAuthCache() {
  window.localStorage.removeItem(AUTH_CACHE_KEY);
}

export function authRoute(pathname?: string) {
  const authorization = getAuthCache();

  if (authorization) {
    if (!ApiService.getDefaultAuthorization()) {
      ApiService.setDefaultAuthorization(authorization);
    }

    if (pathname === AUTH_PATH) {
      CommonUtil.redirect(MAIN_PATH);
    }
  } else {
    ApiService.setDefaultAuthorization(undefined);

    if (pathname !== AUTH_PATH) {
      CommonUtil.redirect(AUTH_PATH);
    }
  }
}
