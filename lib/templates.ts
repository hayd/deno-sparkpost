import { Base } from "./client.ts";
import { cloneDeep } from "./deps.ts";

const api = "templates";

export class Templates extends Base {
  /**
   * List an overview of all templates.
   *
   * @returns {Promise}
   */
  async list() {
    const options = {
      uri: api
    };
    return await this.client.get(options);
  }
  /**
   * Get details about a specified template by its id.
   *
   * @param {string} id
   * @param {Object} options
   * @returns {Promise}
   */
  async get(id: string, options: any) {
    options = options || {};

    if (typeof options === "function") {
      return this.client.reject(new Error("options cannot be a callback"));
    }

    if (!id) {
      return this.client.reject(new Error("template id is required"));
    }

    const reqOpts = {
      uri: `${api}/${id}`,
      qs: options
    };

    return await this.client.get(reqOpts);
  }
  /**
   * Create a new template.
   *
   * @param {Object} template
   * @returns {Promise}
   */
  async create(template: any) {
    if (!template || typeof template !== "object") {
      return this.client.reject(new Error("template object is required"));
    }

    const reqOpts = {
      uri: api,
      json: template
    };

    return await this.client.post(reqOpts);
  }
  /**
   * Update an existing template.
   *
   * @param {String} id
   * @param {Object} template
   * @param {Object} options
   * @returns {Promise}
   */
  async update(id: string, template: any, options: any) {
    // Handle optional options argument
    if (typeof options === "function") {
      return this.client.reject(new Error("options cannot be a callback"));
    }

    if (!id) {
      return this.client.reject(new Error("template id is required"));
    }

    if (!template || typeof template !== "object") {
      return this.client.reject(new Error("template object is required"));
    }

    const reqOpts = {
      uri: `${api}/${id}`,
      json: template,
      qs: options
    };

    return await this.client.put(reqOpts);
  }
  /**
   * Delete an existing template.
   *
   * @param {String} id
   * @returns {Promise}
   */
  async delete(id: string) {
    if (!id || typeof id !== "string") {
      return this.client.reject(new Error("template id is required"));
    }

    const options = {
      uri: `${api}/${id}`
    };
    return await this.client.delete(options);
  }
  /**
   * Preview the most recent version of an existing template by id.
   *
   * @param {String} id
   * @param {Object} options
   * @returns {Promise}
   */
  async preview(id: string, options: any) {
    options = options || {};

    // Handle optional options argument
    if (typeof options === "function") {
      return this.client.reject(new Error("options cannot be a callback"));
    }

    if (!id) {
      return this.client.reject(new Error("template id is required"));
    }

    const reqOpts = {
      uri: `${api}/${id}/preview`,
      json: cloneDeep(options),
      qs: {}
    };
    const qs: any = reqOpts.qs; // force any type

    // Add draft to query params
    if (reqOpts.json.hasOwnProperty("draft")) {
      qs.draft = reqOpts.json.draft;
      delete reqOpts.json.draft;
    }

    return await this.client.post(reqOpts);
  }
}
