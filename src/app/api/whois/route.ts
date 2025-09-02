import { NextRequest, NextResponse } from 'next/server';
import {
  IWhoIsResponse,
  IWhoIsQueryParams,
  IWhoIsResponseData,
  IDomainInfo,
  IWhoIsRecord,
  IDomainContactInfo,
} from '@/types';
import { WhoIsInfoTypeEnum, WhoIsResponseType } from '@/types/enum';

const WHOIS_API_KEY = process.env.WHOIS_API_KEY;
const WHOIS_BASE_URL = 'https://www.whoisxmlapi.com/whoisserver/WhoisService?';

const transformByInfoType = (data: IWhoIsRecord, infoType?: WhoIsInfoTypeEnum): IWhoIsResponseData => {
  const whoisRecord = data.WhoisRecord;

  const domainData: IDomainInfo = {
    domainName: whoisRecord.registryData.domainName || '-',
    registrarName: whoisRecord.registryData.registrarName || '-',
    registrationDate: whoisRecord.registryData.createdDateNormalized || whoisRecord.registryData.createdDate || '-',
    expirationDate: whoisRecord.registryData.expiresDateNormalized || whoisRecord.registryData.expiresDate || '-',
    estimatedDomainAge: whoisRecord.estimatedDomainAge || '-',
    hostnames:
      whoisRecord.registryData.nameServers.hostNames.length > 0 ? whoisRecord.registryData.nameServers.hostNames : '-',
  };

  /* 
    Administrative contact is not found in the whois record 
    with same parameters provided to the API as their example here:
    https://www.postman.com/whoisxmlapi-llc/whoisxmlapi/example/18021624-1b3d9d77-09b8-4b5d-80df-b8f4b79200e8
  */
  const domainContactData: IDomainContactInfo = {
    registrantName: whoisRecord.registrant.name || '-',
    technicalContactName: whoisRecord.technicalContact.name || '-',
    administrativeContactName: whoisRecord.administrativeContact?.organization || whoisRecord.registrant.name || '-',
    contactEmail: whoisRecord.registrant.email || '-',
  };

  if (infoType === WhoIsInfoTypeEnum.DOMAIN_INFO) {
    return {
      domainInfo: domainData,
    };
  }

  if (infoType === WhoIsInfoTypeEnum.DOMAIN_CONTACT) {
    return {
      contactInfo: domainContactData,
    };
  }

  return {
    domainInfo: domainData,
    contactInfo: domainContactData,
  };
};

export async function GET(request: NextRequest): Promise<NextResponse<IWhoIsResponse>> {
  const { searchParams } = new URL(request.url);
  const domainName = searchParams.get('domainName');
  const infoType = searchParams.get('infoType') as WhoIsInfoTypeEnum | undefined;

  if (!WHOIS_API_KEY) {
    return NextResponse.json({ success: false, error: { message: 'WhoIsApi API key is required' } }, { status: 401 });
  }

  if (!domainName) {
    return NextResponse.json({ success: false, error: { message: 'Domain name is required' } }, { status: 400 });
  }

  const params: IWhoIsQueryParams = {
    domainName,
    apiKey: WHOIS_API_KEY,
    outputFormat: WhoIsResponseType.JSON,
    ignoreRawTexts: '1',
  };

  try {
    const response = await fetch(WHOIS_BASE_URL + new URLSearchParams(params));

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: { message: response.statusText } },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (!data?.WhoisRecord) {
      return NextResponse.json(
        { success: false, error: { message: 'Invalid response from WhoIs API' } },
        { status: 500 }
      );
    }

    const createdDate =
      data.WhoisRecord.registryData.createdDateNormalized || data.WhoisRecord.registryData.createdDate;

    if (!createdDate) {
      return NextResponse.json(
        {
          success: false,
          error: { message: 'Domain data unavailable - may be unregistered, expired, or privacy-protected' },
        },
        { status: 404 }
      );
    }

    const transformedData = transformByInfoType(data, infoType);

    return NextResponse.json({ success: true, data: transformedData });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: { message: 'Error encountered while fetching data' } },
      { status: 500 }
    );
  }
}
