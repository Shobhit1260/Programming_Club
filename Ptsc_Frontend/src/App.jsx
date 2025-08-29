import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Pages/Home';
import About from './components/Pages/About';
import Team from './components/Pages/Team.jsx';
import Events from './components/Pages/Events';
import Resources from './components/Pages/AllResources/Resources.jsx';
import Resource from './components/Pages/AllResources/Resource.jsx';
import Workshop from './components/Pages/AllResources/Workshop.jsx';
import Leaderboard from './components/Pages/Leaderboard.jsx';
import ContactUs from './components/Pages/ContactUs';
import Signup from './components/Pages/BeMember/Signup.jsx';
import Login from './components/Pages/BeMember/Login.jsx';
import Navbar from './components/Navbar.jsx';
import Admin from './components/Admin/Admin_Page.jsx';
import Admin_TeamMember from './components/Admin/Team/Admin_TeamMember.jsx';
import Admin_Event from './components/Admin/Event/Admin_Event.jsx';
import Admin_Resource from './components/Admin/Resource/Admin_Resource.jsx';
import Admin_LeaderBoard from './components/Admin/LeaderBoard/Admin_LeaderBoard.jsx';
import GetAll_Pendings from './components/Admin/Members/GetAll_Pendings.jsx';

function App() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <Navbar />

      <main className="w-full mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/event" element={<Events />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/team" element={<Team />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/resource" element={<Resources />}>
            <Route index element={<Resource />} />
            <Route path="resource" element={<Resource />} />
            <Route path="workshop" element={<Workshop />} />
          </Route>

          <Route path="/admin" element={<Admin />}>
            <Route index element={<Admin_Event />} />
            <Route path="admin_event" element={<Admin_Event />} />
            <Route path="admin_team" element={<Admin_TeamMember />} />
            <Route path="admin_pendingmembers" element={<GetAll_Pendings />} />
            <Route path="admin_resources" element={<Admin_Resource />} />
            <Route path="admin_leaderboard" element={<Admin_LeaderBoard />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
