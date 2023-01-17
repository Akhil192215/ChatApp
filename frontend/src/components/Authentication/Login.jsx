import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack,  useToast, } from '@chakra-ui/react';
import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const Login = () => {
  const toast = useToast();
  const naviagate = useNavigate()
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading,setLoading] = useState()
  const handleCick =()=> setShow(!show)

  const submitHandler =async()=>{
    if(!email||!password){
      toast({
        title: "Please fill out all the fields.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return    setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
    
    try {
      const config = {
        headers: {
          " Content-type": "application/json",
        },
      };

      const { data } = await axios.post("/api/user/login",{email,password},config );

      toast({
        title: "Login successfull",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      naviagate('/chats')
    } catch (error) {
      
      toast({
        title: "Error occured!",
        description:error.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  
  }
  return (
    <VStack spacing="5px">
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
            type={show ? "text":"password"}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement  width='4.5rem'>
          <Button h='1.75rem' size='sm' onClick={handleCick}>
            {show? 'Hide' : 'Show'}
          </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button 
      colorScheme='blue'
      isLoading={loading}
      width='100%'
      style={{marginTop:15}}
      onClick={submitHandler}
      >
      Login
      </Button>
      <Button
      variant='solid'
      colorScheme='orange'
      width='100%'
      onClick={()=>{
        setEmail("guest@exaple.com")
        setPassword('123456')
      }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  )
}

export default Login