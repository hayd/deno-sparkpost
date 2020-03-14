import { Base } from "./client.ts";

const api = "events";

/*
 * "Class" declaration, Events API exposes one function:
 * - search: retrieves list of message events according to given params
 */
export class Events extends Base {
  /**
   * Search for events using given parameters
   *
   * @param {Object} parameters
   * @returns {Promise}
   */
  async searchMessage(parameters: any) {
    const options: any = {
      uri: `${api}/message`,
      qs: {}
    };

    Object.keys(parameters).forEach(function(paramname) {
      if (Array.isArray(parameters[paramname])) {
        options.qs[paramname] = parameters[paramname].join(",");
      } else {
        options.qs[paramname] = parameters[paramname];
      }
    });
    return await this.client.get(options);
  }
}
