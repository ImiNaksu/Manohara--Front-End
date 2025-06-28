import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../styles/Calender.css";
import MoodDetailPopUp from "./Popup";
import Header from "../Header";
import { jwtDecode } from "jwt-decode";

// Images
import pw0 from "../../img/power/Power=0%.png";
import pw30 from "../../img/power/Power=30%.png";
import pw50 from "../../img/power/Power=50%.png";
import pw80 from "../../img/power/Power=80%.png";
import pw100 from "../../img/power/Power=100%.png";

import amaizing from "../../img/moods/amazing.png";
import awful from "../../img/moods/awful.png";
import bad from "../../img/moods/bad.png";
import good from "../../img/moods/good.png";
import notBad from "../../img/moods/notBad.png";

import anxiety0 from "../../img/anxiety/anxietyLevel=0.png";
import anxiety1 from "../../img/anxiety/anxietyLevel=1.png";
import anxiety2 from "../../img/anxiety/anxietyLevel=2.png";
import anxiety3 from "../../img/anxiety/anxietyLevel=3.png";
import anxiety4 from "../../img/anxiety/anxietyLevel=4.png";
import anxiety5 from "../../img/anxiety/anxietyLevel=5.png";

import irritability0 from "../../img/irritability/irritabilityLevel=0.png";
import irritability1 from "../../img/irritability/irritabilityLevel=1.png";
import irritability2 from "../../img/irritability/irritabilityLevel=2.png";
import irritability3 from "../../img/irritability/irritabilityLevel=3.png";
import irritability4 from "../../img/irritability/irritabilityLevel=4.png";
import irritability5 from "../../img/irritability/irritabilityLevel=5.png";

import sl1 from "../../img/sleepingHours/sl=1.png";
import sl2 from "../../img/sleepingHours/sl=2.png";
import sl3 from "../../img/sleepingHours/sl=3.png";
import sl4 from "../../img/sleepingHours/sl=4.png";
import sl5 from "../../img/sleepingHours/sl=5.png";
import sl6 from "../../img/sleepingHours/sl=6.png";
import sl7 from "../../img/sleepingHours/sl=7.png";
import sl8 from "../../img/sleepingHours/sl=8.png";
import sl9 from "../../img/sleepingHours/sl=9.png";
import sl10 from "../../img/sleepingHours/sl=10.png";
import sl11 from "../../img/sleepingHours/sl=11.png";
import sl12 from "../../img/sleepingHours/sl=12.png";
import sl12Plus from "../../img/sleepingHours/sl=12+.png";

const MoodCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMoodData, setSelectedMoodData] = useState(null);
  const [moodData, setMoodData] = useState({});
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUser(decodedToken);
      } catch (error) {
        console.error("Error decoding token:", error);
        setUser(null);
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      populateMoodData(); // Call the function to fetch and set the mood data when user is available
    }
  }, [user]); // Only run when user is available

  const populateMoodData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/mood?username=${user.username}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();

      const formattedData = data.reduce((acc, item) => {
        const dateKey = new Date(item.date).toLocaleDateString("en-CA");
        acc[dateKey] = {
          sl: getSleepImage(item.mood[0]),
          pw: getPowerImage(item.mood[1]),
          md: getMoodImage(item.mood[2]),
          anxiety: getAnxietyImage(item.mood[3]),
          irritability: getIrritabilityImage(item.mood[4]),
        };
        return acc;
      }, {});

      setMoodData(formattedData); // Set the fetched and formatted data to moodData state
    } catch (error) {
      console.error("Error fetching mood data:", error);
    }
  };

  const getSleepImage = (value) => {
    if (value === "sl1") return sl1;
    if (value === "sl2") return sl2;
    if (value === "sl3") return sl3;
    if (value === "sl4") return sl4;
    if (value === "sl5") return sl5;
    if (value === "sl6") return sl6;
    if (value === "sl7") return sl7;
    if (value === "sl8") return sl8;
    if (value === "sl9") return sl9;
    if (value === "sl10") return sl10;
    if (value === "sl11") return sl11;
    if (value === "sl12") return sl12;
    if (value === "sl12Plus") return sl12Plus;
  };

  const getPowerImage = (value) => {
    if (value === "pw0") return pw0;
    if (value === "pw30") return pw30;
    if (value === "pw50") return pw50;
    if (value === "pw80") return pw80;
    if (value === "pw100") return pw100;
  };

  const getMoodImage = (value) => {
    if (value === "amaizing") return amaizing;
    if (value === "awful") return awful;
    if (value === "bad") return bad;
    if (value === "good") return good;
    if (value === "notBad") return notBad;
  };

  const getAnxietyImage = (value) => {
    if (value === "anxiety0") return anxiety0;
    if (value === "anxiety1") return anxiety1;
    if (value === "anxiety2") return anxiety2;
    if (value === "anxiety3") return anxiety3;
    if (value === "anxiety4") return anxiety4;
    if (value === "anxiety5") return anxiety5;
  };

  const getIrritabilityImage = (value) => {
    if (value === "irritability0") return irritability0;
    if (value === "irritability1") return irritability1;
    if (value === "irritability2") return irritability2;
    if (value === "irritability3") return irritability3;
    if (value === "irritability4") return irritability4;
    if (value === "irritability5") return irritability5;
  };

  const tileContent = ({ date }) => {
    const formattedDate = date.toLocaleDateString("en-CA");
    const hasData = moodData[formattedDate];
    const today = new Date().toLocaleDateString("en-CA");

    return (
      <div
        className={`tile-wrapper ${
          !hasData ? "react-calendar__tile--empty" : ""
        }`}
      >
        <abbr title={formattedDate}>{date.getDate()}</abbr>

        <div className="day-card">
          {hasData ? (
            <div className="day-content">
              <table>
                <thead>
                  <tr>
                    <th>SL</th>
                    <th>PW</th>
                    <th>MD</th>
                    <th>Anx</th>
                    <th>Irr</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="sl">
                      <img
                        src={hasData.sl}
                        alt="Sleep"
                        className="sleep-image"
                      />
                    </td>
                    <td className="pw">
                      <img src={hasData.pw} alt="Mood" className="mood-image" />
                    </td>
                    <td className="md">
                      <img
                        src={hasData.md}
                        alt="Power Level"
                        className="power-image"
                      />
                    </td>
                    <td className="anxiety">
                      <img
                        src={hasData.anxiety}
                        alt="Anxiety Level"
                        className="anxiety-image"
                      />
                    </td>
                    <td className="irritability">
                      <img
                        src={hasData.irritability}
                        alt="Irritability Level"
                        className="irritability-image"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            formattedDate === today && (
              <div className="add-mood-label">
                <span>+ Add Mood</span>
              </div>
            )
          )}
        </div>
      </div>
    );
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const today = new Date();
      const isCurrentDate =
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();

      const isNonCurrentMonth = date.getMonth() !== activeStartDate.getMonth();

      if (isNonCurrentMonth) {
        return "non-current-month";
      }
      return isCurrentDate ? "current-date-tile" : "";
    }
    return "";
  };

  const handleTileClick = (date) => {
    const formattedDate = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    const todayDate = new Date();
    const today = `${todayDate.getFullYear()}-${String(
      todayDate.getMonth() + 1
    ).padStart(2, "0")}-${String(todayDate.getDate()).padStart(2, "0")}`;

    if (formattedDate === today) {
      setSelectedDate(date);
      // Check if there's existing mood data for today
      const existingData = moodData[formattedDate] || null;
      setSelectedMoodData(existingData);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="calendar-page">
      <Header />
      <div className="mood-calendar">
        <Calendar
          onChange={setDate}
          value={date}
          tileContent={tileContent}
          tileClassName={tileClassName}
          onActiveStartDateChange={({ activeStartDate }) =>
            setActiveStartDate(activeStartDate)
          }
          onClickDay={handleTileClick}
          minDetail="month"
          maxDetail="month"
          showFixedNumberOfWeeks={true}
        />
        <MoodDetailPopUp
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedDate={selectedDate}
          moodData={selectedMoodData} // Pass the mood data
        />
      </div>
    </div>
  );
};

export default MoodCalendar;
