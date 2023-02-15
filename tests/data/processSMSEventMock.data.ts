import { SQSEvent } from "aws-lambda";

export const processSMSEventMockData: SQSEvent = {
  Records: [
    {
      messageId: '1',
      receiptHandle: '',
      body: JSON.stringify({
        Message: JSON.stringify({
          "number": "+447385592403",
          "message": "Hey"
        })
      }),
      attributes: {
        ApproximateReceiveCount: '',
        SentTimestamp: '',
        SenderId: '',
        ApproximateFirstReceiveTimestamp: '',
      },
      messageAttributes: {},
      md5OfBody: '',
      eventSource: '',
      eventSourceARN: '',
      awsRegion: '',
    }
  ]
};
