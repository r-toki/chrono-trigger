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
  useToast,
} from "@chakra-ui/react";
import { FormEventHandler, VFC } from "react";
import { useSettings } from "../context/settings";
import { useTextInput } from "../hooks/useTextInput";

type SettingsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const SettingsModal: VFC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const toast = useToast();

  const { settings, setSetting } = useSettings();

  const [startAtHourInput] = useTextInput(settings.startAtHour);
  const [endAtHourInput] = useTextInput(settings.endAtHour);
  const [hoursToGenerateInput] = useTextInput(settings.hoursToGenerate);

  const validate = () => {
    const startAtHour = Number(startAtHourInput.value);
    const endAtHour = Number(endAtHourInput.value);
    const hoursToGenerate = Number(hoursToGenerateInput.value);
    if (!(endAtHour > startAtHour)) return false;
    if (!(endAtHour - startAtHour > hoursToGenerate)) return false;
    if (!(24 - endAtHour - hoursToGenerate > 0)) return false;
    return true;
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!validate()) {
      toast({ title: "その時は越えられません！", status: "error", position: "top-right" });
      return;
    }
    setSetting({
      startAtHour: startAtHourInput.value,
      endAtHour: endAtHourInput.value,
      hoursToGenerate: hoursToGenerateInput.value,
    });
    onClose();
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
                  <Input type="number" min="1" max="23" step="1" required {...startAtHourInput} />
                </FormControl>

                <FormControl>
                  <FormLabel>終業時間</FormLabel>
                  <Input type="number" min="1" max="23" step="1" required {...endAtHourInput} />
                </FormControl>

                <FormControl>
                  <FormLabel>生み出したい時間</FormLabel>
                  <Input
                    type="number"
                    min="1"
                    max="23"
                    step="1"
                    required
                    {...hoursToGenerateInput}
                  />
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
