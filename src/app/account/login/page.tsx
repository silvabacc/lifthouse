import { PageStartAnimation } from "@/app/aniamtions/pageStartAnimation";
import LoginForm from "./loginForm";

export default async function Login() {
  return (
    <PageStartAnimation>
      <LoginForm />
    </PageStartAnimation>
  );
}
