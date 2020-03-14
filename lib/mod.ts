import { Events } from "./events.ts";
import { InboundDomains } from "./inboundDomains.ts";
import { MessageEvents } from "./messageEvents.ts";
import { RecipientLists } from "./recipientLists.ts";
import { RelayWebhooks } from "./relayWebhooks.ts";
import { SendingDomains } from "./sendingDomains.ts";
import { Subaccounts } from "./subaccounts.ts";
import { SuppressionList } from "./suppressionList.ts";
import { Templates } from "./templates.ts";
import { Transmissions } from "./transmissions.ts";
import { Webhooks } from "./webhooks.ts";
import { Client } from "./client.ts";

// const url = require('url');
// const withCallback = require('./withCallback');
// const request = require('request');

export class SparkPost extends Client {
  inboundDomains: InboundDomains;
  messageEvents: MessageEvents;
  events: Events;
  recipientLists: RecipientLists;
  relayWebhooks: RelayWebhooks;
  sendingDomains: SendingDomains;
  subaccounts: Subaccounts;
  suppressionList: SuppressionList;
  templates: Templates;
  transmissions: Transmissions;
  webhooks: Webhooks;

  constructor(apiKey: string, options: SparkPostOptions) {
    super(apiKey, options);
    this.inboundDomains = new InboundDomains(this);
    this.messageEvents = new MessageEvents(this);
    this.events = new Events(this);
    this.recipientLists = new RecipientLists(this);
    this.relayWebhooks = new RelayWebhooks(this);
    this.sendingDomains = new SendingDomains(this);
    this.subaccounts = new Subaccounts(this);
    this.suppressionList = new SuppressionList(this);
    this.templates = new Templates(this);
    this.transmissions = new Transmissions(this);
    this.webhooks = new Webhooks(this);
  }
}

export interface SparkPostOptions {
  apiVersion?: string;
  endpoint?: string;
  origin?: string;
  // An optional identifier to include in the User-Agent header. e.g. `product/1.0.0`
  stackIdentity?: string;
  // set headers that apply to all requests
  headers?: { string: string };
  debug?: boolean;
  key?: string;
}

/**
 * Standard error-first callback for HTTP requests

 * @callback RequestCb
 * @param {Error} err - Any error that occurred
 * @param {Object} [data] - API response body (or just the value of `body.results`, if it exists)
 */
