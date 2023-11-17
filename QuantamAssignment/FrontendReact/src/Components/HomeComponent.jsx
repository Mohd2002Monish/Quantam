import React from "react";
import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  chakra,
} from "@chakra-ui/react";

function HomeComponent({ data }) {
  return (
    <Table variant="simple">
      <TableCaption>Users</TableCaption>
      <Thead>
        <Tr>
          {Object.keys(data[0]).map((key) => (
            <Th key={key}>{key}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {data.map((row, index) => (
          <Tr key={index}>
            {Object.values(row).map((value, index) => (
              <Td key={index}>{value}</Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default HomeComponent;
