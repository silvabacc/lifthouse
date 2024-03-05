import {
  Drawer,
  InputNumber,
  Button,
  Alert,
  Card,
  Space,
  Form,
  Collapse,
} from "antd";
import Calculator from "../calculator";

type FieldType = {
  bench: number;
  squat: number;
  deadlift: number;
};

type Props = {
  open: boolean;
  onClose: () => void;
};
export function SetupDrawer({ open, onClose }: Props) {
  return (
    <Drawer title="Setup" open={open} onClose={onClose} width={"100%"}>
      <div>
        <Card>
          <h1 className="m-0 mb-2">1RM (one rep max) for SBD</h1>
          <span>
            Enter your 1 rep max. You don&apos;t have to be accurate and be
            realistic, you don&apos;t have to train at your one rep max for this
            program to be effective
          </span>
          <Form className="mt-4">
            {["Bench", "Squat", "Deadlift"].map((lift) => (
              <div key={lift} className="flex items-center ">
                <div className="w-full">
                  <Form.Item
                    name={lift.toLocaleLowerCase()}
                    colon={false}
                    label={
                      <span className="text-left font-bold mr-4 w-16">
                        {lift}
                      </span>
                    }
                  >
                    <InputNumber required className="w-full" suffix="kg" />
                  </Form.Item>
                </div>
              </div>
            ))}
            <div className="flex justify-center mt-4">
              <Button type="primary" className="w-64" htmlType="submit">
                Finish
              </Button>
            </div>
          </Form>
        </Card>
        <Calculator />
      </div>
    </Drawer>
  );
}
