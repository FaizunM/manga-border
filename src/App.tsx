import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/home-page";
import { ModalContextProvider } from "./contexts/modal-context";

function App() {
  return (
    <ModalContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </ModalContextProvider>
  );
}

export default App;
