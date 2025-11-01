
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
//import SettingsButton from "@/components/layout/SettingsButton"
import { Outlet } from "react-router-dom"

export default function AppLayout() {
  return (
    <div className="app.bg">
      <Navbar />
      <main className="pt-16">
        <Outlet /> {/* <- IMPORTANTE */}
      </main>
      <Footer />
     
    </div>
  )
}

