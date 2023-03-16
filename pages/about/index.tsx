import { AdminLayout } from "@/components/layout";
import styles from "./styles.module.scss";
export default function AboutPage() {

  return (
    <main className={styles.about}>
      <h1>About</h1>
    </main>
  );
}
AboutPage.Layout = AdminLayout