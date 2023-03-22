import React, { useState } from 'react';
import './Result.css'
import humidityIcon from '../../icons/humidity.svg';

const Result = (props) => {
    const renderAction = () => {
        return (
            props.isRemoval ? 
            <div className="weatherCard__action" onClick={removeCard}>-</div> : 
            <div  className="weatherCard__action" onClick={addCard}>+</div>)
    }

    const addCard = () => {
        props.onAdd(props.weather);
    }

    const removeCard = () => {
        props.onRemove(props.weather);
    }

    return(
        <div className="weatherForm">
            <div className="weatherCard">
                <div className="place">{props.weather.city} ({props.weather.country})</div>
                <img src={props.weather.icon} />
                <div>{props.weather.state}. {props.weather.wind}.</div>
                <div>{props.weather.temp} &#8451;</div>
                <div>{props.weather.min_temp} ... {props.weather.max_temp} &#8451;</div>
                <div className="humidity"><img className="humidityIcon" src={humidityIcon} /> {props.weather.humidity}%</div>
                <div>{props.weather.pressure} mm hg</div>
                <div>{props.weather.visibility}km</div>
            </div> 
            {renderAction()}
        </div>
    );
}

export default Result;