import React from "react";
import {
  Box,
  Flex,
  Text,
  Avatar,
  Heading,
  IconButton,
  useMediaQuery,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  Tooltip,
  Badge,
} from "@chakra-ui/react";
import LogoutModal from "./logout";
import { useNavigate, useLocation } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { IoMdCart, IoIosLogIn, IoMdPersonAdd } from "react-icons/io";
import { selectUser } from "../slices/authSlice";
import { useSelector } from "react-redux";
import { selectCarts } from "../slices/cartSlice";

const Header = ({ onOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen, onOpen: onOpenModal, onClose } = useDisclosure();
  const userInfo = useSelector(selectUser);
  const cartItems = useSelector(selectCarts);
  const isShopPage =
    location.pathname === "/" ||
    location.pathname === "/cart" ||
    location.pathname.startsWith("/category/") ||
    location.pathname.startsWith("/product/");

  const totalItemsInCart = userInfo
    ? cartItems[userInfo.email]?.reduce(
        (acc, item) => acc + item.quantity,
        0
      ) || 0
    : 0;

  const [isLargerThan500] = useMediaQuery("(max-width: 500px)");

  return (
    <Box
      minW="320px"
      w="100%"
      className="Header"
      bg={"#3f72af"}
      p={4}
      position={"relative"}
    >
      <Flex align="center" display={"flex"} justifyContent="space-between">
        <IconButton
          colorScheme="whiteAlpha"
          aria-label="Open Sidebar"
          icon={<IoMenu size={30} />}
          onClick={onOpen}
        />
        <Heading
          as="h1"
          size={["md", "lg", "xl", "2xl"]}
          fontFamily={"'Pacifico', cursive"}
          fontWeight={"400"}
          color="white"
          whiteSpace="nowrap"
          flexShrink={0}
          position={"absolute"}
          left={"0"}
          right={"0"}
          marginLeft={"auto"}
          marginRight={"auto"}
          marginBottom={"10px"}
          width={"max-content"}
          onClick={() => {
            navigate("/shop");
            onClose();
          }}
        >
          TakeitEasy
        </Heading>

        <Flex alignItems="center" gap="1rem">
          {isShopPage && userInfo && (
            <Tooltip label="Go to Cart">
              <Box position="relative">
                <IconButton
                  colorScheme="whiteAlpha"
                  aria-label="Open Cart"
                  icon={<IoMdCart size={35} />}
                  onClick={() => navigate("/cart")}
                />
                {totalItemsInCart > 0 && (
                  <Badge
                    position="absolute"
                    top="0"
                    right="0"
                    transform="translate(25%, -25%)"
                    colorScheme="red"
                    borderRadius="full"
                    px={2}
                  >
                    {totalItemsInCart}
                  </Badge>
                )}
              </Box>
            </Tooltip>
          )}
          {!userInfo ? (
            <Flex gap="1rem">
              <Tooltip label="Login">
                <IconButton
                  colorScheme="whiteAlpha"
                  aria-label="Open Login"
                  icon={<IoIosLogIn size={35} />}
                  onClick={() => navigate("/login")}
                />
              </Tooltip>
              <Tooltip label="Sign Up">
                <IconButton
                  colorScheme="whiteAlpha"
                  aria-label="Open SignUp"
                  icon={<IoMdPersonAdd size={35} />}
                  onClick={() => navigate("/register")}
                />
              </Tooltip>
            </Flex>
          ) : !isLargerThan500 ? (
            <Flex
              alignItems="center"
              flexDirection={{ base: "column-reverse", lg: "row" }}
              gap="2"
              whiteSpace={"nowrap"}
            >
              <Text
                fontSize={["sm", "md", "xl", "2xl"]}
                color={"#f9f7f7"}
                fontWeight="500"
              >
                {userInfo.name.substring(0, 5)}..
              </Text>
              <Menu>
                <MenuButton
                  as={Avatar}
                  cursor={"pointer"}
                  name="Admin"
                  src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                  size="md"
                />
                <MenuList>
                  <MenuItem onClick={() => navigate("/profile")}>
                    View profile
                  </MenuItem>
                  <MenuDivider />
                  <LogoutModal />
                </MenuList>
              </Menu>
            </Flex>
          ) : (
            <Flex></Flex>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
