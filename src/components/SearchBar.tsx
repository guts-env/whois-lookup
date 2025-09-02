'use client';

import { useState } from 'react';
import { TextInput, Button, Group } from '@mantine/core';
import { IWhoIsQueryParams } from '@/types';
import { WhoIsInfoTypeEnum } from '@/types/enum';

interface SearchBarProps {
  onSearch: (params: IWhoIsQueryParams) => void;
  infoType?: WhoIsInfoTypeEnum;
  isLoading: boolean;
}

export function SearchBar({ onSearch, isLoading, infoType }: SearchBarProps) {
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string>('');

  const validateDomainName = (domainName: string) => {
    const regex = /^[a-zA-Z0-9-]{1,63}(\.[a-zA-Z0-9-]{1,63})*\.[a-zA-Z]{2,}$/;
    return regex.test(domainName);
  };

  const handleSearch = () => {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      setError('Please enter a domain name');
      return;
    }

    if (!validateDomainName(trimmedValue)) {
      setError('Please enter a valid domain name');
      return;
    }

    const params: IWhoIsQueryParams = {
      domainName: trimmedValue,
    };

    if (infoType) {
      params.infoType = infoType;
    }

    onSearch(params);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !isLoading) {
      handleSearch();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
    if (error) {
      setError('');
    }
  };

  return (
    <Group align="flex-start">
      <TextInput
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        placeholder="Enter domain name (e.g., amazon.com)"
        error={error}
        disabled={isLoading}
        style={{ flex: 1 }}
        size="sm"
      />
      <Button
        onClick={handleSearch}
        loading={isLoading}
        size="sm"
      >
        {isLoading ? 'Searching...' : 'Search'}
      </Button>
    </Group>
  );
}