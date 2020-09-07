import { ApiService } from '@service';

const request = ApiService.createRequest('home');

export type DashboardGetDataPayload = {};
export type DashboardGetDataResponse = {};
export function dashboardGetData(payload: DashboardGetDataPayload) {
  return request<DashboardGetDataResponse>('dashboard/getData', payload);
}
