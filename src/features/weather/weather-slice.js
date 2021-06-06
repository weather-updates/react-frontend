import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Axios from 'axios';

const initialState = {
    status: 'idle',
    error: null,
    date: null,
}

export const fetchWeather = createAsyncThunk('weather/get', async () => {
    const URL = 'http://api.openweathermap.org/data/2.5/forecast?q=Munich,de&APPID=75f972b80e26f14fe6c920aa6a85ad57&cnt=40&units=imperial'
    const response = await Axios.get(URL)
    return response.data.list
})

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {},
    extraReducers : builder => {
        builder
            .addCase(fetchWeather.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchWeather.fulfilled, (state, action) => {
                const weather = {}
                action.payload.forEach((weatherStat, i) => {
                    const dateAndTime = weatherStat.dt_txt.split(" ");
                    weather[dateAndTime[0]] = {
                        ...weather[dateAndTime[0]],
                        [dateAndTime[1]] : {
                            'fahrenheit': weatherStat.main.temp,
                            'celsius': (weatherStat.main.temp -32)/1.800,
                        }
                    };
                });
                Object.keys(weather).forEach((forecastForADay) => {
                    const singleDayTemps = Object.values(weather[forecastForADay])
                    const singleDayTempsIntervals = singleDayTemps.length;
                    const singleDayAvgTemp = singleDayTemps.reduce((acc, curr) => {
                        return {fahrenheit: acc.fahrenheit + curr.fahrenheit, celsius: acc.celsius + curr.celsius}
                    }, {fahrenheit: 0, celsius: 0});
                    weather[forecastForADay] = {
                        ...weather[forecastForADay],
                        avg: {fahrenheit : singleDayAvgTemp.fahrenheit/singleDayTempsIntervals, celsius: singleDayAvgTemp.celsius/singleDayTempsIntervals}
                    }
                })
                state.data = weather;
                state.status = 'succeeded'
            })
    }
})

export const {getWeather } = weatherSlice.actions;
export default weatherSlice.reducer;