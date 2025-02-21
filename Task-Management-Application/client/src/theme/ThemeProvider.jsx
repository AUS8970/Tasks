import { useState, useEffect } from "react";
import ThemeContext from "./ThemeContext";
import { themeChange } from "theme-change";

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState( localStorage.getItem("theme") || "light" );

  useEffect(() => {
    themeChange(false);
    document.body.setAttribute("data-theme", theme); // Add the theme as a data attribute to `body`
    localStorage.setItem("theme", theme); // Save the theme preference in local storage
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "black" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;