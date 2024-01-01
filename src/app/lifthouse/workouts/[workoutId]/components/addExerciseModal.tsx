import { Drawer, Modal } from "antd";
type Props = {
  drawOpen: boolean;
  setDrawOpen: (modalOpen: boolean) => void;
};
export default function AddExerciseDrawer({ drawOpen, setDrawOpen }: Props) {
  return (
    <Drawer
      title={"Add an exercise"}
      open={drawOpen}
      onClose={() => setDrawOpen(false)}
      width={500}
    >
      Hello
    </Drawer>
  );
}
