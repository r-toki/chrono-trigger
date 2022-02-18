import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useState } from "react";
import useLocalStorage from "react-use/lib/useLocalStorage";

type SettingsState = {
  startAt: string;
  endAt: string;
  produceHour: string;
};
const defaultSettingsValues = {
  startAt: "9",
  endAt: "18",
  produceHour: "1",
};
type SettingsProps = {
  isOpen: boolean;
  onClose: () => void;
};
export const SettingsModal = (props: SettingsProps) => {
  const [value, setValue] = useLocalStorage<SettingsState>("ct-settings", defaultSettingsValues);
  const [startAt, setStartAt] = useState(value?.startAt || "");
  const [endAt, setEndAt] = useState(value?.endAt || "");
  const [produceHour, setProduceHour] = useState(value?.produceHour || "");

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel htmlFor="startAt">開始</FormLabel>
            <Input
              id="startAt"
              value={startAt}
              onChange={(v) => {
                setStartAt(v.target.value);
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="endAt">終了</FormLabel>
            <Input
              id="endAt"
              value={endAt}
              onChange={(v) => {
                setEndAt(v.target.value);
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="produceHour">生む</FormLabel>
            <Input
              id="produceHour"
              value={produceHour}
              onChange={(v) => {
                setProduceHour(v.target.value);
              }}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => {
              console.log({ startAt, endAt, produceHour });
              setValue({ startAt, endAt, produceHour });
              props.onClose();
            }}
          >
            Set
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
