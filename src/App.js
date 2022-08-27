import { Container } from "@mui/material";
import "./App.css";
import TempGraph from "./components/TempGraph/TempGraph";
import RamGraph from "./components/RamGraph/RamGraph";

function App() {
  return (
    <Container sx={{ marginTop: "3rem" }}>
      <TempGraph />
      <RamGraph />
    </Container>
  );
}

export default App;
