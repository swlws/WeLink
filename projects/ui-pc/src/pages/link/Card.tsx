import { SiteRecord } from "@/typing";
import styles from "./index.module.scss";

export default function Card(props: {
  record: SiteRecord;
  rm: (row: SiteRecord) => void;
  "data-index": number;
}) {
  const { record } = props;
  const last_access_time = record.last_access_time as any;

  const rm = (e: React.MouseEvent) => {
    console.log(e);
    e.stopPropagation();
    props.rm(props.record);
  };

  return (
    <section
      className={styles.card}
      data-proxy
      data-index={props["data-index"]}
    >
      <header>{record.title}</header>
      <main>{record.url}</main>
      <footer>
        <div>
          <span className={styles.count}>访问数：{record.count}</span>
          {last_access_time ? <span>{last_access_time}</span> : ""}
          <span className={styles.del} onClick={rm}>
            移除
          </span>
        </div>
      </footer>
    </section>
  );
}
