import type { AWS } from '@serverless/typescript';

import sendSMS from '@functions/sendSMS';
import processSMS from '@functions/processSMS';

const serverlessConfiguration: AWS = {
  service: 'sms-service',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
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
    },
    iam: {
      role: {
        statements: [
          {
            Action: ["sns:Publish"],
            Effect: "Allow",
            Resource: ["arn:aws:sns:eu-west-2:120532362139:process-sms-topic"],
          },
          {
            Action: ["sqs:ReceiveMessage", "sqs:ReceiveMessage", "sqs:DeleteMessage", "sqs:GetQueueAttributes"],
            Effect: "Allow",
            Resource: ["arn:aws:sqs:eu-west-2:120532362139:process-sms-queue"],
          },
          {
            Action: ["sns:Publish"],
            Effect: "Allow",
            Resource: ["arn:aws:sns:eu-west-2:120532362139:send-sms-topic"],
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
