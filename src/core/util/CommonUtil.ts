import Router from 'next/router';

export async function sleep(time?: number) {
  await new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

export function redirect(path: string) {
  Router.replace(path);
}

export function createRedirectHandler(path: string) {
  return function handleRedirect() {
    redirect(path);
  };
}

export function loadTimeRenderer(node: { loading: React.ReactNode; data: React.ReactNode }, loading?: boolean) {
  return loading ? node.loading : node.data;
}
