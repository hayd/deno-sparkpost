import { resolve } from "./deps.ts";

export class SparkPostError extends Error {
  errors: any;
  statusCode: any;

  constructor(message: string, errors: any, statusCode: any) {
    super(message);
    this.name = "SparkPostError";
    this.errors = errors;
    this.statusCode = statusCode;
  }
}

export const createSparkPostError = function(res: any, body: any) {
  return new SparkPostError(res.statusMessage, body.errors, res.statusCode);
};

export function resolveUri(origin: string, uri: string) {
  if (!/^http/.test(uri)) {
    const url = new URL(origin);
    const newPathname = resolve(url.pathname, uri);
    url.pathname = newPathname;
    return url.toString();
  }
  return uri;
}

export const createVersionStr = function(version: string, options: any) {
  let versionStr = `deno-sparkpost/${version} deno/${Deno.version.deno}`;
  if (options.stackIdentity) {
    versionStr += `${options.stackIdentity} ${versionStr}`;
  }
  return versionStr;
};
