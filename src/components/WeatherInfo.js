import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    BarSeries,
    ArgumentAxis,
    ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';

import { withStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

import './WeatherInfo.css';

const TemperatureFormControl = withStyles({
    root: {
        width : '100%'
    },
})((props) => <FormControl {...props} />)

const TemperatureScaleRadioGroup = withStyles({
    root: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
})((props) => <RadioGroup  {...props} />);

const TemperatureScaleRadio = withStyles({
    root: {
        '&$checked': {
            color: blue[600],
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);

const TemperatureChart = withStyles({
    root: {
        height: '15rem !important'
    },
})((props) => <Chart {...props}/>);

const WeatherInfo = ({weatherData}) => {
    const [temperatureScale, setTemperatureScale] = React.useState('fahrenheit');
    const [startDay, setStartDay] = React.useState(0);
    const [currentSelectedDateTemperature, setCurrentSelectedDateTemperature] = React.useState(null);

    const handleChange = (event) => {
        setTemperatureScale(event.target.value);
    };

    const forwardArrowClick = () => {
        setStartDay(startDay+1)
    }

    const backArrowClick = () => {
        setStartDay(startDay-1);
    }

    const boxClick = (date) => {
        const selectedDayTempeature =  Object.keys(weatherData[date]).map((time) => {
            if(time === 'avg') return {}
            const temperature = weatherData[date][time][temperatureScale === 'fahrenheit' ? 'fahrenheit' : 'celsius']
            return {
                time,
                temperature
            }
        })
        setCurrentSelectedDateTemperature(selectedDayTempeature)
    }
    return (
        <div className="weather-info">
            <div className="temperature-scale">
                <TemperatureFormControl component="fieldset" >
                    <TemperatureScaleRadioGroup aria-label="temperature-scale" name="temperature-scale" value={temperatureScale} onChange={handleChange}>
                        <FormControlLabel value="celsius" control={<TemperatureScaleRadio />} label="Celsius" />
                        <FormControlLabel value="fahrenheit" control={<TemperatureScaleRadio />} label="Fahrenheit" />
                    </TemperatureScaleRadioGroup>
                </TemperatureFormControl>
            </div>
            <div className="carousel">
                {startDay > 0 ? <ArrowBack onClick={backArrowClick}/> : <div/>}
                {startDay + 2 < 4 ? <ArrowForward onClick={forwardArrowClick}/> : <div/>}
            </div>
            <div className="temperature-container">
                {Object.keys(weatherData).map((date, i) => {
                    if  (i >= startDay && i < startDay + 3) {
                        return <Box
                            className="temperature-box"
                            key={i}
                            border={1}
                            borderColor="black"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            bgcolor="white"
                            color="black"
                            fontSize={16}
                            padding= {3}
                            onClick={(i) => boxClick(date)}
                        >
                            <div className="temperature">
                                {`Temperature : ${Math.round(weatherData[date].avg[temperatureScale])}${(temperatureScale === 'fahrenheit') ? 'F': 'C'}`}
                            </div>
                            <div className="date">
                                {`Date : ${date}`}
                            </div>
                        </Box>
                    }
                    return <div className="empty-box" key={i}/>
                })}
            </div>
            <div>
                {currentSelectedDateTemperature && <Paper>
                    <TemperatureChart
                        data={currentSelectedDateTemperature}
                    >
                        <ArgumentAxis />
                        <ValueAxis max={8} />
                        <BarSeries
                            valueField="temperature"
                            argumentField="time"
                        />
                        <Animation />
                    </TemperatureChart>
                </Paper>}
            </div>
        </div>
    )
 }

export default WeatherInfo