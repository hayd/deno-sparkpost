import { Base } from "./client.ts";

const api = "inbound-domains";

export class InboundDomains extends Base {
  /**
   * List an overview of all inbound domains in the account.
   *
   * @returns {Promise}
   */
  list() {
    const options: any = {
      uri: api
    };
    return this.client.get(options);
  }
  /**
   * Get an inbound domain by its domain name
   *
   * @param {string} domain
   * @returns {Promise}
   */
  async get(domain: string) {
    if (!domain || typeof domain !== "string") {
      return this.client.reject(new Error("domain is required"));
    }

    const options: any = {
      uri: `${api}/${domain}`
    };
    return await this.client.get(options);
  }
  /**
   * Create a new inbound domain
   *
   * @param {Object} createOpts
   * @returns {Promise}
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
   * Delete an existing inbound domain
   *
   * @param {string} domain
   * @returns {Promise}
   */
  async delete(domain: string) {
    if (!domain || typeof domain !== "string") {
      return this.client.reject(new Error("domain is required"));
    }

    const options = {
      uri: `${api}/${domain}`
    };
    return await this.client.delete(options);
  }
}
