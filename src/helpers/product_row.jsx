import React from "react";
import { Tr, Td, Text, Badge, Button, useColorModeValue } from "@chakra-ui/react";

const TableRow = ({ productId, productName, category, status, date, isLast, onEditClick }) => {
    const textColor = useColorModeValue("gray.500", "white");
    const titleColor = useColorModeValue("gray.700", "white");
    const bgStatusSold = useColorModeValue("gray.200", "gray.700");
    const bgStatusNotSold = useColorModeValue("green.400", "green.400");
    const borderColor = useColorModeValue("gray.200", "gray.600");

    return (
        <Tr>
            {/* Product Name */}
            <Td
                width={{ base: "60px", sm: "100px" }}
                pl="0px"
                borderColor={borderColor}
                borderBottom={isLast ? "none" : null}
            >
                <Text
                    fontSize={{ base: "sm", sm: "md" }}
                    color={titleColor}
                    fontWeight="bold"
                    minWidth="100%"
                >
                    {productName}
                </Text>
            </Td>

            {/* Product Category */}
            <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
                <Text
                    fontSize={{ base: "sm", sm: "md" }}
                    color={textColor}
                    fontWeight="bold"
                >
                    {category}
                </Text>
            </Td>

            {/* Product Status */}
            <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
                <Badge
                     bg={status === true ? bgStatusNotSold : bgStatusSold}
                    color={status===true ? "white" : "black" }
                    fontSize={{ base: "xs", sm: "md" }}
                    p="3px 10px"
                    borderRadius="8px"
                >
                    {status ? "Not Sold" : "Sold"}
                </Badge>
            </Td>

            {/* Product Date */}
            <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
                <Text
                    fontSize={{ base: "sm", sm: "md" }}
                    color={textColor}
                    fontWeight="bold"
                    pb=".5rem"
                >
                    {date.toLocaleDateString()}
                </Text>
            </Td>

            {/* Edit Button */}
            <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
                <Button
                    p="0px"
                    bg="transparent"
                    variant="no-effects"
                    onClick={() => onEditClick(productId)}
                >
                    <Text
                        fontSize={{ base: "sm", sm: "md" }}
                        color="gray.400"
                        fontWeight="bold"
                        cursor="pointer"
                    >
                        Edit
                    </Text>
                </Button>
            </Td>
        </Tr>
    );
};

export default TableRow;
