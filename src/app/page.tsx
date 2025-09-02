'use client';

import { useState } from 'react';
import {
  Container,
  Title,
  Text,
  Paper,
  Stack,
  Alert,
  Box,
  Divider,
  Group,
  Checkbox,
} from '@mantine/core';
import { ContactInfoTable } from '@/components/ContactInfoTable';
import { DomainInfoTable } from '@/components/DomainInfoTable';
import useWhoIs from '@/hooks/useWhoIs';
import { SearchBar } from '@/components/SearchBar';
import { TableSkeleton } from '@/components/TableSkeleton';
import { WhoIsInfoTypeEnum } from '@/types/enum';

export default function Home() {
  const { data, isLoading, error, fetchWhoIs } = useWhoIs();

  const [infoType, setInfoType] = useState<WhoIsInfoTypeEnum | undefined>(undefined);

  return (
    <Box
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #f8f9fa 0%, #abc1e0 100%)'
      }}
    >
      <Container size="md" py="xl">
        <Stack gap="xl">
          <Paper shadow="sm" radius="md" p="xl" mt="xl">
            <Stack gap="md">
              <Group justify="space-between" align="center">
                <div>
                  <Title order={1} size="h2" fw={700} c="dark.8">
                    WHOIS Domain Lookup
                  </Title>
                  <Text size="sm" c="dimmed" mt={4}>
                    Search domain registration and ownership information
                  </Text>
                </div>
              </Group>

              <Divider />

              <SearchBar onSearch={fetchWhoIs} isLoading={isLoading} infoType={infoType} />

              <Text size="xs" c="dimmed">
                Select the information you want to view. Both will be displayed if neither is selected.
              </Text>

              <Group align="center" gap="md">
                <Checkbox
                  label="Domain Information"
                  checked={infoType === WhoIsInfoTypeEnum.DOMAIN_INFO}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => 
                    setInfoType(event.currentTarget.checked ? WhoIsInfoTypeEnum.DOMAIN_INFO : undefined)
                  }
                  disabled={isLoading}
                />
                <Checkbox
                  label="Contact Information"
                  checked={infoType === WhoIsInfoTypeEnum.DOMAIN_CONTACT}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => 
                    setInfoType(event.currentTarget.checked ? WhoIsInfoTypeEnum.DOMAIN_CONTACT : undefined)
                  }
                  disabled={isLoading}
                />
              </Group>
            </Stack>
          </Paper>

          {isLoading && infoType === WhoIsInfoTypeEnum.DOMAIN_INFO && (
            <DomainInfoSkeleton />
          )}

          {isLoading && infoType === WhoIsInfoTypeEnum.DOMAIN_CONTACT && (
            <ContactInfoSkeleton />
          )}

          {isLoading && !infoType && (
            <>
              <DomainInfoSkeleton />
              <ContactInfoSkeleton />
            </>
          )}

          {error && (
            <Paper shadow="sm" radius="md" p="md">
              <Alert
                title="Lookup Failed"
                color="red"
                variant="light"
                radius="md"
              >
                <Text size="sm">{error}</Text>
              </Alert>
            </Paper>
          )}

          {!isLoading && !error && data.domainInfo && (
          <Paper shadow="sm" radius="md" p="xl">
            <Stack gap="md">
              <Title order={2} size="h4" fw={600} c="dark.7">
                Domain Information
              </Title>
              <Divider />
              <DomainInfoTable data={data.domainInfo} />
            </Stack>
          </Paper>
          )}

          {!isLoading && !error && data.contactInfo && (
          <Paper shadow="sm" radius="md" p="xl">
            <Stack gap="md">
              <Title order={2} size="h4" fw={600} c="dark.7">
                Contact Information
              </Title>
              <Divider />
              <ContactInfoTable data={data.contactInfo} />
            </Stack>
          </Paper>
          )}

          {!isLoading && !error && !data.domainInfo && !data.contactInfo && (
            <Paper shadow="sm" radius="md" p="xl" style={{ textAlign: 'center' }}>
              <Stack gap="md" align="center">
                <Title order={3} size="h5" fw={500} c="dimmed">
                  No Results Yet
                </Title>
                <Text size="sm" c="dimmed" maw={400}>
                  Enter a domain name above to view its WHOIS information.
                </Text>
              </Stack>
            </Paper>
          )}
        </Stack>
      </Container>
    </Box >
  );
}

function DomainInfoSkeleton() {
  return (
    <Paper shadow="sm" radius="md" p="xl">
      <Stack gap="md">
        <Text fw={500} size="lg">Loading domain information...</Text>
        <TableSkeleton />
      </Stack>
    </Paper>
  );
}

function ContactInfoSkeleton() {
  return (
    <Paper shadow="sm" radius="md" p="xl">
      <Stack gap="md">
        <Text fw={500} size="lg">Loading contact information...</Text>
        <TableSkeleton columns={4} />
      </Stack>
    </Paper>
  );
}