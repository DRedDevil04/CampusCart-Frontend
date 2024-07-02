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
import LogoutModal from "./logout.jsx"; // Ensure correct import path and component name
import { useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";

const Header = ({ onOpen }) => {
  const navigate = useNavigate();
  const [isNonMobile] = useMediaQuery("(min-width: 420px)");
  const { isOpen, onOpen: onOpenModal, onClose } = useDisclosure();

  return (
    <Box minW="320px" w="100%" className="Header" bg={"#3f72af"} p={4}>
      <Flex
        align="center"
        display={"flex"}
        justifyContent="space-between"
        // position={"relative"}
      >
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
            navigate("/dashboard");
            onClose();
          }}
        >
          CampusCart
        </Heading>
        <Flex
          alignItems="center"
          flexDirection={isNonMobile ? "row" : "column-reverse"}
          gap="2"
          whiteSpace={"nowrap"}
          width={0}
          // position={"absolute"}
          // right={0}
          dir={"rtl"}
        >
          <Menu>
            <MenuButton
              as={Avatar}
              cursor={"pointer"}
              name="Admin"
              src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
              size="md"
            />
            <MenuList>
              <MenuItem>View profile</MenuItem>
              <MenuDivider />
              <LogoutModal />
            </MenuList>
          </Menu>
          <Text
            fontSize={["md", "lg", "xl", "2xl"]}
            color={"#f9f7f7"}
            fontWeight="500"
          >
            Hello, Admin
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
