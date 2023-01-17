import "./App.css";
import { Button } from "@chakra-ui/react";
import {  Route, Routes } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import Chats from "./pages/Chats";


function App() {
  return (
    <div className="App">
        <Routes>
          <Route  path="/" exact element={<Home/>} />
          <Route path="/chats" element={<Chats/>} />
        </Routes>
 
    </div>
  );
}

export default App;
