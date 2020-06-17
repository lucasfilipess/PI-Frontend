import React from 'react';
import Navbar from '../../organisms/dashboardNavbar';
import Footer from '../../molecules/footer';
import EditDonationCard from '../../organisms/editDonationCard';

function EditDonation() {
  return (
    <>
      <Navbar />
      <EditDonationCard />
      <Footer />
    </>
  );
}
export default EditDonation;
