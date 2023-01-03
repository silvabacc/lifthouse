import React from "react";
import { View } from "react-native";
import { Portal, Modal, Text } from "react-native-paper";
import style from "./AddExerciseModal.style";
import { textStyle } from "../../../style/House.style";

interface AddExerciseModalProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
}

const AddExerciseModal: React.FC<AddExerciseModalProps> = ({
  visible,
  setVisible,
}) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={() => setVisible(false)}
        contentContainerStyle={style.modal_container}
      >
        <View style={style.container}>
          <Text style={textStyle.h3}>Add Exercise ➕</Text>
        </View>
      </Modal>
    </Portal>
  );
};

export default AddExerciseModal;
