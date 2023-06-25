import React, { useState } from "react";
import "./AddNewCenter.css"; // Import the CSS file
import VaccineDataServices from "./services/vaccines";
import { Link } from "react-router-dom";

const AddNewCenter = (props) => {
  const [centerData, setCenterData] = useState({
    name: "",
    contact: "",
    city: "",
    area: "",
    numberofvaccine: "",
    workinghours: "",
  });
  const [formError, setFormError] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCenterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddCenter = () => {
    // Check if all fields are filled
    if (
      !centerData.name ||
      !centerData.contact ||
      !centerData.city ||
      !centerData.area ||
      !centerData.numberofvaccine ||
      !centerData.workinghours
    ) {
      setFormError("All fields are required");
      return;
    }

    // Check if number of vaccines is greater than zero
    if (parseInt(centerData.numberofvaccine) <= 0) {
      setFormError("Number of vaccines should be greater than zero");
      return;
    }

    // Handle add center logic
    const addcenterobj = {
      center: {
        name: centerData.name,
        contact: centerData.contact,
        city: centerData.city,
        area: centerData.area,
        numberofvaccine: centerData.numberofvaccine,
        adminid: props.user._id,
        workinghours: centerData.workinghours,
      },
    };
    VaccineDataServices.addCenter(addcenterobj).then((data) => {
      setCenterData({
        name: "",
        contact: "",
        city: "",
        area: "",
        numberofvaccine: "",
        workinghours: "",
      });
      setFormError("");
    });
    // Reset form fields
  };

  return (
    <div className="add-new-center">
      <h2>Add New Center</h2>
      <div className="form-field">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={centerData.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-field">
        <label>Contact:</label>
        <input
          type="text"
          name="contact"
          value={centerData.contact}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-field">
        <label>City:</label>
        <input
          type="text"
          name="city"
          value={centerData.city}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-field">
        <label>Area:</label>
        <input
          type="text"
          name="area"
          value={centerData.area}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-field">
        <label>Number of Vaccines:</label>
        <input
          type="number"
          name="numberofvaccine"
          value={centerData.numberofvaccine}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-field">
        <label>Working Hours:</label>
        <input
          type="text"
          name="workinghours"
          value={centerData.workinghours}
          onChange={handleInputChange}
        />
      </div>
      <p className="form-error">{formError}</p>
      <button className="add-button" onClick={handleAddCenter}>
        Add
      </button>
      <Link to="/">
        <button className="add-new-center-button">Admin Dashboard</button>
      </Link>
    </div>
  );
};

export default AddNewCenter;
