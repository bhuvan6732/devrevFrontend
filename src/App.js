import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Center from './components/Center';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Signup from './components/Signup';
import AdminDashboard from './components/AdminDashboard';
import AddNewCenter from './components/AddNewCenter';
import AdminCenter from './components/AdminCenter';

function App() {
  const [user, setUser] = useState({});
  const [adminUser, setAdminUser] = useState({});
  const [isAdmin, setisAdmin] = useState('false');

  let returnthis;
  let createcenter;

  if (user._id) {
    returnthis = <Dashboard setUser={setUser} user={user}></Dashboard>;
  } else if (isAdmin && adminUser._id) {
    returnthis = (
      <AdminDashboard
        adminUser={adminUser}
        setUser={setAdminUser}
      ></AdminDashboard>
    );
  } else {
    returnthis = (
      <Login
        setUser={setUser}
        setAdminUser={setAdminUser}
        setisAdmin={setisAdmin}
      />
    );
  }

  if (adminUser) {
    createcenter = <AddNewCenter user={adminUser} />;
  }
  let centerpath;
  if (user._id) {
    centerpath = <Center user={user} setUser={setUser} />;
  } else if (adminUser._id) {
    centerpath = (
      <AdminCenter user={adminUser} setUser={setAdminUser}></AdminCenter>
    );
  } else {
    centerpath = (
      <Login
        setUser={setUser}
        setAdminUser={setAdminUser}
        setisAdmin={setisAdmin}
      />
    );
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={returnthis}></Route>
        <Route path="/center/:id" element={centerpath}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/admin/addnewcenter" element={createcenter}></Route>
        <Route path="/admin/center/:id" element={centerpath}></Route>
      </Routes>
    </div>
  );
}

export default App;
