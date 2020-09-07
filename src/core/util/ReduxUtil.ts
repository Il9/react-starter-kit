import { AsyncActionCreatorBuilder } from 'typesafe-actions';
import { call, put } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import { TypeUtil } from '@util';

export function createAsyncSagaEntity<
  RequestType,
  RequestPayload,
  SuccessType,
  SuccessPayload,
  FailureType,
  FailurePayload
>(
  asyncAction: AsyncActionCreatorBuilder<
    [RequestType, [RequestPayload, undefined]],
    [SuccessType, [SuccessPayload, undefined]],
    [FailureType, [FailurePayload, undefined]]
  >,
  asyncFunction: TypeUtil.PromiseCreator<RequestPayload, AxiosResponse<SuccessPayload>>,
  successFunc?: (successPayload: SuccessPayload, requestPayload: RequestPayload) => void,
  failureFunc?: (data: FailurePayload) => void
) {
  return function* saga(action: ReturnType<typeof asyncAction.request>) {
    try {
      // call async api
      const response: TypeUtil.Unpacked<typeof asyncFunction> = yield call(asyncFunction, (action as any).payload);

      const successPayload = response.data;
      const requestPayload: RequestPayload = JSON.parse(response.config.data);

      // success
      yield put(asyncAction.success(successPayload));

      if (successFunc) {
        // success callback
        yield call(successFunc, successPayload, requestPayload);
      }
    } catch (err) {
      const errRes = err?.data?.error;
      const errInstance = errRes instanceof Error ? errRes : new Error(errRes);

      // failure
      yield put(asyncAction.failure(errInstance as any));

      if (failureFunc) {
        // failure callback
        yield call(failureFunc, errInstance as any);
      }
    }
  };
}
