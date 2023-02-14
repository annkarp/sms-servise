import sinon from 'sinon';
import * as AWS from 'aws-sdk-mock';
import { main as processSMS} from '../src/functions/processSMS/handler';
import { processSMSEventMockData } from './data/processSMSEventMock.data';
import { contextMockData } from './data/contextMock.data';

describe('Unit test for processSMS handler', () => {
  let SNS_SPY;

  beforeEach( async () => {
    SNS_SPY = sinon.spy(({}, callback) => { callback(null, {}); });
    AWS.mock('SNS', 'publish', SNS_SPY);
  });

  afterEach(async () => {
    AWS.restore('SNS', 'publish');
  });

  it("process-sms integration test", async () => {
    const callback = () => {};

    await processSMS(processSMSEventMockData, contextMockData, callback)
  });
});
