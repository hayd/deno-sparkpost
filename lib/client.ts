import { merge, isPlainObject } from "./deps.ts";
import { SparkPostOptions } from "./mod.ts";
import { resolveUri, createVersionStr, createSparkPostError } from "./util.ts";

const version = "0.0.1";

//REST API Config Defaults
const defaults = {
  origin: "https://api.sparkpost.com:443",
  apiVersion: "v1",
  debug: false
};

const handleOptions = function(apiKey: string, options: SparkPostOptions) {
  if (typeof apiKey === "object") {
    options = apiKey;
    options.key = Deno.env.get("SPARKPOST_API_KEY");
  } else {
    options = options || {};
    options.key = apiKey;
  }

  options.origin = options.origin || options.endpoint || defaults.origin;

  return options;
};

export interface IClient {
  // FIX these signatures
  delete: (options: any) => Promise<any>;
  get: (options: any) => Promise<any>;
  post: (options: any) => Promise<any>;
  put: (options: any) => Promise<any>;
  reject: (err: any) => void;
}

export class Base {
  client: IClient;
  constructor(client: IClient) {
    this.client = client;
  }
}

export class Client implements IClient {
  apiKey: string;
  version: string;
  defaultHeaders: any; // ?
  origin: any; // ?
  apiVersion: string;
  debug: any; // ?

  constructor(apiKey: string, options: any) {
    const options_: any = handleOptions(apiKey, options);

    const apiKey_ = options_.key || Deno.env.get("SPARKPOST_API_KEY");

    if (typeof apiKey_ === "undefined") {
      throw new Error("Client requires an API Key.");
    }
    this.apiKey = apiKey_;

    // adding version to object
    this.version = version;

    // setting up default headers
    this.defaultHeaders = merge({
      "User-Agent": createVersionStr(version, options),
      "Content-Type": "application/json"
    }, options.headers);

    //Optional client config
    this.origin = options.origin;
    this.apiVersion = options.apiVersion || defaults.apiVersion;
    this.debug = (typeof options.debug === "boolean")
      ? options.debug
      : defaults.debug;
  }
  async request(options: any) {
    const baseUrl = `${this.origin}/api/${this.apiVersion}/`;

    // we need options
    if (!isPlainObject(options)) {
      throw new TypeError("options argument is required");
    }

    // if we don't have a fully qualified URL let's make one
    options.uri = resolveUri(baseUrl, options.uri);

    // merge headers
    options.headers = merge({}, this.defaultHeaders, options.headers);

    // add Authorization with API Key
    options.headers.Authorization = this.apiKey;

    // set Strict SSL (Always true)
    options.strictSSL = true;

    // default to accepting gzipped responses
    if (typeof options.gzip === "undefined") {
      options.gzip = true;
    }

    // set debug
    options.debug = (typeof options.debug === "boolean")
      ? options.debug
      : this.debug;

    let url = options.uri;
    // FIXME does headers need to be a Headers ?
    const init: any = { method: options.method, headers: options.headers };
    if (options.json) {
      init.body = JSON.stringify(options.json);
      // Content-Type', 'text/json' ?
    }
    if (options.qs) {
      const u = new URL(url);
      // @ts-ignore
      Object.entries(options.qs).forEach((item) => {
        // @ts-ignore
        u.searchParams.append(...item);
        url = u.toString();
      });
    }
    const res = await fetch(url, init);

    const invalidCodeRegex = /(5|4)[0-9]{2}/;

    if (invalidCodeRegex.test(res.status.toString())) {
      throw createSparkPostError(res, res.body);
    }
    // if (options.debug) { response.debug = res; }
    return await res.json();
  }

  async get(options: any) {
    options.method = "GET";
    options.json = true;

    return this.request(options);
  }

  async post(options: any) {
    options.method = "POST";

    return this.request(options);
  }

  async put(options: any) {
    options.method = "PUT";

    return this.request(options);
  }

  async delete(options: any) {
    options.method = "DELETE";

    return this.request(options);
  }

  reject(error: any) {
    // withCallback?
    throw error;
  }
}
