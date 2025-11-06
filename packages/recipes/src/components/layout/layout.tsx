import { NavBar, TopBar } from "./components"
import styles from "./layout.module.css"

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <TopBar />
      <NavBar />
      <div className={styles.content}>{children}</div>
    </div>
  )
}
