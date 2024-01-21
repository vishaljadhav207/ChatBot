import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import Header from "../components/Header";
import Divider from "../components/Divider";
import Messages from "../components/Messages";
import Footer from "../components/Footer";

const Chat = () => {
  const [messages, setMessages] = useState([
    { from: "computer", text: "Hi, My Name is Gauri" },
    { from: "me", text: "Hey there" },
    { from: "me", text: "Myself Shahrukh Khan" },
    {
      from: "computer",
      text: "Nice to meet you.I'll reply to your Chat message.",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = async () => {
    if (!inputMessage.trim().length) {
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: inputMessage }),
      });

      if (response.ok) {
        const responseData = await response.json();

        // Extract the result from the response data
        const resultText = responseData.result;

        // Update the state with user's message and computer's reply
        setMessages((old) => [
          ...old,
          { from: "me", text: inputMessage },
          { from: "computer", text: resultText },
        ]);

        // Clear the input message
        setInputMessage("");
      } else {
        console.error("Error in API request:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Flex w="100%" h="100vh" justify="center" align="center">
      <Flex w={["100%", "100%", "40%"]} h="90%" flexDir="column">
        <Header />
        <Divider />
        <Messages messages={messages} />
        <Divider />
        <Footer
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          handleSendMessage={handleSendMessage}
        />
      </Flex>
    </Flex>
  );
};

export default Chat;
