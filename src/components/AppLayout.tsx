import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  HStack,
  Stack,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import { ReactNode, VFC } from "react";
import { SettingsModal } from "./SettingsModal";
import { auth } from "../firebaseApp";
import logoUrl from "../assets/logo.png";

import { useSignInWithGoogle, useAuthState } from "react-firebase-hooks/auth";

type AppLayoutProps = {
  children: ReactNode;
};

export const AppLayout: VFC<AppLayoutProps> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user] = useAuthState(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  return (
    <Stack h="100vh">
      <Box h="16" borderBottomWidth="1px" boxShadow="sm">
        <Container w="container.lg" maxW="container.lg" h="full">
          <Flex h="full" justifyContent="space-between" alignItems="center">
            <Image src={logoUrl} h="12" />

            {user ? (
              <Button
                onClick={onOpen}
                colorScheme="primary"
                borderRadius="0"
                border="2px"
                borderColor="gray.400"
              >
                時を操る
              </Button>
            ) : (
              <HStack>
                <Button
                  onClick={onOpen}
                  colorScheme="primary"
                  borderRadius="0"
                  border="2px"
                  borderColor="gray.400"
                >
                  時を操る
                </Button>
                <Button
                  onClick={() => signInWithGoogle()}
                  colorScheme="primary"
                  borderRadius="0"
                  border="2px"
                  borderColor="gray.400"
                >
                  予定を取り込む
                </Button>
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
