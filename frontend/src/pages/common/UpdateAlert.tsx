import { Alert } from "antd";

interface UpdateAlertProps {
  width?: number;
}
const UpdateAlert: React.FC<UpdateAlertProps> = ({ width }) => {
  return (
    <Alert
      type="info"
      style={{ width, marginBottom: 8, marginTop: 8 }}
      message={
        <div>
          A new version of <span style={{ fontWeight: "bold" }}>LiftHouse</span>{" "}
          is available! This website is in maintance and will{" "}
          <span style={{ fontWeight: "bold" }}>no longer be supported</span>.
          Please visit the new website{" "}
          <a href="https://lifthouse.vercel.app/">here</a>
        </div>
      }
    />
  );
};

export default UpdateAlert;
