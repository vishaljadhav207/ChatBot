import React, { useEffect, useRef } from "react";
import { Avatar, Flex, Text } from "@chakra-ui/react";

const Messages = ({ messages }) => {
  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };

  return (
    <Flex w="100%" h="80%" overflowY="scroll" flexDirection="column" p="3">
      {messages.map((item, index) => (
        <Flex key={index} w="100%" justify={item.from === "me" ? "flex-end" : "flex-start"}>
          {item.from === "computer" && (
            <Avatar
              name="Computer"
              src="https://cdn-icons-png.flaticon.com/128/5226/5226034.png"
              bg="blue.300"
            />
          )}
          <Flex
            bg={item.from === "me" ? "black" : "gray.100"}
            color={item.from === "me" ? "white" : "black"}
            minW="100px"
            maxW="350px"
            my="1"
            p="3"
            borderRadius="20px"
          >
            <Text>{item.text}</Text>
          </Flex>
        </Flex>
      ))}
      <AlwaysScrollToBottom />
    </Flex>
  );
};

export default Messages;
