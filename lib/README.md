<a href="https://www.sparkpost.com"><img src="https://www.sparkpost.com/sites/default/files/attachments/SparkPost_Logo_2-Color_Gray-Orange_RGB.svg" width="200px"/></a>

[Sign up][sparkpost sign up] for a SparkPost account and visit our [Developer Hub](https://developers.sparkpost.com) for even more content.

# Deno Client Library

Unofficial Deno binding for your favorite [SparkPost APIs](https://developers.sparkpost.com/api)!

## Prerequisites

Before using this library, you must have:

* A shiny new SparkPost Account, [sign up for a new account][sparkpost sign up] or [login to SparkPost](https://app.sparkpost.com/)
* A valid SparkPost API Key. Check out our [Support Center](https://support.sparkpost.com/) for information on how to [create API keys](https://support.sparkpost.com/customer/portal/articles/1933377-create-api-keys)

## Initialization
**new SparkPost(apiKey[, options])** - Initialization

* `apiKey`
    * Required: yes (unless key is stored in `SPARKPOST_API_KEY` environment variable)
    * Type: `String`
    * a passed in apiKey will take precedence over an environment variable
* `options.origin` or `options.endpoint`
    * Required: no
    * Type: `String`
    * Default: `https://api.sparkpost.com:443`<br/>
    *Note: To use the SparkPost EU API you will need to set this to `https://api.eu.sparkpost.com:443`.*
* `options.apiVersion`
    * Required: no
    * Type: `String`
    * Default: `v1`
* `options.stackIdentity`
    * Required: no
    * Type: `String`
    * An optional identifier to include in the User-Agent header. e.g. `product/1.0.0`
* `options.headers`
    * Required: no
    * Type: `Object`
    * set headers that apply to all requests
* `options.debug`
    * Required: no
    * Type: `Boolean`
    * Default: `false`
    * appends full response from request client as `debug` when `true` for debugging purposes<br/>
    *Note: This will expose your api key to the client-side. Do not use in production.*

## Methods

*Note: All methods are promises.

* **request(options)**
    * `options` - [see request modules options](https://github.com/mikeal/request#requestoptions-callback)
    * `options.uri` - can either be a full url or a path that is appended to `options.origin` used at initialization ([url.resolve](http://nodejs.org/api/url.html#url_url_resolve_from_to))
    * `options.debug` - setting to `true` includes full response from request client for debugging purposes
* **get | post | put | delete(options)**
    * `options` - see request options
    * Request method will be overwritten and set to the same value as the name of these methods.

## Creating a SparkPost Client

Passing in an API key
```ts
import { SparkPost } from "https://deno.land/x/sparkpost/mod.ts";
const client = new SparkPost('YOUR_API_KEY');
```

Using an API key stored in an environment variable
```ts
//Create an env var as SPARKPOST_API_KEY
import { SparkPost } from "https://deno.land/x/sparkpost/mod.ts";
const client = new SparkPost();
```

Specifying non-default options
```ts
import { SparkPost } from "https://deno.land/x/sparkpost/mod.ts";
const options = {
  endpoint: 'https://dev.sparkpost.com:443'
};
const client = new SparkPost('YOUR_API_KEY', options);
```

## Using the Deno Client Library Base Class

We may not wrap every resource available in the SparkPost Client Library, for example the Deno Client Library does not wrap the Metrics resource,
but you can use the Deno Client Library Base Class to form requests to these unwrapped resources. Here is an example request using the
Base class to make requests to the Metrics resource. Here is an example request using the base object to make requests to
the Metrics resource.

```ts
// Get a list of domains that the Metrics API contains data on.
const options = {
  uri: 'metrics/domains'
};

await client.get(options)
```

## Send An Email "Hello World" Example
Below is an example of how to send a simple email. Sending an email is known as a *transmission*. By using the send
method on the transmissions service that's available from the SparkPost object you instantiate, you can pass in an
object with all the [transmission attributes](https://developers.sparkpost.com/api/transmissions#header-transmission-attributes)
relevant to the email being sent. The send method will return a promise that will let you know if the email was sent
successful and if not information about the error that occurred. If a callback is passed, it will be executed.

```ts
import { SparkPost } from "https://deno.land/x/sparkpost/mod.ts";
const client = new SparkPost('<YOUR API KEY>');

// If you have a SparkPost EU account you will need to pass a different `origin` via the options parameter:
// const euClient = new SparkPost('<YOUR API KEY>', { origin: 'https://api.eu.sparkpost.com:443' });

await client.transmissions.send({
  options: {
    sandbox: true
  },
  content: {
    from: 'testing@sparkpostbox.com',
    subject: 'Hello, World!',
    html:'<html><body><p>Testing SparkPost - the world\'s most awesomest email service!</p></body></html>'
  },
  recipients: [
    {address: '<YOUR EMAIL ADDRESS>'}
  ]
})
```

## SparkPost API Resources Supported in Deno Client Library

TODO

### Testing

TODO

[sparkpost sign up]: https://app.sparkpost.com/join?plan=free-0817?src=Social%20Media&sfdcid=70160000000pqBb&pc=GitHubSignUp&utm_source=github&utm_medium=social-media&utm_campaign=github-deno&utm_content=sign-up