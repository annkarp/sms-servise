import { SNS } from 'aws-sdk';
import { SQSHandler, SQSEvent } from "aws-lambda";

const processSMS: SQSHandler = async (event: SQSEvent): Promise<void> => {
  const { number, message } = JSON.parse(event.Records[0].body);

  const eventInput = {
    Message: message,
    PhoneNumber: number,
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
