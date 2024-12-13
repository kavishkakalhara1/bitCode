import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashUsers from '../components/DashUsers';
import DashComments from '../components/DashComments';
import DashboardComp from '../components/DashboardComp';
import DashAnnouncements from '../components/DashAnnouncements';
import DashMember from '../components/DashMember';
import DashMemberCard from '../components/DashMemberCard';
import DashSettings from '../components/DashSettings';
import DashMail from '../components/DashMail';
import DashCharts from '../components/DashCharts';

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className='flex flex-col min-h-screen md:flex-row'>
      <div className='md:w-56'>
        {/* Sidebar */}
        <DashSidebar />
      </div>
      {/* Charts*/}
      {tab === 'charts' && <DashCharts />}
      {/* profile... */}
      {tab === 'profile' && <DashProfile />}
      {/* Membership... */}
      {tab === 'membership' && <DashMember />}
      {/* posts... */}
      {tab === 'announcements' && <DashAnnouncements />}
      {tab === 'mail' && <DashMail />}
      {/* users */}
      {tab === 'users' && <DashUsers />}
      {/* comments  */}
      {tab === 'comments' && <DashComments />}
      {/* dashboard comp */}
      {tab === 'dash' && <DashboardComp />}
      {tab === 'card' && <DashMemberCard />}
      {tab === 'settings' && <DashSettings />}
    </div>
  );
}