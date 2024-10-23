import "./App.css";
import Heroes from "./Heroes/Heroes";
import Header from "./Header/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <h1>Star Wars Graph</h1>
      <Heroes></Heroes>
    </div>
  );
}

export default App;
