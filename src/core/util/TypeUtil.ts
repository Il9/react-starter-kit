export type PromiseCreator<P, T = never> = ((payload: P) => Promise<T>) | (() => Promise<T>);

export type HandlerCreator<T, F = () => void> = (data: T) => F;

export type Handler<T = undefined> = T extends undefined ? () => void : (data: T) => void;

export type Unpacked<T> = T extends (infer U)[]
  ? U
  : T extends Promise<infer U>
  ? U
  : T extends (...args: never) => Promise<infer U>
  ? U
  : T extends (...args: never) => infer U
  ? U
  : T;

export type Unit<T> = T extends infer U | (infer U)[] | (infer U)[][] ? U : never;
