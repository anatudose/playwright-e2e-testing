import { APIRequestContext, expect } from "@playwright/test";
import { businessServices } from "../endpoints";
import { BusinessService } from "./models";
import { setupApiContext } from "../utils";
import { BusinessServiceEnum, CLIENT_ID } from "../../constants";

export class BusinessServices {
  apiRequestContext: APIRequestContext;

  constructor() {
    setupApiContext().then((context) => {
      this.apiRequestContext = context;
    });
  }

  public async getClientBusinessServices(clientId: number = CLIENT_ID) {
    const response = await this.apiRequestContext.get(
      `${businessServices}/${clientId}`
    );
    expect(response.status()).toBe(200);

    return (await response.json()) as BusinessService[];
  }

  public async deleteBusinessService(id: number) {
    const response = await this.apiRequestContext.delete(
      `${businessServices}/${id}`
    );
    expect(response.status()).toBe(200);
  }

  public async postBusinessService(options?: {
    clientId?: number;
    businessServiceId?: number;
    startDate?: Date;
    status?: number;
  }) {
    const requestBody = {
      clientId: options?.clientId ? options?.clientId : CLIENT_ID,
      businessServiceId: options?.businessServiceId
        ? options.businessServiceId
        : BusinessServiceEnum.Xhipment,
      startDate: options?.startDate
        ? options?.startDate
        : new Date().toISOString(),
      status: options?.status ? options?.status : 1,
    };

    const response = await this.apiRequestContext.post(`${businessServices}`, {
      data: requestBody,
    });
    expect(response.status()).toBe(201);

    return (await response.json()) as BusinessService;
  }

  public async updateBusinessService(
    id: number,
    options?: {
      businessServiceId?: number;
      clientId?: number;
      startDate?: Date;
      status?: number;
    }
  ) {
    const requestBody = {
      id: id,
      businessServiceId: options?.businessServiceId
        ? options.businessServiceId
        : BusinessServiceEnum.Xhipment,
      clientId: options?.clientId ? options?.clientId : CLIENT_ID,
      startDate: options?.startDate
        ? options?.startDate
        : new Date().toISOString(),
      status: options?.status ? options?.status : 1,
    };

    const response = await this.apiRequestContext.put(`${businessServices}`, {
      data: requestBody,
    });
    expect(response.status()).toBe(202);

    return (await response.json()) as BusinessService;
  }
}
