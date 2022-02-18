import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import { FormEventHandler, useState, VFC } from "react";
import useLocalStorage from "react-use/lib/useLocalStorage";
import { useSettings } from "./context/settings";
import { useTextInput } from "./hooks/useTextInput";

type SettingsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const SettingsModal: VFC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { settings, setSetting } = useSettings();

  const [startAtHourInput] = useTextInput(settings.startAtHour);
  const [endAtHourInput] = useTextInput(settings.endAtHour);
  const [hoursToGenerateInput] = useTextInput(settings.hoursToGenerate);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setSetting({
      startAtHour: startAtHourInput.value,
      endAtHour: endAtHourInput.value,
      hoursToGenerate: hoursToGenerateInput.value,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent pb="2">
        <ModalHeader>設定</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={onSubmit}>
            <Stack spacing="4">
              <Stack>
                <FormControl>
                  <FormLabel>始業時間</FormLabel>
                  <Input {...startAtHourInput} />
                </FormControl>

                <FormControl>
                  <FormLabel>終業時間</FormLabel>
                  <Input {...endAtHourInput} />
                </FormControl>

                <FormControl>
                  <FormLabel>生み出したい時間</FormLabel>
                  <Input {...hoursToGenerateInput} />
                </FormControl>
              </Stack>
              <Button colorScheme="blue" type="submit">
                トリガー！
              </Button>
            </Stack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
