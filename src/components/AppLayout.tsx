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
import { ReactNode, useEffect, useState, VFC, useMemo } from "react";
import { SettingsModal } from "./SettingsModal";
import { auth } from "../firebaseApp";
import { useSignInWithGoogle, useAuthState } from "react-firebase-hooks/auth";
import { startOfToday, endOfToday, format, addHours } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";
import { chrono } from "../utils/chrono";
import { useSettings } from "../context/settings";

type AppLayoutProps = {
  children: ReactNode;
};

export const AppLayout: VFC<AppLayoutProps> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user] = useAuthState(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  const [calendarEvents, setCalendarEvents] = useState<{ summary: string; startTime: Date }[]>([]);

  const getEvents = () => {
    window.gapi.auth2
      .getAuthInstance()
      .signIn()
      .then(() => {
        loadEvents();
      });
  };
  const loadEvents = () => {
    window.gapi.load("client", () => {
      window.gapi.client.setApiKey(import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY);
      window.gapi.client.load("calendar", "v3", () => {
        window.gapi.client.calendar.events
          .list({
            calendarId: "primary",
            maxResults: 20,
            singleEvents: true,
            orderBy: "startTime",
            timeMin: zonedTimeToUtc(startOfToday(), "Asia/Tokyo").toISOString(),
            timeMax: zonedTimeToUtc(endOfToday(), "Asia/Tokyo").toISOString(),
          })
          .then((res) => {
            setCalendarEvents(
              res.result.items.map((e) => ({
                summary: e.summary,
                startTime: new Date(e.start.dateTime),
              }))
            );
          })
          .catch((e) => console.log(e));
      });
    });
  };
  const initEvent = () => {
    window.gapi.client.init({
      clientId: import.meta.env.VITE_GOOGLE_CALENDAR_CLIENT_ID,
      apiKey: import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY,
      scope: "https://www.googleapis.com/auth/calendar.events",
      discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
    });
  };
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/client.js";
    document.body.appendChild(script);
    window.setTimeout(() => initEvent(), 500);
  }, []);
  const { settings } = useSettings();
  const startDate = useMemo(
    () => addHours(startOfToday(), Number(settings.startAtHour)),
    [settings.startAtHour]
  );
  const endDate = useMemo(
    () => addHours(startOfToday(), Number(settings.endAtHour)),
    [settings.endAtHour]
  );
  const hoursToGenerate = useMemo(
    () => Number(settings.hoursToGenerate),
    [settings.hoursToGenerate]
  );

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
              <HStack>
                <Button onClick={onOpen} colorScheme="primary">
                  時を操る
                </Button>
                <Button onClick={() => getEvents()} colorScheme="primary">
                  予定を取り込む
                </Button>
              </HStack>
            ) : (
              <HStack>
                <Button onClick={onOpen} colorScheme="primary">
                  時を操る
                </Button>
                <Button onClick={() => getEvents()} colorScheme="primary">
                  予定を取り込む
                </Button>
              </HStack>
            )}
          </Flex>
        </Container>
      </Box>
      <Center>{children}</Center>
      <Center>
        <Stack>
          {calendarEvents.map((item) => {
            return (
              <div>
                {item.summary}:
                {format(
                  chrono(item.startTime, {
                    startDate,
                    endDate,
                    hoursToGenerate,
                  }),
                  "yyyy/MM/dd HH:mm"
                )}
              </div>
            );
          })}
        </Stack>
      </Center>
      <SettingsModal isOpen={isOpen} onClose={onClose} />
    </Stack>
  );
};
