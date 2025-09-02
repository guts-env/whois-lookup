'use client';

import { IDomainContactInfo } from '@/types';
import { Table, ScrollArea } from '@mantine/core';

interface IContactInfoTableProps {
  data: IDomainContactInfo;
}

export function ContactInfoTable({ data }: IContactInfoTableProps) {
  const rows = (
    <Table.Tr key={data.registrantName}>
      <Table.Td>{data.registrantName}</Table.Td>
      <Table.Td>{data.technicalContactName}</Table.Td>
      <Table.Td>{data.administrativeContactName}</Table.Td>
      <Table.Td>{data.contactEmail}</Table.Td>
    </Table.Tr>
  );

  return (
    <ScrollArea>
      <Table striped highlightOnHover withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Registrant Name</Table.Th>
            <Table.Th>Technical Contact Name</Table.Th>
            <Table.Th>Administrative Contact Name</Table.Th>
            <Table.Th>Contact Email</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
}