// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "@/components/layout/AppLayout";
import Home from "@/pages/Home";
import Menu from "@/pages/Menu";
import About from "@/pages/About";
import Contact from "@/pages/Contact";

import AdminLayout from "@/pages/admin/AdminLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminProducts from "@/pages/admin/AdminProducts";
import AdminAddProduct from "@/pages/admin/AdminAddProduct";
import AdminEditProduct from "@/pages/admin/AdminEditProduct"; // <-- importa aqui

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* público */}
        <Route element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="produtos" element={<AdminProducts />} />
          <Route path="novo" element={<AdminAddProduct />} />

          {/* >>> ESTA é a rota que precisa existir <<< */}
          <Route path="produtos/:id/editar" element={<AdminEditProduct />} />
          {/* certifique-se de NÃO ter isto:
              <Route path="editar" element={<AdminEditProduct />} />  */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
