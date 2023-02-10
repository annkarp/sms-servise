import { SNS } from 'aws-sdk';
import { SQSHandler, SQSEvent } from "aws-lambda";

const processSMS: SQSHandler = async (event: SQSEvent): Promise<void> => {
  const { Message } = JSON.parse(event.Records[0].body);

  const eventInput = {
    Message: Message,
    TopicArn: "arn:aws:sns:eu-west-2:120532362139:send-sms-topic"
  };

  const publishEventPromise = new SNS().publish(eventInput).promise();

  try {
    const result = await publishEventPromise;

    console.log(`The message published with the id ${result.MessageId}`);
  } catch (error) {
    console.error(error);

    throw new Error("Fail to publish the message");
  }
};

export const main = processSMS;
