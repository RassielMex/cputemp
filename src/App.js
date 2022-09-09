import { Container } from "@mui/material";
import "./App.css";
import TempGraph from "./components/TempGraph/TempGraph";
import RamGraph from "./components/RamGraph/RamGraph";
import CoreGraph from "./components/CoreGraph/CoreGraph";

function App() {
  return (
    <Container sx={{ marginTop: "3rem" }}>
      <h1>Test</h1>
      <CoreGraph />
      <TempGraph />
      <RamGraph />
    </Container>
  );
}

export default App;
