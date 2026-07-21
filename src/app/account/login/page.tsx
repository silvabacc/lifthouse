import { PageAnimation } from "@/app/animations/pageAnimation";
import LoginForm from "./loginForm";

export default async function Login() {
  return (
    <PageAnimation>
      <LoginForm />
    </PageAnimation>
  );
}
