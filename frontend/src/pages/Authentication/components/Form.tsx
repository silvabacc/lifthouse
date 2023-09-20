import { Button, ButtonProps, Form, Input, Typography } from "antd";
import { BiUser } from "react-icons/bi";
import { ErrorText, FormButtonStyle, LinkButtonWrapper } from "./FormStyles";
import { LoginOutlined } from "@ant-design/icons";
import { RiLockPasswordLine } from "react-icons/ri";
import { UserOutlined } from "@ant-design/icons";

const { Text } = Typography;

export const EmailField: React.FC = () => (
  <Form.Item
    name="email"
    rules={[
      { required: true, message: "Please input your email" },
      { type: "email", message: "Please input your email" },
    ]}
  >
    <Input prefix={<UserOutlined />} placeholder="Email" />
  </Form.Item>
);

interface PasswordFieldProp {
  setPassword: React.Dispatch<React.SetStateAction<string | null>>;
}
export const PasswordField: React.FC<PasswordFieldProp> = ({ setPassword }) => (
  <>
    <Text>Password</Text>
    <Input.Password
      placeholder="Password"
      prefix={<RiLockPasswordLine />}
      onChange={(e) => setPassword(e.target.value)}
    />
  </>
);

interface LinkButtonProps extends ButtonProps {
  text: string;
}
export const LinkButton: React.FC<LinkButtonProps> = ({ text, ...props }) => (
  <LinkButtonWrapper>
    <Button type="link" {...props}>
      {text}
    </Button>
  </LinkButtonWrapper>
);

interface FormButtonProps extends ButtonProps {
  text: string;
}

export const FormButton: React.FC<FormButtonProps> = ({ text, ...props }) => (
  <Form.Item>
    <Button
      {...props}
      style={{ marginTop: 8 }}
      type="primary"
      htmlType="submit"
      block
    >
      {text}
    </Button>
  </Form.Item>
);

interface ErrorMessageProps {
  message: string | null;
}
export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <ErrorText>{message}</ErrorText>
);
