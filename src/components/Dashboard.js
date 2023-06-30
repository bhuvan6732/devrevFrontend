import React, { useEffect, useState } from 'react';
import './Dashboard.css'; // Import the CSS file
import VaccineDataServices from './services/vaccines';
import { Link } from 'react-router-dom';
const Dashboard = (props) => {
  const [centersList, setCentersList] = useState([]);
  function getCenters() {
    VaccineDataServices.getAllCenter().then((data) => {
      setCentersList(data);
      setFilteredCenters(data.data);
    });
  }
  useEffect(getCenters, []);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCenters, setFilteredCenters] = useState(centersList);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    VaccineDataServices.find(searchTerm).then((data) => {
      setFilteredCenters(data.data);
    });
  };

  const handleLogout = () => {
    props.setUser({});
  };

  return (
    <div className="dashboard">
      <header>
        <h2>Vaccination Centers</h2>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by location"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <ul className="centers-list">
        {filteredCenters.map((center) => (
          <li key={center._id}>
            <h3>{center.city}</h3>
            <p>Location: {center.area}</p>
            <p>Working Hours:{center.workinghours}</p>
            <Link to={'/center/' + center._id} type="button">
              Book Slots
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
