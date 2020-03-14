import { Base } from "./client.ts";

const api = "sending-domains";

export class SendingDomains extends Base {
  /**
   * Lists all sending domains
   *
   * @return {Promise}
   */
  async list() {
    const options = {
      uri: api
    };

    return await this.client.get(options);
  }

  /**
   * Get a single sending domain, by domain
   *
   * @param {string} domain - The domain name to get
   * @return {Promise}
   */
  async get(domain: string) {
    if (!domain || typeof domain === "function") {
      return this.client.reject(new Error("domain is required"));
    }

    const options = {
      uri: `${api}/${domain}`
    };

    return await this.client.get(options);
  }

  /**
   * Creates a new sending domain
   *
   * @param {Object} createOpts - attributes used to create the new domain
   * @return {Promise}
   */
  async create(createOpts: any) {
    if (!createOpts || typeof createOpts !== "object") {
      return this.client.reject(new Error("create options are required"));
    }

    const options = {
      uri: api,
      json: createOpts
    };

    return await this.client.post(options);
  }

  /**
   * Update an existing sending domain
   *
   * @param {string} domain - The domain to update
   * @param {Object} updateOpts - Hash of the sending domain attributes to update
   * @return {Promise}
   */
  async update(domain: string, updateOpts: any) {
    if (typeof domain !== "string") {
      return this.client.reject(new Error("domain is required"));
    }

    if (!updateOpts || typeof updateOpts !== "object") {
      return this.client.reject(new Error("update options are required"));
    }

    const options = {
      uri: `${api}/${domain}`,
      json: updateOpts
    };

    return await this.client.put(options);
  }

  /**
   * Delete an existing sending domain
   *
   * @param {string} domain - The domain to delete
   * @return {Promise}
   */
  async delete(domain: string) {
    if (typeof domain !== "string") {
      return this.client.reject(new Error("domain is required"));
    }

    const options = {
      uri: `${api}/${domain}`
    };

    return await this.client.delete(options);
  }

  /**
   * Verify an existing sending domain
   *
   * @param {string} domain - The domain to verify
   * @param {Object} options - Hash of options to include in verification request
   * @return {Promise}
   */
  async verify(domain: string, options: any) {
    if (typeof domain !== "string") {
      return this.client.reject(new Error("domain is required"));
    }

    if (!options || typeof options !== "object") {
      return this.client.reject(
        new Error("verification options are required")
      );
    }

    const reqOpts = {
      uri: `${api}/${domain}/verify`,
      json: options
    };

    return await this.client.post(reqOpts);
  }
}
