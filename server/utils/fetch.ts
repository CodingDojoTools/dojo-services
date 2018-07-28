import * as simpleRequest from 'request';

export function fetch<T>(url: string): Promise<[T, simpleRequest.Response]> {
  return new Promise((resolve, reject) => {
    simpleRequest(url, (error, response, body: T) => {
      if (error) {
        return reject([error, response]);
      }

      resolve([body, response]);
    });
  });
}
