import { ThemeProvider, createTheme } from "@mui/material";
import RootLayout from "./components/Layouts/RootLayout";
import LandingPage from "./components/pages/LandingPage";
import ToasterProvider from "./contexts/ToasterProvider";

const theme = createTheme({
  palette: {
    primary: {
      main: "#101418",
    },
    secondary: {
      main: "#101418dd",
    },
  },
  typography: {
    allVariants: {
      color: "#FFF",
    },
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <ToasterProvider>
        <RootLayout>
          <LandingPage />
        </RootLayout>
      </ToasterProvider>
    </ThemeProvider>
  );
}

export default App;
