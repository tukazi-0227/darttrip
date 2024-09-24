'use client';  // これを最初に追加

import { SearchIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, HStack, IconButton, Select, Spacer, Text, VStack } from '@chakra-ui/react';
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [region, setRegion] = useState("");
  const [category, setCategory] = useState("");
  const [searchResult, setSearchResult] = useState<any[]>([]);

  const handleSearch = () => {
    const query = `${region}\u3000${category}`;  // 全角スペースを使用
    fetch(`http://localhost:8080/api/searchLocal?query=${encodeURIComponent(query)}`)
      .then((response) => {
        console.log(`Status: ${response.status}`);  // ステータスコードを表示
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data && Array.isArray(data.Feature)) {
          setSearchResult(data.Feature);
        } else {
          setSearchResult([]);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleSort = (sortValue: string) => {
    const query = `${region}\u3000${category}`;  // 現在の地域とカテゴリを使って再検索
    const sortQuery = sortValue ? `&sort=${sortValue}` : "";  // ソートパラメータをクエリに追加

    fetch(`http://localhost:8080/api/searchLocal?query=${encodeURIComponent(query)}${sortQuery}`)
      .then((response) => {
        console.log(`Status: ${response.status}`);  // ステータスコードを表示
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data && Array.isArray(data.Feature)) {
          setSearchResult(data.Feature);
        } else {
          setSearchResult([]);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  return (
    <VStack mt={32} mb={20}>
      <Flex width="80%">
        <VStack>
          <Box
            width="300px"
            alignItems="flex-start"
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
              top="100%"
              left="50%"
              transform="translate(-50%, -50%)"
              bg={"rgb(0,150,0)"}
              color="white"
              size="lg"
              fontSize="20px"
              px={8}
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
          alignItems="flex-end"
          h="400px"
          w="50%"
          overflowY="auto"
          p={4}
          borderWidth="1px"
          borderRadius="md"
          shadow="md"
        >

          <Text flex="1" textAlign="center" fontSize="2xl" fontWeight="bold" mb={3}>
            旅のすすめ
          </Text>
          <HStack>
            {/* 地域選択のプルダウン */}
            <Select placeholder="地域" onChange={(e) => setRegion(e.target.value)} mb={3}>
              <option value="北海道">北海道</option>
              <option value="東北">東北</option>
              <option value="関東">関東</option>
              <option value="中部">中部</option>
              <option value="近畿">近畿</option>
              <option value="中国">中国</option>
              <option value="四国">四国</option>
              <option value="九州">九州</option>
              <option value="沖縄">沖縄</option>
            </Select>

            {/* カテゴリ選択のプルダウン */}
            <Select placeholder="カテゴリ" onChange={(e) => setCategory(e.target.value)} mb={3}>
              <option value="グルメ">グルメ</option>
              <option value="レストラン">レストラン</option>
              <option value="観光">観光スポット</option>
              <option value="ホテル">ホテル</option>
            </Select>

            {/* ソート選択のプルダウン */}
            <Select
              placeholder="並び順"
              width="80%"
              bg="gray.400"
              onChange={(e) => handleSort(e.target.value)}
              mb={3}
            >
              <option value="rating">高評価</option>
              <option value="hybrid">人気順</option>
              <option value="review">レビュー数</option>
              <option value="price">金額</option>
            </Select>


            <IconButton
              aria-label="Search api"
              icon={<SearchIcon />}
              size="lg"
              onClick={handleSearch}  // 検索ボタンがクリックされたときにAPI呼び出し
            />
          </HStack>
          {Array.isArray(searchResult) && searchResult.length > 0 ? (
            searchResult.map((item: any, index: number) => (
              <Flex key={index} p={3} borderWidth="1px" borderRadius="md" w="100%" justifyContent="space-between" alignItems="center">
                {/* 左側のテキスト情報 */}
                <Box>
                  {/* 店名 */}
                  <Text fontSize="lg" fontWeight="bold">
                    {item?.Name || "名称不明"}
                  </Text>
                  {/* カテゴリ */}
                  <Text>
                    カテゴリ: {item?.Category?.join(", ") || "カテゴリ不明"}
                  </Text>
                  {/* ジャンル */}
                  <Text>
                    ジャンル: {item?.Property?.Genre?.map((genre: any) => genre.Name).join(", ") || "ジャンル不明"}
                  </Text>
                  {/* 住所 */}
                  <Text>
                    住所: {item?.Property?.Address || "住所不明"}
                  </Text>
                  {/* 最寄り駅と距離 */}
                  {item?.Station?.[0] && (
                    <Text>
                      最寄り駅: {item.Station[0]?.Name} (距離: {item.Station[0]?.Distance ? `${item.Station[0].Distance}m` : "距離不明"})
                    </Text>
                  )}
                  {/* 電話番号 */}
                  <Text>
                    Tel: {item?.Property?.Tel1 || "電話番号なし"}
                  </Text>
                  {/* Googleマップリンク */}
                  <a href={`https://www.google.com/maps?q=${item?.Geometry?.Coordinates}`} target="_blank" rel="noopener noreferrer">
                    Googleマップで見る
                  </a>
                </Box>
                {/* 右側にLeadImageを表示
                {item?.Property?.LeadImage && (
                  <Box ml={4}>
                    <Image
                      src={item.Property.LeadImage}
                      alt={item.Name || "画像"}
                      width={150}  // 画像の幅を指定
                      height={100} // 画像の高さを指定
                      objectFit="cover"
                    />
                  </Box>
                )} */}
              </Flex>
            ))
          ) : (
            <Text fontSize="lg" color="gray.500">No data found.</Text>
          )}
        </Box>
      </Flex>
    </VStack>
  );
}
