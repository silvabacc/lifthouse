"use client";

import { Button, ButtonProps, Form, Input, Typography, FormProps } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

interface FormWrapperProps extends FormProps {
  title?: string;
  children: React.ReactNode;
}

export function FormWrapper({ title, children, ...props }: FormWrapperProps) {
  return (
    <>
      <h2 className="text-xl mt-4 font-bold text-center">{title}</h2>
      <div className="w-72 m-4 p-4 bg-gray-50 rounded-lg">
        <Form {...props}>{children}</Form>
      </div>
    </>
  );
}

export function EmailField() {
  return (
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
}

export function PasswordField() {
  return (
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
}

export function ConfirmPasswordField() {
  return (
    <Form.Item
      name="confirm"
      dependencies={["password"]}
      rules={[
        {
          required: true,
          message: "Please confirm your password!",
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue("password") === value) {
              return Promise.resolve();
            }
            return Promise.reject(
              new Error("The new password that you entered do not match!")
            );
          },
        }),
      ]}
    >
      <Input.Password
        prefix={<LockOutlined />}
        placeholder="Confirm Password"
      />
    </Form.Item>
  );
}

interface FormButtonProps extends ButtonProps {
  text: string;
}

export function FormButton({ text, ...props }: FormButtonProps) {
  return (
    <Form.Item>
      <Button {...props} type="primary" htmlType="submit" block>
        {text}
      </Button>
    </Form.Item>
  );
}
