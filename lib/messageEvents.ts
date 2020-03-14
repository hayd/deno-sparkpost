import { Base } from "./client.ts";

const api = "message-events";

/*
 * "Class" declaration, Message Events API exposes one function:
 * - search: retrieves list of message events according to given params
 */
export class MessageEvents extends Base {
  /**
   * Search for message events using given parameters
   *
   * @param {Object} parameters
   * @returns {Promise}
   */
  async search(parameters: any) {
    const options = {
      uri: api,
      qs: {}
    };
    const qs: any = options.qs; // force to any type
    Object.keys(parameters).forEach(function(paramname: string) {
      if (Array.isArray(parameters[paramname])) {
        qs[paramname] = parameters[paramname].join(",");
      } else {
        qs[paramname] = parameters[paramname];
      }
    });
    return await this.client.get(options);
  }
}
