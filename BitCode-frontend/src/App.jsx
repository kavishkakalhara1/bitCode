import {
  BrowserRouter,
  Routes,
  Route,
  useBeforeUnload,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute";
import ScrollToTop from "./components/ScrollToTop";
import React, { useEffect } from "react";
import AnimatedRoutes from "./components/AnimatedRoutes";
import CreateAnnouncement from "./pages/CreateAnnouncement";
import UpdateAnnouncement from "./pages/UpdateAnnouncement";
import AnnouncementPage from "./pages/AnnouncementPage";

export default function App() {
  
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <AnimatedRoutes />
      <Routes>
        <Route path="/post/:postSlug" element={<AnnouncementPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* <Route path="*" element={<NotFound />} /> */}
        <Route element={<PrivateRoute />}>
          <Route path="/create-post" element={<CreateAnnouncement />} />
          <Route path="/update-post/:postId" element={<UpdateAnnouncement />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          {/* Add admin routes here if needed */}
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
