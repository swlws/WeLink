import styles from "./index.module.scss";

import RenderList from "./RenderList";

export default function Home() {
  return (
    <article className={styles.container}>
      <header>
        <h1>WeLink</h1>
        <p>数据仅存储在本地，无网络请求！</p>
      </header>

      <main>
        <RenderList title="常看 Top 10" type="top_click" />
        <RenderList title="精选" type="star" />
        <RenderList title="日程" type="schedule" />
      </main>
    </article>
  );
}
