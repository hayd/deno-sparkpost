import { Base } from "./client.ts";

const api = "recipient-lists";

export class RecipientLists extends Base {
  /**
   * Get a list of all your recipient lists
   * https://developers.sparkpost.com/api/recipient-lists#recipient-lists-retrieve-get
   *
   * @return {Promise}
   */
  async list() {
    const reqOpts = {
      uri: api
    };
    return await this.client.get(reqOpts);
  }

  /**
   * Get a list of all your recipient lists
   * https://developers.sparkpost.com/api/recipient-lists#recipient-lists-list-get
   *
   * @param {string} id - Unique ID of the list to return
   * @param {Object} options - Hash of request options
   * @return {Promise}
   */
  async get(id: string, options: any) {
    options = options || {};

    // Handle optional options argument
    if (typeof options === "function") {
      return this.client.reject(new Error("options cannot be a callback"));
    }

    if (!id) {
      return this.client.reject(new Error("id is required"));
    }

    const reqOpts = {
      uri: `${api}/${id}`,
      qs: options
    };

    return await this.client.get(reqOpts);
  }

  /**
   * Create a new recipient list
   * https://developers.sparkpost.com/api/recipient-lists#recipient-lists-create-post
   *
   * @param  {Object} recipientList - recipient list object
   * @param  {Array} recipientList.recipients - Array of recipient objects
   * @return {Promise}
   */
  async create(recipientList: any) {
    if (
      !recipientList || typeof recipientList !== "object" ||
      !recipientList.recipients
    ) {
      return this.client.reject(new Error("recipient list is required"));
    }

    const reqOpts = {
      uri: api,
      json: recipientList,
      qs: {
        num_rcpt_errors: recipientList.num_rcpt_errors
      }
    };

    return await this.client.post(reqOpts);
  }

  /**
   * Update an existing list
   * https://developers.sparkpost.com/api/recipient-lists#recipient-lists-update-put
   *
   * @param {string} id - Unique ID of the list to be updated
   * @param {Object} recipientList - recipient list object
   * @param  {Array} recipientList.recipients - Array of recipient objects
   * @return {Promise}
   *
   */
  async update(id: string, recipientList: any) {
    if (!id) {
      return this.client.reject(new Error("recipient list id is required"));
    }

    if (!recipientList || typeof recipientList === "function") {
      return this.client.reject(new Error("recipient list is required"));
    }

    const reqOpts = {
      uri: `${api}/${id}`,
      json: recipientList,
      qs: {
        num_rcpt_errors: recipientList.num_rcpt_errors
      }
    };

    return await this.client.put(reqOpts);
  }

  /**
   * Delete an existing recipient list
   * https://developers.sparkpost.com/api/recipient-lists#recipient-lists-delete-delete
   *
   * @param {string} id - ID of the list to be updated
   * @param  {RequestCb} callback
   * @return {Promise}
   *
   */
  async delete(id: string) {
    if (!id || typeof id !== "string") {
      return this.client.reject(new Error("id is required"));
    }

    const reqOpts = {
      uri: `${api}/${id}`
    };

    return await this.client.delete(reqOpts);
  }
}
