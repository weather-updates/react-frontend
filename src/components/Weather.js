import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { fetchWeather } from '../features/weather/weather-slice.js'
import WeatherInfo from './WeatherInfo.js';

import './Weather.css';

const WeatherApp = () => {
    const weatherStatus = useSelector((state) => state.weather.status)
    const weatherData = useSelector((state) => state.weather.data)
    const dispatch = useDispatch()

    useEffect(
        () => {
            if (weatherStatus === 'idle') {
                dispatch(fetchWeather())
            }
        },
        [weatherStatus, dispatch]
    )

    let content
    if (weatherStatus === 'loading') {
        content = <div className="loading">Loading...</div>
    } else if (weatherStatus === 'succeeded') {
       content = <WeatherInfo weatherData={weatherData} />
    } else if (weatherStatus === 'failed') {
        content = <div className="error">{error}</div>
    }
    return (<div className="app">{content}</div>)
}

export default WeatherApp