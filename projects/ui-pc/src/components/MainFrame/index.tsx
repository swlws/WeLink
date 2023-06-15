import { ReactElement, useState } from "react";
import { useLocation, Outlet, Link } from "react-router-dom";
import styles from "./index.module.scss";

interface IMenu {
  id: string;
  name: string;
  url: string;
}

type IProps = {
  menus: IMenu[];
  children?: ReactElement;
};

export default function MainFrame(props: IProps) {
  const location = useLocation();
  if (location.pathname === "/") {
    history.pushState({}, "", "/home");
  }

  const [checkId, setCheckedId] = useState(
    props.menus.find((item) => item.url === location.pathname)?.id
  );

  return (
    <article className={styles.container}>
      <header>
        <header>WeLink</header>
        <main>Login</main>
      </header>

      <section>
        <aside>
          {props.menus.map((item) => (
            <Link
              className={checkId === item.id ? styles.checked_link : ""}
              key={item.id}
              to={item.url}
              onClick={() => setCheckedId(item.id)}
            >
              {item.name}
            </Link>
          ))}
        </aside>

        <main>
          <Outlet />
        </main>
      </section>
    </article>
  );
}
