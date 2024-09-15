'use client';  // これを最初に追加

import { Box, Button, Flex, IconButton, Input, Spacer, Text, VStack, InputGroup, InputRightElement } from '@chakra-ui/react';
import { SearchIcon } from "@chakra-ui/icons";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");

  // サーバーからメッセージを取得
  useEffect(() => {
    fetch("http://localhost:8080/hello?name=YourName")
      .then((response) => response.text())
      .then((data) => setMessage(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <VStack mt={32} mb={20}>
      <Flex width="80%">
        <VStack>
          <Box
            width="300px"
            align="flex-start"
          >
            <Image
              src="/images/darts.png"
              alt="Darts Image"
              width={300}
              height={300}
            />
          </Box>
          <Box width="300px">
            <Button
              as="a"
              href='/darts'
              top="100%"             // 上から50%の位置に配置
              left="50%"            // 左から50%の位置に配置
              transform="translate(-50%, -50%)"  // 中央に揃えるための変換
              bg={"rgb(0,150,0)"}
              color="white"
              size="lg"
              fontSize="20px"
              px={8}           // 左右のパディングを大きくする
              py={6}
              style={{ borderRadius: "12px" }}
            >
              旅に出る
            </Button>
          </Box>
        </VStack>
        <Spacer />
        {/* スクロール可能なボックス */}
        <Box
          align="flex-end"
          h="400px" // 固定高さ
          w="50%" // 幅を広げる
          overflowY="auto" // 縦方向にスクロールを許可
          p={4}
          borderWidth="1px"
          borderRadius="md"
          shadow="md"
        >
          <Text flex="1" textAlign="center" fontSize="2xl" fontWeight="bold" mb={3}>
            旅のすすめ
          </Text>
          <InputGroup mb={3}>
            <Input
              placeholder="Search"
            />
            <InputRightElement>
              <IconButton
                aria-label="Search api"
                icon={<SearchIcon />}
                size="sm"
              />
            </InputRightElement>
          </InputGroup>
          {0 === 0 ? (
            <Text fontSize="lg" color="gray.500">
              No data found.
            </Text>
          ) : (
            <VStack spacing={4} align="start">
            </VStack>
          )}
        </Box>
      </Flex>
    </VStack>
  );
}
