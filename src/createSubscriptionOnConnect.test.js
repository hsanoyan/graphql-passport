import createSubscriptionOnConnect from './createSubscriptionOnConnect';

describe('createSubscriptionOnConnect', () => {
  test('calls all provided middlewares and copies websocket request to context', async () => {
    const middleware1 = (req, res, next) => {
      req[1] = true;
      next();
    };
    const middleware2 = (req, res, next) => {
      req[2] = true;
      next();
    };
    const middleware3 = (req, res, next) => {
      req[3] = true;
      next();
    };

    const onConnect = createSubscriptionOnConnect([middleware1, middleware2, middleware3]);
    const connectionParams = {};
    const websocket = { upgradeReq: {} };
    const connectionContext = await onConnect(connectionParams, websocket);

    expect(connectionContext.req).toEqual({
      1: true,
      2: true,
      3: true,
    });
  });
});
