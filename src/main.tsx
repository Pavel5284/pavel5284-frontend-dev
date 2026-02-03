import { App } from "@/app/App"
import { createRoot } from "react-dom/client"
import "./index.css"
import { BrowserRouter } from "react-router"
import './i18n/i18n';

createRoot(document.getElementById("root")!).render(
  //BrowserRouter  changed to HashRouter for gh-pages
  <BrowserRouter>
      <App />
  </BrowserRouter>,
)
