import { Base } from "./client.ts";

const api = "webhooks";

export class Webhooks extends Base {
  /**
   * Lists all webhooks
   *
   * @param {Object} [options] - Hash of options
   * @param {string} [options.timezone] - The timezone to use for the last_successful and last_failure properties.
   * @returns {Promise}
   */
  async list(options: any) {
    const reqOpts = {
      uri: api,
      qs: {}
    };
    const qs: any = reqOpts.qs;

    if (!options || typeof options === "function") {
      return this.client.reject(new Error("options cannot be a callback"));
    }

    if (options.timezone) {
      qs.timezone = options.timezone;
    }

    return await this.client.get(reqOpts);
  }

  /**
   * Get a single webhook by ID
   *
   * @param {string} id - The ID of the webhook to get
   * @param {Object} [options] - Hash of options
   * @param {string} [options.timezone] - The timezone to use for the last_successful and last_failure properties.
   * @returns {Promise}
   */
  async get(id: string, options: any) {
    if (!options || typeof options === "function") {
      return this.client.reject(new Error("options cannot be a callback"));
    }

    if (typeof id !== "string") {
      return this.client.reject(new Error("id is required"));
    }

    const reqOpts = {
      uri: `${api}/${id}`,
      qs: {}
    };
    const qs: any = reqOpts.qs;

    if (options.timezone) {
      qs.timezone = options.timezone;
    }

    return await this.client.get(reqOpts);
  }

  /**
   * Creates a new webhook
   *
   * @param {Object} webhook - attributes used to create the new webhook
   * @param {RequestCb} [callback]
   * @returns {Promise}
   */
  async create(webhook: any) {
    if (!webhook || typeof webhook === "function") {
      return this.client.reject(new Error("webhook object is required"));
    }

    const options = {
      uri: api,
      json: webhook
    };

    return await this.client.post(options);
  }

  /**
   * Update an existing webhook
   *
   * @param {string} id - The ID of the webhook to update
   * @param {Object} webhook - Hash of the webhook attributes to update
   * @param {RequestCb} [callback]
   * @returns {Promise}
   */
  async update(id: string, webhook: any) {
    if (!id) {
      return this.client.reject(new Error("id is required"));
    }

    if (!webhook || typeof webhook === "function") {
      return this.client.reject(new Error("webhook object is required"));
    }

    const options = {
      uri: `${api}/${id}`,
      json: webhook
    };

    delete options.json.id;

    return await this.client.put(options);
  }

  /**
   * Delete an existing webhook
   *
   * @param {string} id - The ID of the webhook to delete
   * @returns {Promise}
   */
  async delete(id: string) {
    if (!id || typeof id === "function") {
      return this.client.reject(new Error("id is required"));
    }

    const options = {
      uri: `${api}/${id}`
    };

    return await this.client.delete(options);
  }

  /**
   * Sends an example message event batch from the Webhook API to the target URL.
   *
   * @param {string} id - The ID of the webhook to validate
   * @param {Object} options - Hash of options used to validate the webhook
   * @param {string} options.message - The message (payload) to send to the webhook consumer.
   * @returns {Promise}
   */
  async validate(id: string, options: any) {
    if (typeof id !== "string") {
      return this.client.reject(new Error("id is required"));
    }

    if (!options || typeof options === "function" || !options.message) {
      return this.client.reject(new Error("message is required"));
    }

    const reqOpts = {
      uri: `${api}/${id}/validate`,
      json: {
        message: options.message
      }
    };

    return await this.client.post(reqOpts);
  }

  /**
   * Gets recent status information about a webhook.
   *
   * @param {string} id - The ID of the webhook to check
   * @param {Object} [options] - Hash of options
   * @param {string} [options.limit] - The maximum number of results to return.
   * @returns {Promise}
   */
  async getBatchStatus(id: string, options: any) {
    if (!options || typeof options === "function") {
      return this.client.reject(new Error("options cannot be a callback"));
    }

    if (typeof id !== "string") {
      return this.client.reject(new Error("id is required"));
    }

    const reqOpts = {
      uri: `${api}/${id}/batch-status`,
      qs: {}
    };
    const qs: any = reqOpts.qs;

    if (options.limit) {
      qs.limit = options.limit;
    }

    return await this.client.get(reqOpts);
  }

  /**
   * Lists descriptions of the events, event types, and event fields that could be included in a Webhooks post to your target URL.
   *
   * @returns {Promise}
   */
  async getDocumentation() {
    const reqOpts = {
      uri: `${api}/events/documentation`
    };
    return await this.client.get(reqOpts);
  }

  /**
   * Lists examples of the event data that will be posted to a webhook consumer.
   *
   * @param {Object} [options] - Hash of options
   * @param {string} [options.events] - A comma delimited list of events to get samples of.
   * @returns {Promise}
   */
  async getSamples(options: any) {
    const reqOpts = {
      uri: `${api}/events/samples`,
      qs: {}
    };
    const qs: any = reqOpts.qs;

    if (!options || typeof options === "function") {
      return this.client.reject(new Error("options cannot be a callback"));
    }

    if (options.events) {
      qs.events = options.events;
    }

    return await this.client.get(reqOpts);
  }
}
