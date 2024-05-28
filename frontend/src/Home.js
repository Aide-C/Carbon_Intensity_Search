import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Home() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!latitude || !longitude) return;
    navigate('/results', { state: { longitude, latitude } });
  };

  return (
    <div className="App">
      <h1>Find Local Carbon Intensity and Power Report</h1>
      <h2>Please provide the latitude and longitude of the location you want to research by google it.</h2>
      <form className='inputForm' onSubmit={handleSubmit}>
        <div>
          <label>Latitude: </label>
          <input
            type='text'
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Longitude: </label>
          <input
            type='text'
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            required
          />
        </div>

        <div><button type='submit'>Submit</button></div>
      </form>
    </div>
  );
}

export default Home;
