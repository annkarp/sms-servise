import * as dotenv from 'dotenv';

const {error} = dotenv.config();

if (error) {
  throw error;
}

export const {
  PROCESS_SMS_TOPIC_ARN,
  PROCESS_SMS_QUEUE_ARN,
  SEND_SMS_TOPIC_ARN,
} = process.env;
