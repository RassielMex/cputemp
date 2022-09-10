import { Container, Typography, useMediaQuery, useTheme } from "@mui/material";
import "./App.css";
import TempGraph from "./components/TempGraph/TempGraph";
import RamGraph from "./components/RamGraph/RamGraph";
import CoreGraph from "./components/CoreGraph/CoreGraph";

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Container sx={{ marginTop: "3rem" }}>
      <Typography variant={isMobile ? "h3" : "h2"} textAlign={"center"}>
        Cpu monitor
      </Typography>
      <CoreGraph />
      <TempGraph />
      <RamGraph />
    </Container>
  );
}

export default App;
