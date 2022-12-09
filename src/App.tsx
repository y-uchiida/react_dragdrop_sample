import "./App.css"
import { NavBar } from "./components/NavBar"
import { ReactNode } from "react"

function App({ children }: { children?: ReactNode }) {
  return (
    <div className="App">
      <NavBar />
      {children}
    </div>
  )
}

export default App
