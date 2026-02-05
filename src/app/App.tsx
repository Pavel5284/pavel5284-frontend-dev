import style from "./App.module.css"
import {Routing} from "@/common/routing/Routing.tsx"
import {Header} from "@/common/components/header/Header.tsx";
import {Footer} from "@/common/components/footer/Footer.tsx";
import {ScrollToTop} from "@/common/utils/scrollToTop.ts";

export const App = () => {


    return (
        <div className={style.app}>
            <ScrollToTop/>
            <Header/>
            <main className={style.content}>
                <Routing/>
            </main>
            <Footer/>
        </div>
    )
}
