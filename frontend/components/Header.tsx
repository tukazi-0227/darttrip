"use client";
import {
  Box,
  Container,
  Flex,
  HStack,
  Link,
  Text,
  Image,
} from "@chakra-ui/react";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  return (
    <Box
      py={4}
      bgColor="rgb(0,160,0)"
      position="fixed"
      top={0}
      left={0}
      right={0}
      width="100vw"
      zIndex="999"
    >
      <Container maxW="100vw">
        <Flex justify="space-between" align="center">
          {/* ロゴ */}
          <HStack spacing={4}>
            {pathname !== "/login" && (
              <Link
                href="/home"
                color="white"
                mx={4}
                fontWeight="bold"
                fontSize={20}
              >
                Home
              </Link>
            )}
          </HStack>
          {/* ナビゲーションメニュー */}
          <Flex>
            {pathname !== "/" && (
              <Link
                href="/"
                color="white"
                mx={4}
                fontWeight="bold"
                fontSize={14}
              >
                Logout
              </Link>
            )}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};
export default Header;
