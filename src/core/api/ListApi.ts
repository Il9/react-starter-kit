import { ApiService } from '@service';

const request = ApiService.createRequest('list');

export type ListPayload = {};
export type ListResponse = {};
export function list(payload: ListPayload) {
  return request<ListResponse>('list', payload);
}
