import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import clsx from "clsx";

import styles from "./nav-bar.module.css";

export const NavBar: React.FC = () => {
  const { asPath } = useRouter();
  const currentPath = asPath.split("?")[0];

  const nonBreakingSpaceCode = "\xa0";
  const routes = [
    { route: "/recipes", title: `all${nonBreakingSpaceCode}recipes` },
  ];

  return (
    <nav className={styles.root}>
      {routes.map(({ route, title }) => {
        const isActivePath = route === currentPath;

        return (
          <Link prefetch={false} key={route} href={route}>
            <a className={clsx(isActivePath ? styles.active : null)}>{title}</a>
          </Link>
        );
      })}
    </nav>
  );
};
