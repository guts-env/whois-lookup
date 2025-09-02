'use client';

import { IDomainInfo } from '@/types';
import { Table, ScrollArea, Group, Badge } from '@mantine/core';

interface IDomainInfoTableProps {
  data: IDomainInfo;
}

const truncateText = (text: string, maxLength: number = 25): string => {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

export function DomainInfoTable({ data }: IDomainInfoTableProps) {
  const rows = (
    <Table.Tr key={data.domainName}>
      <Table.Td w="15%"><Badge size="sm" variant="light">{data.domainName}</Badge></Table.Td>
      <Table.Td w="20%">{data.registrarName}</Table.Td>
      <Table.Td>{new Date(data.registrationDate).toLocaleDateString()}</Table.Td>
      <Table.Td>{new Date(data.expirationDate).toLocaleDateString()}</Table.Td>
      <Table.Td>{data.estimatedDomainAge}</Table.Td>
      <Table.Td>
        <Group gap={4}>
          {Array.isArray(data.hostnames) ?
            truncateText(data.hostnames.join(', '))
            : data.hostnames}
        </Group>
      </Table.Td>
    </Table.Tr>
  );

  return (
    <ScrollArea>
      <Table striped highlightOnHover withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Domain Name</Table.Th>
            <Table.Th>Registrar</Table.Th>
            <Table.Th>Registration Date</Table.Th>
            <Table.Th>Expiration Date</Table.Th>
            <Table.Th>Estimated Domain Age</Table.Th>
            <Table.Th>Hostnames</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
}