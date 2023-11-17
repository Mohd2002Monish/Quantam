import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  Text,
  Center,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import { login } from "../Redux/user/Actions";
export default function LoginCompo() {
  const [showPassword, setShowPassword] = useState(false);
  const { loading, error, auth, message } = useSelector((store) => {
    return store.auth;
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Info, setInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setInfo({
      ...Info,
      [event.target.name]: event.target.value,
    });
  };

  const submit = async (data) => {
    await dispatch(login(data));

    if (!loading) {
      navigate("/");
    }
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack w={"500px"} spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                name="email"
                onChange={handleChange}
                placeholder="Email"
                type="email"
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  name="pass"
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            {false ? (
              <Center>
                <Text color={"red"}>{""}</Text>
              </Center>
            ) : null}
            <Stack spacing={10}>
              <Button
                isLoading={loading}
                onClick={() => submit(Info)}
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Sign in
              </Button>
            </Stack>
            <Text color={"red"}> {!!message ? message : ""}</Text>
            <Box display={"flex"} gap={"6px"}>
              <Text>Don't Have Account </Text>
              <Link to="/signup">
                <Text color={"blue.400"}>
                  {" "}
                  <b>Create One</b>
                </Text>
              </Link>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
