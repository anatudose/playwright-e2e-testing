export interface BusinessService {
  id?: number;
  serviceId?: number;
  serviceType?: string;
  startDate?: Date;
  status?: string;
  statusId?: number;
  businessServiceType?: number;
  clientBusinessServiceAttributes?: Array<any>;
}
