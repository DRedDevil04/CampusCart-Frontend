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
} from "@chakra-ui/react";
import LogoutModal from "./logout";
import { useNavigate, useLocation } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { selectUser } from "../slices/authSlice";
import { useSelector } from "react-redux";
import { TiShoppingCart } from "react-icons/ti";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa"; // Import icons for Login and Register

const Header = ({ onOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isNonMobile] = useMediaQuery("(min-width: 420px)");
  const { isOpen, onOpen: onOpenModal, onClose } = useDisclosure();
  const userInfo = useSelector(selectUser);
  const isAdmin = userInfo?.role === "admin";
  const isShopPage = location.pathname === "/";

  return (
    <Box minW="320px" w="100%" className="Header" bg={"#3f72af"} p={4}>
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
          color="white"
          whiteSpace="nowrap"
          flexShrink={0}
          position={"relative"}
          right={0}
          left={0}
          onClick={() => {
            navigate("/");
            onClose();
          }}
        >
          CampusCart
        </Heading>

        <Flex alignItems="center" gap="1rem">
          {isShopPage && userInfo && (
            <IconButton
              bg="none"
              _hover={{ bg: "#3f72af", transform: "scale(1.1)" }}
              onClick={() => navigate("/cart")}
            >
              <TiShoppingCart size="md" color="white" />
            </IconButton>
          )}
          {!userInfo ? (
            <Flex gap="1rem">
              <IconButton
              bg="none"
              _hover={{ bg: "#3f72af", transform: "scale(1.1)" }}
              onClick={() => navigate("/register")}
            >
              <FaUserPlus size="md" color="white" />
            </IconButton>
              <IconButton
              bg="none"
              _hover={{ bg: "#3f72af", transform: "scale(1.1)" }}
              onClick={() => navigate("/login")}
            >
              <FaSignInAlt size="md" color="white" />
            </IconButton>
              
            </Flex>
          ) : (
            <Flex
              alignItems="center"
              flexDirection={{ base: "column-reverse", lg: "row" }}
              gap="2"
              whiteSpace={"nowrap"}
              //pr={{base:"1rem"}}
              // position={"absolute"}
              // right={0}
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
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
