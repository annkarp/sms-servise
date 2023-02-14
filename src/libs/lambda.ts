import middy from "@middy/core";
import urlEncodeBodyParser from "@middy/http-urlencode-body-parser";

export const middyfy = (handler) => {
  return middy(handler).use(urlEncodeBodyParser())
}
