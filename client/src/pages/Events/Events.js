import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Events.css";

const Events = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selection, setSelection] = useState({
    duration: "7days",
    event: "birthdays",
  });

  const handleSelectionChange = (e) => {
    setSelection({
      ...selection,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      console.log(localStorage.getItem('user_id'))
      try {
        const response = await axios.get(
          `http://localhost:4000/api/${selection.event}/${selection.duration}`
        );
        setData(response.data);
        setError(null); // Clear any previous errors
      } catch (e) {
        console.error("Nothing to show: ", e);
        setError("Please select options from above"); // Set the error message
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selection]);

  const handleClick = (index) => {
    const updatedData = [...data];
    updatedData[index].expanded = !updatedData[index].expanded;
    setData(updatedData);
  };

  return (
    <div className="events-container">
      <div className="select-duration">
        <select
          value={selection.duration}
          name="duration"
          onChange={handleSelectionChange}
        >
          <option value="">Select Duration</option>
          <option value="7days">7 days</option>
          <option value="14days">14 days</option>
          <option value="1month">1 month</option>
          <option value="6month">6 months</option>
        </select>
      </div>
      <br />
      <div className="select-event">
        <select
          value={selection.event}
          name="event"
          onChange={handleSelectionChange}
        >
          <option value="">Select Event</option>
          <option value="birthdays">Birthdays</option>
          <option value="anniversaries">Anniversaries</option>
        </select>
      </div>
      {error ? (
        <p className="error-message">{error}</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <div className="data-card">
          {data.map((item, index) => (
            <div
              className={`card ${item.expanded ? "expanded" : ""}`}
              key={item._id}
              onClick={() => handleClick(index)}
            >
              <div className="card-content">
                <p className="employee-name">{item.employeeName}</p>
                {selection.event==="birthdays"&&<p className="employee-dob">Birth Date: {item.dateOfBirth.slice(0, 10)}</p>}
                {selection.event==="anniversaries"&&<p className="employee-dob">Joining Date: {item.dateOfJoining.slice(0, 10)}</p>}
                {item.expanded && (
                  <div>
                    <p className="employee-email">Email: {item.employeeEmail}</p>
                    <p className="employee-favourite-colour">Favorite Colour: {item.favouriteColour}</p>
                    <p className="employee-favourite-food">Favorite Food: {item.favouriteFood}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;