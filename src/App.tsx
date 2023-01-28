import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material/styles";
import "./App.scss";
import ResponsiveAppBar from "./components/ResponsiveAppBar/ResponsiveAppBar";

let theme = createTheme({
  typography: {
    fontFamily: ["Nunito", "Roboto", '"Helvetica Neue"', "Arial", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "#304ffe",
    },
    secondary: {
      main: "#9EB7E5",
    },
    info: {
      main: "#00A6FB",
    },
  },
});

theme = responsiveFontSizes(theme);

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <ResponsiveAppBar />
      </ThemeProvider>
    </div>
  );
}

export default App;
