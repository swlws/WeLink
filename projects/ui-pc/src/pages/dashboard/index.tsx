import { getLinkList, upsertOneLink, clearLinks } from "@/api/site_link";
import styles from "./index.module.scss";
import { v4 } from "uuid";

export default function Home() {
  const setData = () => {
    upsertOneLink({ uuid: v4() } as any);
  };

  const getData = () => {
    getLinkList().then(console.log);
  };

  const clear = () => {
    clearLinks();
  };

  return (
    <article className={styles.container}>
      <header>Welcome To WeLink</header>
      <main>A Tool For Recording Web Site.</main>
      <br />
      <main>All Data Is Only Stored Locally.</main>
      <button onClick={setData}>set</button>
      <button onClick={getData}>log</button>
      <button onClick={clear}>clear</button>
    </article>
  );
}
