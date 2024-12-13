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
import WhatsAppButton from "./components/WhatsAppButton";
import Affiliation from "./pages/about/Affiliation";
import VisionAndMission from "./pages/about/VisionAndMission";
import Constitution from "./pages/about/Constitution";
import HowtoBecomeaMember from "./pages/membership/HowtoBecomeaMember";
import EntryRequirements from "./pages/membership/EntryRequirements";
import MembershipFees from "./pages/membership/MembershipFees";
import NotFound from "./pages/NotFound";
import ExecutiveBoard from "./pages/committees/ExecutiveBoard";
import ContactUs from "./pages/ContactUs";
import TechnicalTeam from "./pages/committees/TechnicalTeam";

export default function App() {
  
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <AnimatedRoutes />
      <Routes>
        <Route path="/post/:postSlug" element={<AnnouncementPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about/affiliation" element={<Affiliation />} />
        <Route path="/about/vision-mission" element={<VisionAndMission />} />
        <Route path="/about/contact-us" element={<ContactUs />} />
        <Route path="/about/constitution" element={<Constitution />} />
        <Route
          path="/membership/how-to-become-a-member"
          element={<HowtoBecomeaMember />}
        />
        <Route
          path="/membership/entry-requirements"
          element={<EntryRequirements />}
        />
        <Route
          path="/membership/membership-fees"
          element={<MembershipFees />}
        />
        <Route
          path="/commitees/executive-committee"
          element={<ExecutiveBoard />}
        />
        <Route path="/commitees/chapters" element={<MembershipFees />} />
        <Route path="/commitees/technical-team" element={<TechnicalTeam/>} />
        {/* <Route path="*" element={<NotFound />} /> */}
        <Route element={<PrivateRoute />}>
          <Route path="/create-post" element={<CreateAnnouncement />} />
          <Route path="/update-post/:postId" element={<UpdateAnnouncement />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          {/* Add admin routes here if needed */}
        </Route>
      </Routes>
      <WhatsAppButton />
      <Footer />
    </BrowserRouter>
  );
}
