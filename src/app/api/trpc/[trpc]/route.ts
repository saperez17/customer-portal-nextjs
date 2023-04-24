import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

import { appRouter } from '../trpc-router';

const handler = (request: Request) => {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req: request,
    router: appRouter,
    // eslint-disable-next-line unused-imports/no-unused-vars
    createContext(
      _opts: FetchCreateContextFnOptions
    ): object | Promise<object> {
      return {};
    },
  });
};

export { handler as GET, handler as POST };
