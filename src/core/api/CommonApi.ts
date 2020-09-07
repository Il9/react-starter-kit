import { ApiService } from '@service';

const request = ApiService.createRequest();

export type GetAuthPayload = {
  email: string;
  password: string;
};
export type GetAuthResponse = {
  token: string;
};
export function getAuth(payload: GetAuthPayload) {
  return request<GetAuthResponse>('getAuth', payload);
}
