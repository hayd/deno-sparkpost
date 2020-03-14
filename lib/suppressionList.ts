import { Base } from "./client.ts";

const api = "suppression-list";

export class SuppressionList extends Base {
  /**
   * Lists all entries in your suppression list,
   * filtered by an optional set of parameters
   *
   * @param {Object} [parameters] - Hash of parameters to filter results
   * @return {Promise},
   */
  async list(parameters: any) {
    const options = {
      uri: api,
      qs: parameters
    };
    return await this.client.get(options);
  }

  /**
   * Gets a single entry by email address ID
   *
   * @param {String} email
   * @return {Promise}
   */
  async get(email: string) {
    if (!email || typeof email === "function") {
      return this.client.reject(new Error("email is required"));
    }

    const options = {
      uri: `${api}/${email}`
    };
    return await this.client.get(options);
  }

  /**
   * Updates existing entries, or creates entries
   * if they don't exist for that email address ID
   *
   * @param {Array|Object} listEntries - List of suppression entry objects to upsert
   * @return {Promise}
   */
  async upsert(listEntries: any) {
    if (!listEntries || typeof listEntries === "function") {
      return this.client.reject(new Error("list entries is required"));
    }

    if (!Array.isArray(listEntries)) {
      listEntries = [listEntries];
    }

    const options = {
      uri: api,
      json: { recipients: listEntries }
    };

    return await this.client.put(options);
  }

  /**
   * Deletes a single entry, by email address ID
   *
   * @param {String} email
   * @return {Promise}
   */
  async delete(email: string) {
    if (!email || typeof email === "function") {
      return this.client.reject(new Error("email is required"));
    }

    const options = {
      uri: `${api}/${email}`
    };
    return await this.client.delete(options);
  }
}
