'use client';

import { useState } from 'react';
import { IWhoIsQueryParams, IWhoIsResponse, IWhoIsResponseData } from '@/types';

export default function useWhoIs() {
  const [data, setData] = useState<IWhoIsResponseData>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWhoIs = async (params: IWhoIsQueryParams) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/whois?' + new URLSearchParams(params));
      const res: IWhoIsResponse = await response.json();

      console.log(res);

      if (res.success) {
        setData(res.data);
      } else {
        setError(res.error.message);
      }
    } catch (error) {
      console.error(error);
      setError(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fetchWhoIs,
    data,
    isLoading,
    error,
  };
}
