import React, { useEffect, useState } from 'react';
import './Center.css'; // Import the CSS file
import VaccineDataServices from './services/vaccines';
import { Link, useParams } from 'react-router-dom';
const Center = (props) => {
  const params = useParams();
  const allSlots = Array.from({ length: 9 }, (_, index) => {
    const hour = index + 10;
    const time = `${hour.toString().padStart(2, '0')}:00 ${
      hour < 12 ? 'AM' : 'PM'
    }`;
    return time;
  });

  const [centerData, setCenterData] = useState({});
  const [availableSlots, setAvailableSlots] = useState([]);
  function getcenterData() {
    VaccineDataServices.get(params.id).then((data) => {
      setCenterData(data.data);
    });
  }
  useEffect(getcenterData, []);
  function getAvailableSlots(obj) {
    VaccineDataServices.getSlots(obj).then((data) => {
      const existingSlots = data.data.map((item) => item.time);
      const newarr = allSlots.filter((slot) => !existingSlots.includes(slot));
      setAvailableSlots(newarr);
    });
  }

  const handleSlotBooking = (date, time) => {
    const confirmed = window.confirm(
      `Do you want to book the slot ${date} ${time}?`
    );
    if (confirmed) {
      const newslot = {
        userid: props.user._id,
        center: params.id,
        date: date,
        time: time,
      };

      VaccineDataServices.addSlots(newslot).then((data) => {
        const obj = {
          centerid: params.id,
          date: selectedDate,
        };
        getAvailableSlots(obj);
      });
    }
  };

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showButton, setShowButton] = useState(false);
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setShowButton(true);
    setSelectedSlot(null);
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
          min={new Date().toISOString().split('T')[0]}
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
            <h4 className="slots-container__heading">Available Slots:</h4>
            {availableSlots.map((time, index) => {
              const isSelected =
                selectedSlot &&
                selectedSlot.date === selectedDate &&
                selectedSlot.time === time;
              return (
                <button
                  key={index}
                  className={`slot ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSlotBooking(selectedDate, time)}
                  disabled={isSelected}
                >
                  {time}
                </button>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default Center;
