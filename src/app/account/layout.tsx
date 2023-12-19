import { AppContextProvider } from "../context";
import styles from "./layout.module.css";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={styles.main}>
      <h1>LiftHouse 🏋</h1>
      <span className={styles.caption}>
        Enjoy the journey, not the destination
      </span>
      <AppContextProvider>{children}</AppContextProvider>
    </section>
  );
}
