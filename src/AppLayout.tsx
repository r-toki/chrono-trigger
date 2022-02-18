import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  HStack,
  Stack,
} from "@chakra-ui/react";
import { FC, useState } from "react";

export const AppLayout: FC = ({ children }) => {
  const [uid, setUid] = useState("");

  return (
    <Stack>
      <Box h="16" borderBottomWidth="1px" boxShadow="sm">
        <Container w="container.lg" maxW="container.lg" h="full">
          <Flex h="full" justifyContent="space-between" alignItems="center">
            <Heading>Chrono Trigger</Heading>
            {uid ? (
              <HStack>
                <Button>Settings</Button>
                <Button onClick={() => setUid("")}>Logout</Button>
              </HStack>
            ) : (
              <HStack>
                <Button>Settings</Button>
                <Button onClick={() => setUid("1")}>Login</Button>
              </HStack>
            )}
          </Flex>
        </Container>
      </Box>
      <Center>{children}</Center>
    </Stack>
  );
};
