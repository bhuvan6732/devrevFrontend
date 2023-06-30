import React, { useEffect, useState } from 'react';
import './AdminCenter.css'; // Import the CSS file
import VaccineDataServices from './services/vaccines';
import { Link, useParams } from 'react-router-dom';
const Center = (props) => {
  const params = useParams();

  const [centerData, setCenterData] = useState({});
  const [existingSlots, setExistingSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [showButton, setShowButton] = useState(false);

  function getcenterData() {
    VaccineDataServices.get(params.id).then((data) => {
      setCenterData(data.data);
    });
  }
  useEffect(getcenterData, []);

  function getAvailableSlots(obj) {
    VaccineDataServices.getSlots(obj).then((data) => {
      const existingSlots1 = data.data.map(
        (item) => item.time + ' Is booked by ' + item.userid
      );
      setExistingSlots(existingSlots1);
    });
  }

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setShowButton(true);
  };
  const handleButtonClicked = () => {
    const obj = {
      centerid: params.id,
      date: selectedDate,
    };
    getAvailableSlots(obj);
  };
  const handleLogout = () => {
    props.setUser({});
  };

  return (
    <div className="center">
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      <Link to="/" className="home-button">
        Home
      </Link>
      <h2 className="center__title">Vaccine Slot Booking</h2>
      <br></br>
      <h3 className="center__location">Name: {centerData.name}</h3>
      <h5 className="center__location">City: {centerData.city}</h5>
      <p className="center__working-hours">
        Working Hours: {centerData.workinghours}
      </p>
      <div className="date-picker">
        <label htmlFor="date" className="date-picker__label">
          Select a Date for check available slots:
        </label>
        <input
          type="date"
          id="date"
          className="date-picker__input"
          value={selectedDate}
          onChange={handleDateChange}
          min={new Date().toISOString().split('T')[0]} // Set minimum date as today
        />
      </div>
      {showButton && (
        <button onClick={handleButtonClicked} className="find-slot-button">
          Find Slot
        </button>
      )}
      <div className="slots-container">
        {selectedDate && (
          <>
            <h4 className="slots-container__heading">Booked Slots:</h4>
            {existingSlots.map((time, index) => {
              return (
                <div key={index} className="slot ">
                  {time}
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default Center;
