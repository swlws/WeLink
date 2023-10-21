import { SiteRecord } from "@/typing";
import styles from "./index.module.scss";

export default function Card(props: {
  record: SiteRecord;
  "data-index": number;
}) {
  const { record } = props;

  const starStyle = {
    color: record.star ? "orange" : "#999",
    padding: "0 5px 0 0",
  };

  return (
    <section
      className={styles.card}
      data-proxy
      data-index={props["data-index"]}
    >
      <header>
        <header>
          <i style={starStyle} className="iconfont icon-star-fill"></i>
        </header>
        <main>{record.title}</main>
      </header>
      {record.schedule ? (
        <main style={{ fontSize: "12px" }}>
          <span>日程：{record.schedule}</span>
        </main>
      ) : null}
    </section>
  );
}
