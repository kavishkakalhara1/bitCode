import { Button, Label, Select } from "flowbite-react";
import React, { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";

export default function DashSettings() {
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const [selectedTheme, setSelectedTheme] = useState(theme); // Assuming 'theme' is the current theme from your state management

  const handleThemeChange = (e) => {
    setSelectedTheme(e.target.value);
  };

  const updateSettings = (e) => {
    e.preventDefault(); // Prevent form submission
    if (selectedTheme !== theme) {
      dispatch(toggleTheme()); // Assuming toggleTheme correctly switches between light and dark
    }
  };
  return (
    <div className="w-full max-w-lg p-3 mx-auto mb-20">
      <h1 className="text-3xl font-semibold text-center my-7">Settings</h1>

      <form
        onSubmit={""}
        className="flex flex-col gap-4 p-10 border-b-4 shadow-xl rounded-xl border-refaa-red"
      >
        <div className="flex items-center justify-between gap-4">
          <Label htmlFor="batch">Prefered Theme:</Label>
          <Select
            id="batch"
            onChange={handleThemeChange}
            defaultValue={"Light"}
            value={selectedTheme}
            style={{ color: "rgba(0, 0, 0, 0.8)", overflow: "auto" }}
            className="dark:text-white"
          >
            <option disabled value={"Your Batch"}>
              Prefered Theme
            </option>
            <option value="light" >Light</option>
            <option value="dark">Dark</option>
          </Select>
        </div>

        <hr />

        
        <Button
          type="button"
          onClick={updateSettings}
          className="cursor-pointer bg-refaa-red hover:bg-refaa-blue ring-0 focus:ring-transparent hover:shadow-2xl"
        >
          Update Settings
        </Button>
      </form>
    </div>
  );
}
