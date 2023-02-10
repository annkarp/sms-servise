import type { AWS } from '@serverless/typescript';

import sendSMS from '@functions/sendSMS';
import processSMS from '@functions/processSMS';

const serverlessConfiguration: AWS = {
  service: 'sms-service',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  useDotenv: true,
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      PROCESS_SMS_TOPIC_ARN: '${env:PROCESS_SMS_TOPIC_ARN}',
      PROCESS_SMS_QUEUE_ARN: '${env:PROCESS_SMS_QUEUE_ARN}',
      SEND_SMS_TOPIC_ARN: '${env:SEND_SMS_TOPIC_ARN}',
    },
    iam: {
      role: {
        statements: [
          {
            Action: ["sns:Publish"],
            Effect: "Allow",
            Resource: '${env:PROCESS_SMS_TOPIC_ARN}',
          },
          {
            Action: ["sqs:ReceiveMessage", "sqs:ReceiveMessage", "sqs:DeleteMessage", "sqs:GetQueueAttributes"],
            Effect: "Allow",
            Resource: '${env:PROCESS_SMS_QUEUE_ARN}',
          },
          {
            Action: ["sns:Publish"],
            Effect: "Allow",
            Resource: '${env:SEND_SMS_TOPIC_ARN}',
          },
        ]
      }
    },
  },
  // import the function via paths
  functions: { sendSMS, processSMS },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
