import { Base } from "./client.ts";

const api = "relay-webhooks";

export class RelayWebhooks extends Base {
  /**
   * List all relay webhooks
   *
   * @returns {Promise}
   */
  async list() {
    const reqOpts = {
      uri: api
    };
    return await this.client.get(reqOpts);
  }
  /**
   * Get details about a specified relay webhook by its id
   *
   * @param {string} id - the id of the relay webhook you want to look up
   * @returns {Promise}
   */
  async get(id: string) {
    if (!id || typeof id !== "string") {
      return this.client.reject(new Error("id is required"));
    }

    const options = {
      uri: `${api}/${id}`
    };

    return await this.client.get(options);
  }
  /**
   * Create a new relay webhook
   *
   * @param {Object} webhook - an object of [relay webhook attributes]{https://developers.sparkpost.com/api/relay-webhooks#header-relay-webhooks-object-properties}
   * @returns {Promise}
   */
  async create(webhook: any) {
    if (!webhook || typeof webhook !== "object") {
      return this.client.reject(new Error("webhook object is required"));
    }

    const reqOpts = {
      uri: api,
      json: webhook
    };

    return await this.client.post(reqOpts);
  }
  /**
   * Update an existing relay webhook
   *
   * @param {string} id - the id of the relay webhook you want to update
   * @param {Object} webhook - an object of [relay webhook attributes]{https://developers.sparkpost.com/api/relay-webhooks#header-relay-webhooks-object-properties}
   * @returns {Promise}
   */
  async update(id: string, webhook: any) {
    if (!id || typeof id !== "string") {
      return this.client.reject(new Error("id is required"));
    }

    if (!webhook || typeof webhook !== "object") {
      return this.client.reject(new Error("webhook object is required"));
    }

    const reqOpts = {
      uri: `${api}/${id}`,
      json: webhook
    };

    return await this.client.put(reqOpts);
  }
  /**
   * Delete an existing relay webhook
   *
   * @param {string} id - the id of the relay webhook you want to delete
   * @returns {Promise}
   */
  async delete(id: string) {
    if (!id || typeof id !== "string") {
      return this.client.reject(new Error("id is required"));
    }

    const options = {
      uri: `${api}/${id}`
    };

    return await this.client.delete(options);
  }
}
