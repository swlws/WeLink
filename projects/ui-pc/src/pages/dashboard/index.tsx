import styles from "./index.module.scss";

export default function Home() {
  return (
    <article className={styles.container}>
      <header>Welcome To WeLink</header>
      <main>A Tool For Recording Web Site.</main>
      <br />
      <main>All Data Is Only Stored Locally.</main>
    </article>
  );
}
