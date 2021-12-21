import {inject} from '@loopback/core';
import {
  Request,
  RestBindings,
  get,
  response,
  ResponseObject,
} from '@loopback/rest';
import {authorize} from 'loopback4-authorization';
import {
  authenticate,
  AuthenticationBindings,
  STRATEGY,
} from 'loopback4-authentication';
import { OPERATION_SECURITY_SPEC } from '@sourceloop/core';
/**
 * OpenAPI response for ping()
 */
const PING_RESPONSE: ResponseObject = {
  description: 'Ping Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'PingResponse',
        properties: {
          greeting: {type: 'string'},
          date: {type: 'string'},
          url: {type: 'string'},
          headers: {
            type: 'object',
            properties: {
              'Content-Type': {type: 'string'},
            },
            additionalProperties: true,
          },
        },
      },
    },
  },
};

/**
 * A simple controller to bounce back http requests
 */
export class PingController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}  
  // Map to `GET /ping`
  @authenticate(STRATEGY.BEARER ,{
    passReqToCallback: true,
})
  @authorize({permissions: ['abc']})
  @get('/ping',{
    security: OPERATION_SECURITY_SPEC,
    responses:{
      content: {
        'application/json': {
          schema: {
            type: 'object',
            title: 'PingResponse',
            properties: {
              greeting: {type: 'string'},
              date: {type: 'string'},
              url: {type: 'string'},
              headers: {
                type: 'object',
                properties: {
                  'Content-Type': {type: 'string'},
                },
                additionalProperties: true,
              },
            },
          },
        },
      },
    }
  })
  // @response(200, PING_RESPONSE)
  async ping(): Promise<object>{
    // Reply with a greeting, the current time, the url, and request headers
    return {
      greeting: 'Hello from LoopBack',
      date: new Date(),
      url: this.req.url,
      headers: Object.assign({}, this.req.headers),
    };
  }
}
