import style from "./App.module.css"
import {Routing} from "@/common/routing/Routing.tsx"
import {Navbar} from "@/common/components/navbar/Navbar.tsx";
import {Footer} from "@/common/components/footer/Footer.tsx";

export const App = () => {


    return (
        <div className={style.app}>
            <Navbar/>
            <main className={style.content}>
                <Routing/>
            </main>
            <Footer/>
        </div>
    )
}
