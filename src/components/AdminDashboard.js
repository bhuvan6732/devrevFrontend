import React, { useEffect, useState } from "react";
import "./Dashboard.css"; // Import the CSS file
import VaccineDataServices from "./services/vaccines";
import { Link } from "react-router-dom";

const Dashboard = (props) => {
  const [centersList, setCentersList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCenters, setFilteredCenters] = useState([]);

  useEffect(() => {
    getCenters();
  }, []);

  const getCenters = () => {
    VaccineDataServices.getAllCenter()
      .then((data) => {
        setCentersList(data.data);
        setFilteredCenters(data.data);
      })
      .catch((error) => {
        console.log("Error retrieving centers:", error);
      });
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    const filtered = centersList.filter((center) =>
      center.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCenters(filtered);
  };

  const handleBookSlots = (center) => {
    // Handle slot booking
  };

  const handleDeleteCenter = (centerId) => {
    // Handle center deletion
    const deleteobj = {
      _id: centerId,
    };
    VaccineDataServices.deleteCenter(deleteobj)
      .then((response) => {
        getCenters();
      })
      .catch((error) => {
        console.log("Error deleting center:", error);
      });
  };

  const handleLogout = () => {
    // Handle logout
    props.setUser({});
  };

  return (
    <div className="dashboard">
      <header>
        <h2>Admin Dashboard</h2>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>
      <div>
        <Link to="/admin/addnewcenter">
          <button className="add-new-center-button">Add New Center</button>
        </Link>
      </div>
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
            <p>Working Hours: {center.workinghours}</p>
            <Link to={"/admin/center/" + center._id} type="button">
              View Slots Booked
            </Link>
            <button
              className="delete-button"
              onClick={() => handleDeleteCenter(center._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
