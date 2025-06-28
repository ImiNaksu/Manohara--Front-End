import React, { useState, useEffect, useMemo } from "react";
import { jwtDecode } from "jwt-decode";
import "../../styles/Popup.css";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";

// Importing images
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

const MoodDetailPopUp = ({
  isOpen,
  onClose,
  selectedDate,
  moodData,
  onMoodUpdate,
}) => {
  const [sleepingHour, setSleepingHour] = useState("");
  const [power, setPower] = useState("");
  const [mood, setMood] = useState("");
  const [anxiety, setAnxiety] = useState("");
  const [irritability, setIrritability] = useState("");
  const [user, setUser] = useState(null);

  // Map image sources to their corresponding values
  const imageToValueMap = useMemo(
    () => ({
      sleepingHour: {
        [sl1]: "sl1",
        [sl2]: "sl2",
        [sl3]: "sl3",
        [sl4]: "sl4",
        [sl5]: "sl5",
        [sl6]: "sl6",
        [sl7]: "sl7",
        [sl8]: "sl8",
        [sl9]: "sl9",
        [sl10]: "sl10",
        [sl11]: "sl11",
        [sl12]: "sl12",
        [sl12Plus]: "sl12Plus",
      },
      power: {
        [pw0]: "pw0",
        [pw30]: "pw30",
        [pw50]: "pw50",
        [pw80]: "pw80",
        [pw100]: "pw100",
      },
      mood: {
        [amaizing]: "amaizing",
        [awful]: "awful",
        [bad]: "bad",
        [good]: "good",
        [notBad]: "notBad",
      },
      anxiety: {
        [anxiety0]: "anxiety0",
        [anxiety1]: "anxiety1",
        [anxiety2]: "anxiety2",
        [anxiety3]: "anxiety3",
        [anxiety4]: "anxiety4",
        [anxiety5]: "anxiety5",
      },
      irritability: {
        [irritability0]: "irritability0",
        [irritability1]: "irritability1",
        [irritability2]: "irritability2",
        [irritability3]: "irritability3",
        [irritability4]: "irritability4",
        [irritability5]: "irritability5",
      },
    }),
    []
  );

  const resetForm = () => {
    setSleepingHour("");
    setPower("");
    setMood("");
    setAnxiety("");
    setIrritability("");
  };

  // Set initial values if moodData exists
  useEffect(() => {
    if (moodData) {
      setSleepingHour(imageToValueMap.sleepingHour[moodData.sl] || "");
      setPower(imageToValueMap.power[moodData.pw] || "");
      setMood(imageToValueMap.mood[moodData.md] || "");
      setAnxiety(imageToValueMap.anxiety[moodData.anxiety] || "");
      setIrritability(
        imageToValueMap.irritability[moodData.irritability] || ""
      );
    } else {
      resetForm();
    }
  }, [moodData, imageToValueMap]);

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

  if (!isOpen) return null;

  const isFormComplete =
    sleepingHour && power && mood && anxiety && irritability;

  const addMoodData = async (data) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token not found");
      }

      const response = await fetch("http://localhost:5000/api/mood", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user.username,
          ...data,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add mood data");
      }

      const updatedMoodData = await response.json();

      // If parent component provided an update callback
      if (onMoodUpdate && typeof onMoodUpdate === "function") {
        onMoodUpdate(updatedMoodData);
      }

      return updatedMoodData;
    } catch (error) {
      console.error("Error adding mood data:", error);
      throw error;
    }
  };

  const handleSubmit = () => {
    if (isFormComplete) {
      const formattedDate = selectedDate
        ? selectedDate.toLocaleDateString("en-CA")
        : "";

      const formData = {
        sleepingHour,
        power,
        mood,
        anxiety,
        irritability,
        date: formattedDate,
      };

      addMoodData(formData);
      resetForm();
      onClose();
      window.location.reload();
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const renderOption = (imageSrc, label, valueSetter, value) => (
    <MenuItem value={value} onClick={() => valueSetter(value)}>
      <img src={imageSrc} alt={label} className="dropdown-image" />
      {label}
    </MenuItem>
  );

  return (
    <div className="fixed" onClick={handleClose}>
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        <div className="close-button-container">
          <button className="close-button" onClick={handleClose}>
            ×
          </button>
        </div>

        <div className="flex flex-col items-center">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">
            {selectedDate?.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h3>

          <form className="modal-form">
            <FormControl fullWidth required error={!sleepingHour}>
              <InputLabel>Sleeping Hours *</InputLabel>
              <Select
                value={sleepingHour}
                onChange={(e) => setSleepingHour(e.target.value)}
                label="Sleeping Hours *"
                required
                MenuProps={{ style: { zIndex: 9999 } }}
              >
                {renderOption(sl1, "1 Hour", setSleepingHour, "sl1")}
                {renderOption(sl2, "2 Hours", setSleepingHour, "sl2")}
                {renderOption(sl3, "3 Hours", setSleepingHour, "sl3")}
                {renderOption(sl4, "4 Hours", setSleepingHour, "sl4")}
                {renderOption(sl5, "5 Hours", setSleepingHour, "sl5")}
                {renderOption(sl6, "6 Hours", setSleepingHour, "sl6")}
                {renderOption(sl7, "7 Hours", setSleepingHour, "sl7")}
                {renderOption(sl8, "8 Hours", setSleepingHour, "sl8")}
                {renderOption(sl9, "9 Hours", setSleepingHour, "sl9")}
                {renderOption(sl10, "10 Hours", setSleepingHour, "sl10")}
                {renderOption(sl11, "11 Hours", setSleepingHour, "sl11")}
                {renderOption(sl12, "12 Hours", setSleepingHour, "sl12")}
                {renderOption(
                  sl12Plus,
                  "12+ Hours",
                  setSleepingHour,
                  "sl12Plus"
                )}
              </Select>
            </FormControl>

            <FormControl fullWidth required error={!power}>
              <InputLabel>Power *</InputLabel>
              <Select
                value={power}
                onChange={(e) => setPower(e.target.value)}
                label="Power *"
                required
                MenuProps={{ style: { zIndex: 9999 } }}
              >
                {renderOption(pw0, "0% Power", setPower, "pw0")}
                {renderOption(pw30, "30% Power", setPower, "pw30")}
                {renderOption(pw50, "50% Power", setPower, "pw50")}
                {renderOption(pw80, "80% Power", setPower, "pw80")}
                {renderOption(pw100, "100% Power", setPower, "pw100")}
              </Select>
            </FormControl>

            <FormControl fullWidth required error={!mood}>
              <InputLabel>Mood *</InputLabel>
              <Select
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                label="Mood *"
                required
                MenuProps={{ style: { zIndex: 9999 } }}
              >
                {renderOption(amaizing, "Amazing", setMood, "amaizing")}
                {renderOption(awful, "Awful", setMood, "awful")}
                {renderOption(bad, "Bad", setMood, "bad")}
                {renderOption(good, "Good", setMood, "good")}
                {renderOption(notBad, "Not Bad", setMood, "notBad")}
              </Select>
            </FormControl>

            <FormControl fullWidth required error={!anxiety}>
              <InputLabel>Anxiety Level *</InputLabel>
              <Select
                value={anxiety}
                onChange={(e) => setAnxiety(e.target.value)}
                label="Anxiety Level *"
                required
                MenuProps={{ style: { zIndex: 9999 } }}
              >
                {renderOption(anxiety0, "Level 0", setAnxiety, "anxiety0")}
                {renderOption(anxiety1, "Level 1", setAnxiety, "anxiety1")}
                {renderOption(anxiety2, "Level 2", setAnxiety, "anxiety2")}
                {renderOption(anxiety3, "Level 3", setAnxiety, "anxiety3")}
                {renderOption(anxiety4, "Level 4", setAnxiety, "anxiety4")}
                {renderOption(anxiety5, "Level 5", setAnxiety, "anxiety5")}
              </Select>
            </FormControl>

            <FormControl fullWidth required error={!irritability}>
              <InputLabel>Irritability Level *</InputLabel>
              <Select
                value={irritability}
                onChange={(e) => setIrritability(e.target.value)}
                label="Irritability Level *"
                required
                MenuProps={{ style: { zIndex: 9999 } }}
              >
                {renderOption(
                  irritability0,
                  "Level 0",
                  setIrritability,
                  "irritability0"
                )}
                {renderOption(
                  irritability1,
                  "Level 1",
                  setIrritability,
                  "irritability1"
                )}
                {renderOption(
                  irritability2,
                  "Level 2",
                  setIrritability,
                  "irritability2"
                )}
                {renderOption(
                  irritability3,
                  "Level 3",
                  setIrritability,
                  "irritability3"
                )}
                {renderOption(
                  irritability4,
                  "Level 4",
                  setIrritability,
                  "irritability4"
                )}
                {renderOption(
                  irritability5,
                  "Level 5",
                  setIrritability,
                  "irritability5"
                )}
              </Select>
            </FormControl>

            <div className="submit-button-container">
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={!isFormComplete}
                className="px-6 py-2"
                sx={{ borderRadius: "8px" }}
              >
                {moodData ? "Update" : "Add"}{" "}
                {/* Change button text based on action */}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MoodDetailPopUp;
