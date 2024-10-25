'use client';

import { InfoIcon } from '@chakra-ui/icons';
import { Box, Button, Checkbox, CheckboxGroup, Flex, HStack, Icon, Spacer, Stack, Text, VStack } from '@chakra-ui/react';
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [selectedPrefecture, setSelectedPrefecture] = useState('');

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
  const handleCheckboxChange = (selectedItems: string[]) => {
    if (selectedItems.includes('zenkoku')) {

      // 「全国」が選択された場合、すべての地方を選択
      setCheckedItems(allRegions);
    } else {
      
      // 「全国」が選択されていない場合
      const isAllSelected = individualRegions.every(region => selectedItems.includes(region));
      if (isAllSelected) {
        setCheckedItems(['zenkoku', ...individualRegions]);
      } else {
        setCheckedItems(selectedItems.filter(item => item !== 'zenkoku'));
      }
    }
  };

  {/* リセットボタンのハンドラ */ }
  const handleReset = () => {
    setCheckedItems([]);
  };

  {/* 出発ボタンのハンドラ */ }
  const handleSubmit = async () => {
    const regionData = {
      zenkoku: checkedItems.includes('zenkoku'),
      hokkaido: checkedItems.includes('hokkaido'),
      tohoku: checkedItems.includes('tohoku'),
      kanto: checkedItems.includes('kanto'),
      tyubu: checkedItems.includes('tyubu'),
      kinki: checkedItems.includes('kinki'),
      tyugoku: checkedItems.includes('tyugoku'),
      shikoku: checkedItems.includes('shikoku'),
      kyusyu: checkedItems.includes('kyusyu'),
      okinawa: checkedItems.includes('okinawa')
    };

    console.log("Sending data: ", regionData); // 送信データの確認

    try {
      const response = await fetch("http://localhost:8080/api/regions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(regionData),
        credentials: 'include'
      });

      if (response.ok) {
        const getResponse = await fetch("http://localhost:8080/api/getDartResult", {
          credentials: 'include'
        });

        if (getResponse.ok) {
          const randomPrefecture = await getResponse.text();
          console.log("Random prefecture: ", randomPrefecture); // 受け取ったデータの確認
          setSelectedPrefecture(randomPrefecture);
        } else {
          console.log("GETリクエスト失敗");
        }
      } else {
        console.log("送信失敗");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <VStack mt={32} mb={20}>
      <Flex width="80%">
        <VStack>
          <Box
            width="400px"
            alignItems="flex-start"
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
            onClick={handleSubmit}
            disabled={checkedItems.length === 0} // チェックがないと無効化
          >
            出発する
          </Button>
          <Box mt={10}>
            <Text fontSize='5xl'>{selectedPrefecture ? `${selectedPrefecture}` : ''}</Text>
          </Box>
        </VStack>
      </Flex>
    </VStack>
  );
}
