import { Base } from "./client.ts";
import {
  cloneDeep,
  filter,
  has,
  isArray,
  isString,
  isPlainObject,
  map,
  set
} from "./deps.ts";

const api = "transmissions";

/*
 * "Class" declaration, Transmissions exposes three functions, one for sending a transmission,
 * another for getting a list of transmissions that have been sent, and another for getting
 * info about a specific transmission
 */
export class Transmissions extends Base {
  /**
   * List an overview of all transmissions in the account
   *
   * @param {Object} options
   * @returns {Promise}
   */
  async list(options: any) {
    // Handle optional options argument
    if (typeof options === "function") {
      return this.client.reject(new Error("options cannot be a callback"));
    }

    const reqOpts = {
      uri: api,
      qs: options
    };

    return await this.client.get(reqOpts);
  }
  /**
   * Retrieve the details about a transmission by its id
   *
   * @param {String} id
   * @returns {Promise}
   */
  async get(id: string) {
    if (typeof id !== "string") {
      return this.client.reject(new Error("id is required"));
    }

    const options = {
      uri: `${api}/${id}`
    };

    return await this.client.get(options);
  }
  /**
   * Sends a message by creating a new transmission
   *
   * @param {Object} transmission
   * @param {Object} options
   * @returns {Promise}
   */
  async send(transmission: any, options: any) {
    // Handle optional options argument
    if (typeof options === "function") {
      return this.client.reject(new Error("options cannot be a callback"));
    }

    if (!transmission || typeof transmission !== "object") {
      return this.client.reject(new Error("transmission object is required"));
    }

    transmission = formatPayload(transmission);

    const reqOpts = {
      uri: api,
      json: transmission,
      qs: options
    };

    return await this.client.post(reqOpts);
  }
}

function formatPayload(originalTransmission: any) {
  const transmission = cloneDeep(originalTransmission);

  // don't format the payload if we are not given an array of recipients
  if (!isArray(transmission.recipients)) {
    return transmission;
  }

  // format all the original recipients to be in the object format
  transmission.recipients = map(
    transmission.recipients,
    (recipient: any) => {
      recipient.address = addressToObject(recipient.address);

      return recipient;
    }
  );

  // add the CC headers
  if (isArray(transmission.cc) && transmission.cc.length > 0) {
    set(transmission, "content.headers.CC", generateCCHeader(transmission));
  }

  const headerTo = generateHeaderTo(transmission.recipients);

  transmission.recipients = addListToRecipients(transmission, "cc", headerTo);
  transmission.recipients = addListToRecipients(transmission, "bcc", headerTo);

  delete transmission.cc;
  delete transmission.bcc;

  return transmission;
}

// FIXME these shouldn't all be any
function addListToRecipients(transmission: any, listName: any, headerTo: any) {
  if (!isArray(transmission[listName])) {
    return transmission.recipients;
  }

  return transmission.recipients.concat(
    map(transmission[listName], (recipient: any) => {
      recipient.address = addressToObject(recipient.address);

      recipient.address.header_to = headerTo;

      // remove name from address - name is only put in the header for cc and not at all for bcc
      if (has(recipient.address, "name")) {
        delete recipient.address.name;
      }

      return recipient;
    })
  );
}

function generateCCHeader(transmission: any) {
  return map(
    transmission.cc,
    (ccRecipient: any) => addressToString(ccRecipient.address)
  ).join(", ");
}

function generateHeaderTo(recipients: any) {
  // if a recipient has a header_to then it is cc'd or bcc'd and we don't want it in the header_to value
  const originalRecipients = filter(
    recipients,
    (recipient: any) => !has(recipient.address, "header_to")
  );

  return map(
    originalRecipients,
    (recipient: any) => addressToString(recipient.address)
  ).join(", ");
}

function addressToString(address: any) {
  if (isPlainObject(address)) {
    if (has(address, "name")) {
      address = `"${address.name}" <${address.email}>`;
    } else {
      address = address.email;
    }
  }

  return address;
}

function addressToObject(address: any) {
  let addressObject = address;

  if (isString(address)) {
    addressObject = {};

    const matches = /"?(.[^"]*)?"?\s*<(.+)>/gi.exec(address);

    if (matches) {
      addressObject.name = matches[1];
      addressObject.email = matches[2];
    } else {
      addressObject.email = address;
    }
  }

  return addressObject;
}
