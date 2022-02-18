import { Box, Button, Center, Container, Flex, Heading, HStack, Stack, useDisclosure } from "@chakra-ui/react";
import { FC, useState } from "react";
import { SettingsModal } from "./SettingsModal";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";

import { useSignInWithGoogle, useAuthState } from "react-firebase-hooks/auth";

export const AppLayout: FC = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user] = useAuthState(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  return (
    <Stack>
      <Box h="16" borderBottomWidth="1px" boxShadow="sm">
        <Container w="container.lg" maxW="container.lg" h="full">
          <Flex h="full" justifyContent="space-between" alignItems="center">
            <Heading>Chrono Trigger</Heading>
            {user ? (
              <HStack>
                <Button onClick={onOpen}>Settings</Button>
                <div>{user.email}</div>{" "}
                <Button
                  onClick={async () => {
                    await signOut(auth);
                  }}
                >
                  Logout
                </Button>
              </HStack>
            ) : (
              <HStack>
                <Button onClick={onOpen}>Settings</Button>
                <Button onClick={() => signInWithGoogle()}>Login</Button>
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
