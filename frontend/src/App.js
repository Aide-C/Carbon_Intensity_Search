import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./Home";
import Result from "./Results";

function App() {
  return(
      <BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />}/>
					<Route path="/results" element={<Result />}/>
        </Routes>
			</BrowserRouter>
  );
}

export default App;

