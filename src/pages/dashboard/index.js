import React from 'react';


function Dashboard() {
  const name = localStorage.getItem('name');
  return (
    <div>
      <h1>Bem vindo: {name}</h1>
    </div>
  );
}
export default Dashboard;
