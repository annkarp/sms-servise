import { FromSchema } from "json-schema-to-ts";

const smsInputSchema = {
  type: "object",
  properties: {
    number: { type: 'string' },
    message: { type: 'string' }
  },
  required: ['number', 'message']
} as const;

export type SMSInput = FromSchema<typeof smsInputSchema>

export default smsInputSchema;
