import sinon from 'sinon';
import * as AWS from 'aws-sdk-mock';
import { main as sendSMS} from '../src/functions/sendSMS/handler';
import { sendSMSEventMockData } from './data/sendSMSEventMock.data';
import { contextMockData } from './data/contextMock.data';

describe('Unit test for sendSMS handler', () => {
  let SNS_SPY;

  beforeEach( async () => {
    SNS_SPY = sinon.spy(({}, callback) => { callback(null, {}); });
    AWS.mock('SNS', 'publish', SNS_SPY);
  });

  afterEach(async () => {
    AWS.restore('SNS', 'publish');
  });

  it("send-sms integration test", async () => {

    const response = await sendSMS(sendSMSEventMockData as any, contextMockData);

    const { message } = JSON.parse(response.body);

    expect(response.statusCode).toEqual(200);
    expect(message).toEqual('The message successfully sent');
  });
});