import axios from 'axios';
import sinon from 'sinon';
import AWS from 'aws-sdk-mock';

describe('Unit test for sendSMS handler', function () {
  let SNS_SPY;

  beforeEach( async function() {
    SNS_SPY = sinon.spy((params, callback) => {
      callback(null, {});
    });
    AWS.mock('SNS', 'publish', SNS_SPY);
  });

  afterEach(async () => {
    AWS.restore('SNS', 'publish');
  });

  it("send-sms integration test", async () => {

    const data = {
      number: '+447385592403',
      message: 'Hello'
    };

    const response = await axios.post("http://localhost:3000/dev/send-sms", {
      ...data
    });

    expect(response.status).toEqual(200);
  });
});