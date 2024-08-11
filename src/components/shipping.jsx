import React, { useState } from "react";
import {
  Card,
  Box,
  Input,
  CardHeader,
  CardBody,
  FormLabel,
  FormControl,
} from "@chakra-ui/react";
import { useUpdateProfileMutation } from "../slices/userApiSlice";
const Shipping = ({ address, setAddress }) => {
  const [updateProfile] = useUpdateProfileMutation();

  return (
    <Card m="2rem">
      <CardHeader as="b" fontSize="24px" pb="0">
        Ship to:
      </CardHeader>
      <CardBody>
        <FormControl>
          {["room", "floor", "hostel", "contact_number"].map((field) => (
            <Box key={field} mb="1rem">
              <FormLabel mb="0">{field.toUpperCase()}</FormLabel>
              <Input
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={address[field]}
                onChange={(e) =>
                  setAddress({ ...address, [field]: e.target.value })
                }
                borderColor={"teal"}
                style={{ cursor: "auto" }}
              />
            </Box>
          ))}
        </FormControl>
      </CardBody>
    </Card>
  );
};

export default Shipping;
