import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages";
import Example from "./pages/backup";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/backup" element={<Example />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
