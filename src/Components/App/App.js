import './App.css';
import React, { useState } from 'react';
import LocationSearchInput from '../LocationSearchInput/LocationSearchInput.js'
import ResultGroup from '../ResultGroup/ResultGroup';
import Result from '../Result/Result';
import weatherApiCall from '../../util/Weather'

const App = () => {
const [weatherCard, setWeatherCard] = useState([]);
const [weatherApi, setWeatherApi] = useState(null);


const handleSubmit = async (lat, lng) => {
  console.log(lat, lng);
  const apiCall =  await weatherApiCall(lat, lng);
  setWeatherApi(apiCall);
}

const addWeatherCard = (card) => {
    setWeatherCard((prev) => [
        ...prev,
        card
    ])
    console.log(weatherCard);
}

const removeWeatherCard = (cardToRemove) => {
    setWeatherCard((prev) => prev.filter((card)=> card.id !== cardToRemove.id));
}

  return (
    <div className="App">
        <LocationSearchInput handleSubmit={handleSubmit} />
        {weatherApi && <Result weather={weatherApi} isRemoval={false} onAdd={addWeatherCard} />}   {/* searchResult */}
        {weatherCard.length>0 && <ResultGroup weatherCards={weatherCard} isRemoval={true} onRemove={removeWeatherCard} />}
    </div>
  );
}

export default App;
