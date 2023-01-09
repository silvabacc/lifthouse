import React, { useEffect, useRef, useState } from "react";
import { Portal, Modal, TextInput, Button } from "react-native-paper";
import style from "./AddExerciseModal.style";
import DropDown from "react-native-paper-dropdown";
import { Keyboard, Animated, View } from "react-native";
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

  const heightAnimatedValue = useRef(new Animated.Value(0)).current;

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

  useEffect(() => {
    Animated.timing(heightAnimatedValue, {
      toValue: !keyboard ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [heightAnimatedValue, keyboard]);

  const heightPercentage = heightAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["40%", "55%"],
  });

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={() => setVisible(false)}
        contentContainerStyle={style.modal_container}
      >
        <Animated.View
          style={[style.inputs_container, { height: heightPercentage }]}
        >
          <View style={style.input}>
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
          </View>
          <TextInput
            activeOutlineColor={colors.accent}
            style={[style.input, style.input_text]}
            label="Exercise Name"
            mode="outlined"
          />
          <Button
            style={style.add_button}
            textColor={colors.accent}
            uppercase={true}
            mode="text"
          >
            Add Exercise
          </Button>
        </Animated.View>
      </Modal>
    </Portal>
  );
};

export default AddExerciseModal;
