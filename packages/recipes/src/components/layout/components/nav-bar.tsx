import clsx from "clsx"
import { useRouter } from "next/dist/client/router"
import Link from "next/link"

import styles from "./nav-bar.module.css"

export const NavBar: React.FC = () => {
  const { asPath } = useRouter()
  const currentPath = asPath.split("?")[0]

  const nonBreakingSpaceCode = "\xa0"
  const routes = [
    { route: "/", title: `home` },
    { route: "/recipes", title: `all${nonBreakingSpaceCode}recipes` },
  ]

  return (
    <nav className={styles.root}>
      {routes.map(({ route, title }) => {
        const isActivePath = route === currentPath

        return (
          <Link
            className={clsx(isActivePath ? styles.active : null)}
            prefetch={false}
            key={route}
            href={route}
          >
            {title}
          </Link>
        )
      })}
    </nav>
  )
}
