import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const toast = useToast();
  const naviagate = useNavigate();
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState();
  const handleCick = () => setShow(!show);
  const postDetailes = (pics) => {};
  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Please fill out all the fields.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
    if (password !== confirmPassword) {
      toast({
        title: "Password do not match",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return setTimeout(() => {
        setLoading(false);
      }, 1000);
    }

    try {
      const config = {
        headers: {
          " Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user",
        { name, email, password },
        config
      );

      localStorage.setItem("userInfo", JSON.stringify(data));

      setTimeout(() => {
        setLoading(false);
      }, 1000);

      toast({
        title: "Resgistration successfull",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      naviagate("/chats");
    } catch (error) {
      toast({
        title: "Error occured!",
        description: error.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };
  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel> Name </FormLabel>
        <Input
          placeholder="Enter your email"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel> Email </FormLabel>
        <Input
          placeholder="Enter your name"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel> Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleCick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="confirmPassword" isRequired>
        <FormLabel> Confirm password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter your password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleCick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl>
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="/image/*"
          onChange={(e) => postDetailes(e.target.files[0])}
        />
      </FormControl>
      <Button
        isLoading={loading}
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
