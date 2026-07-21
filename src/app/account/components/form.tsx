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
      {title && (
        <h2 className="mt-4 text-center text-xl font-bold">{title}</h2>
      )}
      <div className="m-4 w-full max-w-sm rounded-xl border border-solid border-gray-100 bg-white p-6">
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
      <Input size="large" prefix={<UserOutlined className="text-gray-400" />} placeholder="Email" />
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
        size="large"
        prefix={<LockOutlined className="text-gray-400" />}
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
              new Error("The new password that you entered do not match!"),
            );
          },
        }),
      ]}
    >
      <Input.Password
        size="large"
        prefix={<LockOutlined className="text-gray-400" />}
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
      <Button {...props} size="large" type="primary" htmlType="submit" block>
        {text}
      </Button>
    </Form.Item>
  );
}
