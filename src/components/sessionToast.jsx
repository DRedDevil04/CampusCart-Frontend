import { createStandaloneToast } from "@chakra-ui/react";

const { toast } = createStandaloneToast();

export const showToast = () => {
  toast({
    title: "Session Timeout",
    description: "Your session has expired. Please log in again.",
    status: "error",
    duration: 4000,
    isClosable: true,
  });
};
