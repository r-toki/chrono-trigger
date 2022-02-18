import { Box, Button, Center, Container, Flex, Heading, HStack, Stack, useDisclosure } from "@chakra-ui/react";
import { FC, useState } from "react";
import { SettingsModal } from "./SettingsModal";

export const AppLayout: FC = ({ children }) => {
  const [uid, setUid] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Stack>
      <Box h="16" borderBottomWidth="1px" boxShadow="sm">
        <Container w="container.lg" maxW="container.lg" h="full">
          <Flex h="full" justifyContent="space-between" alignItems="center">
            <Heading>Chrono Trigger</Heading>
            {uid ? (
              <HStack>
                <Button onClick={onOpen}>Settings</Button>
                <Button onClick={() => setUid("")}>Logout</Button>
              </HStack>
            ) : (
              <HStack>
                <Button onClick={onOpen}>Settings</Button>
                <Button onClick={() => setUid("1")}>Login</Button>
              </HStack>
            )}
          </Flex>
        </Container>
      </Box>
      <Center>{children}</Center>
      <SettingsModal isOpen={isOpen} onClose={onClose} />
    </Stack>
  );
};
