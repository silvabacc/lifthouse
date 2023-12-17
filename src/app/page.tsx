"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { LockOutlined, GoogleOutlined } from "@ant-design/icons";
import {
  EmailField,
  FormButton,
  FormContainer,
  PasswordField,
} from "./components/form";
import { Button, Divider, Form, Input } from "antd";

export default function Auth() {
  const signInWithGoogleOClick = () => {};

  return (
    <div className={styles.main}>
      <h1>LiftHouse 🏋</h1>
      <span className={styles.caption}>
        Enjoy the journey, not the destination
      </span>
      <FormContainer>
        <EmailField />
        <Form.Item>
          <a href="/signup">New User? Sign up here</a>
        </Form.Item>
        <PasswordField />
        <Form.Item>
          <a href="/recovery">Forgot password</a>
        </Form.Item>
        <FormButton text={"Login"} />
        <Divider style={{ borderColor: "black" }}>
          <span>Or Log in With</span>
        </Divider>
        <div className={styles.providers_container}>
          <Button icon={<GoogleOutlined />} onClick={signInWithGoogleOClick}>
            Google
          </Button>
        </div>
      </FormContainer>
    </div>
  );
}
