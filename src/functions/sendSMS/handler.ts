import { SNS } from 'aws-sdk';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import schema, { SMSInput } from './schema';

const publishSMSEvent = async (smsInput: SMSInput): Promise<void> => {
  const eventInput = {
    Message: JSON.stringify(smsInput),
    TopicArn: process.env.PROCESS_SMS_TOPIC_ARN
  };

  const publishEventPromise = new SNS().publish(eventInput).promise();

  try {
    const result = await publishEventPromise;

    console.log(`The message published with the id ${result.MessageId}`);
  } catch (error) {
    console.error(error);

    throw new Error("Fail to publish the message");
  }
}

const sendSMS: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  await publishSMSEvent(event.body);

  return formatJSONResponse({
    message: `The message successfully sent`,
    event,
  });
};

export const main = middyfy(sendSMS);
