import { SiteRecord } from '@/typing';
import dayjs from 'dayjs';
import styles from './index.module.scss';

const renderTime = (timestamp?: number) =>
  timestamp ? <span>{dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss')}</span> : null;

export default function Card(props: { record: SiteRecord; rm: (row: SiteRecord) => void; 'data-index': number }) {
  const { record } = props;

  const rm = (e: React.MouseEvent) => {
    e.stopPropagation();
    props.rm(props.record);
  };

  const dragStart = (e: React.DragEvent, uuid: string) => {
    e.dataTransfer.setData('uuid', uuid);
  };
  const dragEvent = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <section
      className={styles.card}
      data-proxy
      data-index={props['data-index']}
      draggable="true"
      onDragStart={(e) => dragStart(e, record.uuid)}
      onDrag={dragEvent}
    >
      <header>{record.title}</header>
      <main>{record.url}</main>
      <footer>
        <div>
          <span>{record.category}</span>
          <span className={styles.count}>访问数：{record.count}</span>
          {renderTime(record.last_access_time)}
          <span className={styles.del} onClick={rm}>
            移除
          </span>
        </div>
      </footer>
    </section>
  );
}
