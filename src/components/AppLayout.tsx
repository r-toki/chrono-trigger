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
} from "@chakra-ui/react";
import { ReactNode, VFC } from "react";
import { SettingsModal } from "./SettingsModal";
import { auth } from "../firebaseApp";

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
            <Heading>
              <Box as="span" bgGradient="linear(to-r, yellow.700, yellow.800)" bgClip="text">
                CH
              </Box>
              <Box as="span" bgGradient="linear(to-r, red.700, red.900)" bgClip="text">
                RONO HACK
              </Box>
              <Box as="span" bgGradient="linear(to-r, red.900, black)" bgClip="text">
                ER
              </Box>
            </Heading>
            {user ? (
              <Button onClick={onOpen} colorScheme="primary">
                時を操る
              </Button>
            ) : (
              <HStack>
                <Button onClick={onOpen} colorScheme="primary">
                  時を操る
                </Button>
                <Button onClick={() => signInWithGoogle()} colorScheme="primary">
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
