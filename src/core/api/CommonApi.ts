import { ApiUtil } from '@util';

export async function authentication(data: string) {
  await new Promise(resolve => {
    setTimeout(resolve, 2000);
  });

  return ApiUtil.createRequest()<string, string>('authentication', data);
}
