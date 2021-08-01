import axios, { AxiosError } from 'axios';
import { parseCookies, setCookie } from 'nookies';
import { AuthTokenError } from 'src/errors/AuthTokenError';

import { singOut } from '@contexts/AuthContext';

let failedRequestsQueue = [];
let isRefreshing = false;

export function setupApiClient(ctx = undefined) {
  let cookies = parseCookies(ctx);

  const authApi = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
      Authorization: `Bearer ${cookies['dashGo.token']}`,
    },
  });

  authApi.interceptors.response.use(
    response => response,
    (error: AxiosError) => {
      if (error.response.status === 401) {
        if (error.response.data?.code === 'token.expired') {
          cookies = parseCookies(ctx);

          const { 'dashGo.refreshToken': refreshToken } = cookies;
          const originalConfig = error.config;

          if (!isRefreshing) {
            isRefreshing = true;

            authApi
              .post('refresh', {
                refreshToken,
              })
              .then(response => {
                const { token } = response.data;

                setCookie(ctx, 'dashGo.token', token, {
                  maxAge: 60 * 60 * 24 * 30,
                  path: '/',
                });

                setCookie(
                  ctx,
                  'dashGo.refreshToken',
                  response.data.refreshToken,
                  {
                    maxAge: 60 * 60 * 24 * 30,
                    path: '/',
                  }
                );

                authApi.defaults.headers['Authorization'] = `Bearer ${token}`;

                failedRequestsQueue.forEach(request =>
                  request.onSuccess(token)
                );
                failedRequestsQueue = [];
              })
              .catch(error => {
                failedRequestsQueue.forEach(request =>
                  request.onFailure(error)
                );
                failedRequestsQueue = [];

                if (process.browser) {
                  singOut();
                }
              })
              .finally(() => {
                isRefreshing = false;
              });
          }

          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({
              onSuccess: (token: string) => {
                originalConfig.headers['Authorization'] = `Bearer ${token}`;

                resolve(authApi(originalConfig));
              },
              onFailure: (error: AxiosError) => {
                reject(error);
              },
            });
          });
        } else {
          if (process.browser) {
            singOut();
          } else {
            return Promise.reject(new AuthTokenError());
          }
        }
      }

      return Promise.reject(error);
    }
  );

  return authApi;
}
