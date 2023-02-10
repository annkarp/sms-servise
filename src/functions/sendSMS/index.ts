import schema from './schema';
import { handlerPath } from 'src/libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'send-sms',
        request: {
          schemas: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};
