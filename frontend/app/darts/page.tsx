'use client';  // これを最初に追加

import { InfoIcon } from '@chakra-ui/icons';
import { Box, Checkbox, CheckboxGroup, Flex, HStack, Icon, Spacer, Stack, VStack, Button, useToast, Text } from '@chakra-ui/react';
import Image from "next/image";
import { useEffect, useState} from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const toast = useToast();

  const allRegions = [
    'zenkoku',
    'hokkaido',
    'tohoku',
    'kanto',
    'tyubu',
    'kinki',
    'tyugoku',
    'shikoku',
    'kyusyu',
    'okinawa'
  ];
  const individualRegions = allRegions.filter(region => region !== 'zenkoku');

  {/* チェックボックスの制御 */ }
  {/* チェックボックスの制御 */ }
  const handleCheckboxChange = (selectedItems: string[]) => {
    if (selectedItems.includes('zenkoku')) {
      // 「全国」が選択された場合、すべての地方を選択
      setCheckedItems(allRegions);
    } else {
      // 「全国」が選択されていない場合
      // すべての地方が選択されているかチェック
      const isAllSelected = individualRegions.every(region => selectedItems.includes(region));
      if (isAllSelected) {
        // すべての地方が選択されている場合、「全国」も選択
        setCheckedItems(['zenkoku', ...individualRegions]);
      } else {
        // 任意の地方が選択解除された場合、「全国」を選択解除
        setCheckedItems(selectedItems.filter(item => item !== 'zenkoku'));
      }
    }
  };


  {/* リセットボタンのハンドラ */ }
  const handleReset = () => {
    setCheckedItems([]);
  };

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
            width="400px"
            align="flex-start"
          >
            <Image
              src="/images/map-japan.png"
              alt="Darts Image"
              width={1000}
              height={1000}
            />
          </Box>
        </VStack>
        <Spacer />
        <VStack>
        <CheckboxGroup colorScheme="green" value={checkedItems} onChange={handleCheckboxChange}>
          <Stack spacing={5} mb={50} direction="column">
            <HStack>
              <Icon as={InfoIcon} color="black.500" />
              <Checkbox value="zenkoku">全国　</Checkbox>
              <Button colorScheme="green" px={4} py={1} fontSize="13px" onClick={handleReset}>
                リセット
              </Button>
            </HStack>
            <HStack>
              <Icon as={InfoIcon} color="purple.500" />
              <Checkbox value="hokkaido">北海道</Checkbox>
              <Icon as={InfoIcon} color="blue.500" />
              <Checkbox value="tohoku">東北　</Checkbox>
              <Icon as={InfoIcon} color="green.500" />
              <Checkbox value="kanto">関東　</Checkbox>
            </HStack>
            <HStack>
              <Icon as={InfoIcon} color="green.400" />
              <Checkbox value="tyubu">中部　</Checkbox>
              <Icon as={InfoIcon} color="yellow.500" />
              <Checkbox value="kinki">近畿　</Checkbox>
              <Icon as={InfoIcon} color="orange.500" />
              <Checkbox value="tyugoku">中国　</Checkbox>
            </HStack>
            <HStack>
              <Icon as={InfoIcon} color="pink.400" />
              <Checkbox value="shikoku">四国　</Checkbox>
              <Icon as={InfoIcon} color="red.500" />
              <Checkbox value="kyusyu">九州　</Checkbox>
              <Icon as={InfoIcon} color="red.400" />
              <Checkbox value="okinawa">沖縄　</Checkbox>
            </HStack>
          </Stack>
        </CheckboxGroup>
        <Button
          bg={"rgb(0,200,0)"}
          color="white"
          size="md"
          onClick={() => {
            toast({
              title: "楽しんでね！",
              status: "success",
              duration: 2000,
              isClosable: true,
            });
          }}
        >
          出発する
        </Button>
        <Box mt={10}>
          <Text fontSize='5xl'>埼玉県!!</Text>
        </Box>
        </VStack>
      </Flex>
    </VStack>
  );
}
