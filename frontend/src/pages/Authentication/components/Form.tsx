import { Button, ButtonProps, Input, Typography } from "antd";
import { BiUser } from "react-icons/bi";
import { ErrorText, FormButtonStyle, LinkButtonWrapper } from "./FormStyles";
import { LoginOutlined } from "@ant-design/icons";
import { RiLockPasswordLine } from "react-icons/ri";

const { Text } = Typography;

interface EmailFieldProps {
  setEmail: React.Dispatch<React.SetStateAction<string | null>>;
}
export const EmailField: React.FC<EmailFieldProps> = ({ setEmail }) => (
  <>
    <Text>Email</Text>
    <Input
      placeholder="Enter your email"
      prefix={<BiUser className="site-form-item-icon" />}
      onChange={(e) => setEmail(e.target.value)}
    />
  </>
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
  <FormButtonStyle
    size="large"
    type="primary"
    shape="round"
    icon={<LoginOutlined />}
    {...props}
  >
    {text}
  </FormButtonStyle>
);

interface ErrorMessageProps {
  message: string | null;
}
export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <ErrorText>{message}</ErrorText>
);
