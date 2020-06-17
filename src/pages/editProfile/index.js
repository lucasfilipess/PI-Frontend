import React from 'react';
import Navbar from '../../organisms/dashboardNavbar';
import Footer from '../../molecules/footer';
import EditProfileCard from '../../organisms/editProfileCard';

function EditProfile() {
  return (
    <>
      <Navbar />
      <EditProfileCard />
      <Footer />
    </>
  );
}
export default EditProfile;
