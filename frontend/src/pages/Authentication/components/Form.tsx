import { Button, ButtonProps, Form, Input, Typography, FormProps } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import colors from "@frontend/theme/colors";

const { Title } = Typography;

interface FormWrapperProps extends FormProps {
  title?: string;
  children: React.ReactNode;
}

export const FormWrapper: React.FC<FormWrapperProps> = ({
  title,
  children,
  ...props
}) => {
  return (
    <>
      <Title level={4}>{title}</Title>
      <div
        style={{
          width: 350,
          padding: 16,
          backgroundColor: colors.formBackgroundColor,
          borderRadius: 8,
        }}
      >
        <Form {...props}>{children}</Form>
      </div>
    </>
  );
};

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

export const PasswordField: React.FC = () => (
  <Form.Item
    name={"password"}
    rules={[{ required: true, message: "Please input your Password" }]}
  >
    <Input.Password
      prefix={<LockOutlined />}
      type="password"
      placeholder={"Password"}
      visibilityToggle
    />
  </Form.Item>
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
