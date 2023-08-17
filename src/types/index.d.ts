import HTTPRequest from "@/utils/httpRequest/httpRequest";

export type ContentType =
  | "application/x-www-form-urlencoded"
  | "multipart/form-data"
  | "application/json"
  | "text/xml";

export type header = {
  "Content-Type"?: ContentType;
  Range?: string;
};

export type method = "get" | "post" | "put" | "delete";

export type httpConfig = {
  url: string;
  header?: header;
  method?: method;
  responseType?: XMLHttpRequestResponseType;
  xhr?: XMLHttpRequest;
};

export type XHRConfig = {
  request: HTTPRequest;
  success?: Function;
  error?: Function;
  abort?: Function;
  progress?: Function;
};
