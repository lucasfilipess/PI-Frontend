import React from 'react';
import DashboardNavbar from '../../organisms/dashboardNavbar';
import Donations from '../../organisms/donations';
import Footer from '../../molecules/footer';

function Dashboard() {
  return (
    <>
      <DashboardNavbar />
      <Donations />
      <Footer style={{ marginTop: '50px' }} />
    </>
  );
}
export default Dashboard;
