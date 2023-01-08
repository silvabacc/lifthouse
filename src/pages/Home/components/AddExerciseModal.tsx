import React, { useEffect, useState } from "react";
import { Portal, Modal, TextInput, Button } from "react-native-paper";
import style from "./AddExerciseModal.style";
import DropDown from "react-native-paper-dropdown";
import { View, Keyboard } from "react-native";
import { colors } from "../../../style/colors";

interface AddExerciseModalProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
}

enum ExerciseType {
  UPPER_INTENSITY = "UPPER_INTENSITY",
  UPPER_VOLUME = "UPPER_VOLUME",
  LOWER_INTENSITY = "LOWER_INTENSITY",
  LOWER_VOLUME = "LOWER_VOLUME",
}

const AddExerciseModal: React.FC<AddExerciseModalProps> = ({
  visible,
  setVisible,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [keyboard, setKeyboard] = useState(false);
  const [exerciseType, setExerciseType] = useState(
    ExerciseType.UPPER_INTENSITY
  );
  const exerciseList = [
    { label: "Upper Intensity", value: ExerciseType.UPPER_INTENSITY },
    { label: "Upper Volume", value: ExerciseType.UPPER_VOLUME },
    { label: "Lower Intensity", value: ExerciseType.LOWER_INTENSITY },
    { label: "Lower Volume", value: ExerciseType.LOWER_VOLUME },
  ];

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboard(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboard(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const { modal_container, inputs_container, input, add_button } =
    style(keyboard);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={() => setVisible(false)}
        contentContainerStyle={modal_container}
      >
        <View style={[inputs_container]}>
          <DropDown
            activeColor={colors.accent}
            label="Exercise Type"
            mode="outlined"
            visible={showDropdown}
            showDropDown={() => setShowDropdown(!showDropdown)}
            onDismiss={() => setShowDropdown(!showDropdown)}
            value={exerciseType}
            setValue={(value) => setExerciseType(value)}
            list={exerciseList}
          />
          <TextInput
            activeOutlineColor={colors.accent}
            style={input}
            label="Exercise Name"
            mode="outlined"
          />
          <Button style={add_button}>ADD</Button>
        </View>
      </Modal>
    </Portal>
  );
};

export default AddExerciseModal;
