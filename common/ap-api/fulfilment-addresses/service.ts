import { APIRequestContext, expect } from "@playwright/test";
import { setupApiContext } from "../utils";
import { fulfilmentAddresses } from "../endpoints";
import { FulfillmentAddresses } from "./models";

export class FulfilmentAddresses {
  apiRequestContext: APIRequestContext;

  constructor() {
    setupApiContext().then((context) => {
      this.apiRequestContext = context;
    });
  }

  public async getFulfilmentAddresses(clientId: number = 0) {
    const response = await this.apiRequestContext.get(
      `${fulfilmentAddresses}/${clientId}`
    );
    expect(response.status()).toBe(200);

    return (await response.json()) as FulfillmentAddresses[];
  }
}
