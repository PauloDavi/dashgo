import decode from 'jwt-decode';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import { destroyCookie, parseCookies } from 'nookies';
import { AuthTokenError } from 'src/errors/AuthTokenError';

import { validateUserPermissions } from './ValidateUserPermissions';

interface WithSSRAuthPotions {
  permissions?: string[];
  roles?: string[];
}

export function withSSRAuth<P>(
  fn: GetServerSideProps<P>,
  options?: WithSSRAuthPotions
) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);
    const token = cookies['dashGo.token'];

    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    if (options) {
      const user = decode<{ permissions: string[]; roles: string[] }>(token);

      const { permissions, roles } = options;

      const userHasValidPermission = validateUserPermissions({
        user,
        permissions,
        roles,
      });

      if (!userHasValidPermission) {
        return {
          notFound: true,
        };
      }
    }

    try {
      return await fn(ctx);
    } catch (error) {
      if (error instanceof AuthTokenError) {
        destroyCookie(ctx, 'dashGo.token');
        destroyCookie(ctx, 'dashGo.refreshToken');

        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }
    }
  };
}
