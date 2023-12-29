import { PageAnimation } from "@/app/aniamtions/pageAnimation";
import LoginForm from "./loginForm";

export default async function Login() {
  return (
    <PageAnimation>
      <LoginForm />
    </PageAnimation>
  );
}
