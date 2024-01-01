import { Modal } from "antd";
type Props = {
  modalOpen: boolean;
  setModalOpen: (modalOpen: boolean) => void;
};
export default function AddExerciseModal({ modalOpen, setModalOpen }: Props) {
  return (
    <Modal
      title="Add exercise"
      centered
      onCancel={() => setModalOpen(false)}
      open={modalOpen}
    >
      Hello
    </Modal>
  );
}
