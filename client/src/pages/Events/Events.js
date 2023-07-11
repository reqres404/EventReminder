import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Events.css";

const Events = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [urls, setUrls] = useState([]);

  const [selection, setSelection] = useState({
    duration: "7days",
    event: "birthdays",
  });
  const [favColor, setFavColor] = useState(null);

  const handleSelectionChange = (e) => {
    setSelection({
      ...selection,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

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

  useEffect(() => {
    const fetchGifts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/gift/", {
          params: {
            color: favColor,
          },
        });

        const url = await response.data;
        setUrls(url);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGifts();
  }, [favColor]);

  const handleClick = (index, e) => {
    const isGetGiftsButtonClicked =
      e.target.classList.contains("get-gifts-button");
    const isProductsLinkClicked = e.target.closest(".products");
    if (isGetGiftsButtonClicked || isProductsLinkClicked) {
      e.stopPropagation(); // Prevent card collapse when Get Gifts button is clicked
    } else {
      const updatedData = [...data];
      updatedData[index].expanded = !updatedData[index].expanded;
      setData(updatedData);
    }
  };

  const calculateYearsOfService = (dateOfJoining) => {
    const joiningDate = new Date(dateOfJoining);
    const currentDate = new Date();
    const diffInMilliseconds = Math.abs(currentDate - joiningDate);
    const yearsOfService = Math.floor(
      diffInMilliseconds / (1000 * 60 * 60 * 24 * 365)
    );
    return yearsOfService;
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
              onClick={(e) => handleClick(index, e)}
            >
              <div className="card-content">
                <p className="employee-name">{item.employeeName}</p>
                {selection.event === "birthdays" && (
                  <p className="employee-dob">
                    Birth Date:{`${item.dateOfBirth.slice(8, 10)}-${item.dateOfBirth.slice(5, 7)}`}
                  </p>
                )}
                {selection.event === "anniversaries" && (
                  <>
                    <p className="employee-dob">
                      Joining Date:{`${item.dateOfJoining.slice(8, 10)}-${item.dateOfJoining.slice(5, 7)}`}
                    </p>
                    <p className="employee-years-of-service">
                      Years of Service:{" "}
                      {calculateYearsOfService(item.dateOfJoining)}
                    </p>
                  </>
                )}
                {item.expanded && (
                  <div>
                    <p className="employee-email">
                      Email: {item.employeeEmail}
                    </p>
                    <p className="employee-favourite-colour">
                      Favorite Colour: {item.favouriteColour}
                    </p>
                    <p className="employee-favourite-food">
                      Favorite Food: {item.favouriteFood}
                    </p>
                    <p className="employee-favourite-food">
                      Place of Interest: {item.placeOfInterest}
                    </p>
                    <button
                      className="get-gifts-button"
                      onClick={() => setFavColor(item.favouriteColour)}
                    >
                      Get Gifts
                    </button>

                    {urls.url1 != undefined && (
                      <div className="products">
                        <a
                          href={urls.url1}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Product1
                        </a>
                        <a
                          href={urls.url2}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Product2
                        </a>
                        <a
                          href={urls.url3}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Product3
                        </a>
                      </div>
                    )}
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