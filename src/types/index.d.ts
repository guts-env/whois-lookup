import { WhoIsInfoTypeEnum } from './enum';

export interface IDomainInfo {
  domainName: string;
  registrarName: string;
  registrationDate: string;
  expirationDate: string;
  estimatedDomainAge: number | string;
  hostnames: string[] | string;
}

export interface IDomainContactInfo {
  registrantName: string;
  technicalContactName: string;
  administrativeContactName: string;
  contactEmail: string;
}

export interface IAPIError {
  message: string;
}

export interface IWhoIsErrorResponse {
  success: false;
  error: IAPIError;
}

export interface IWhoIsResponseData {
  domainInfo?: IDomainInfo;
  contactInfo?: IDomainContactInfo;
}

export interface IWhoIsSuccessResponse {
  success: true;
  data: IWhoIsResponseData;
}

export type IWhoIsResponse = IWhoIsErrorResponse | IWhoIsSuccessResponse;

export interface IWhoIsRequestParams {
  domainName: string;
  infoType?: WhoIsInfoTypeEnum;
}

export interface IWhoIsParams extends IWhoIsRequestParams {
  apiKey: string;
  outputFormat: 'JSON' | 'XML';
  ignoreRawTexts?: '1' | '0';
}

export type IWhoIsQueryParams = {
  [K in keyof Partial<IWhoIsParams>]: string;
};

export interface IWhoIsRecord {
  WhoisRecord: {
    estimatedDomainAge: number;
    registrant: {
      name: string;
      email: string;
    };
    administrativeContact?: {
      organization?: string;
    };
    technicalContact: {
      name: string;
      email: string;
    };
    registryData: {
      createdDateNormalized: string;
      updatedDateNormalized: string;
      expiresDateNormalized: string;
      createdDate: string;
      updatedDate: string;
      expiresDate: string;
      domainName: string;
      registrarName: string;
      nameServers: {
        hostNames: string[];
        ips: string[];
      };
    };
  };
}
