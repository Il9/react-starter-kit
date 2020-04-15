import { AsyncActionCreatorBuilder } from 'typesafe-actions';
import { call, put } from 'redux-saga/effects';

type PromiseCreatorFunction<P, T> = ((payload: P) => Promise<T>) | (() => Promise<T>);

export const createAsyncSagaEntity = <
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
  asyncFunction: PromiseCreatorFunction<RequestPayload, SuccessPayload>,
  successFunc?: any,
  failureFunc?: any
) => {
  return function* saga(action: ReturnType<typeof asyncAction.request>) {
    try {
      // call async api
      const result: SuccessPayload = yield call(asyncFunction, (action as any).payload);

      // success
      yield put(asyncAction.success(result));

      if (successFunc) {
        // success callback
        yield call(successFunc, result);
      }
    } catch (err) {
      // failure
      yield put(asyncAction.failure(err));

      if (failureFunc) {
        // failure callback
        yield call(failureFunc, err);
      }
    }
  };
};
