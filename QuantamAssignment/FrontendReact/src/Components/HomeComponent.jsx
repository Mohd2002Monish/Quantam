import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Heading,
} from "@chakra-ui/react";

function HomeComponent() {
  const [data, setData] = useState([]);
  function fetchData() {
    return axios
      .get("https://quantam.onrender.com/users")
      .then((response) => {
        console.log(response);
        console.log("Data:", response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
        throw error;
      });
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <center>
        <Heading>Users</Heading>
      </center>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Age</Th>
            <Th>Email</Th>
            <Th>Id</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, index) => (
            <Tr key={index}>
              {
                <>
                  <Th>{row.name}</Th>
                  <Th>{row.age}</Th>
                  <Th>{row.email}</Th>
                  <Th>{row.name}</Th>
                </>
              }
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
}

export default HomeComponent;
