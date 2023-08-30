import { rest } from 'msw';

const responseRoot = { message: 'Welcome to api!' };

const host = 'http://localhost';
const apiPath = `${host}/api`;

const getPath = (path?: string) => {
  if (!path || path === '/') {
    return apiPath;
  }

  return `${apiPath}/${path}`;
};

export const restHandlers = [
  rest.get(getPath('/'), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(responseRoot));
  }),
];
