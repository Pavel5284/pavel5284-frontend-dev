import style from "./App.module.css"
import {Routing} from "@/common/routing/Routing.tsx"
import {Navbar} from "@/common/components/navbar/Navbar.tsx";

export const App = () => {


  return (
      <div className={style.app}>
        <Navbar />
        <Routing />
      </div>
  )
}
