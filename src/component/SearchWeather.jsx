import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { FaSearch } from 'react-icons/fa'
import "./SearchWeatherStyle.css"

const SearchWeather = () => {
const[search, setSearch] = useState("usa");
const[dataOne, setDataOne] = useState([]);
const[dataTwo, setDataTwo] = useState([])
const[dataThree, setDataThree] = useState([])
const[dataFour, setDataFour] = useState([])
const[input, setInput] =useState("");
let componentMounted = true;


useEffect(() => {
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=0722141ec244f0ac1bb489c0284342d2`)
    .then((res) => {
        setDataOne(res.data)
        setDataTwo(res.data.main)
        setDataThree(res.data.wind)
        setDataFour(res.data.weather[0])
        console.log(res.data)
        console.log(res.data.main)
        console.log(res.data.wind)
    })
    .catch(err => console.log(err))
}, [search])


const currentDate = new Date();
// console.log(currentDate);
const days = ["Sunday", "Monday,", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]


//Time
let hours = currentDate.getHours()
let minutes = currentDate.getMinutes()
let seconds = currentDate.getSeconds()
let time = null;
if(hours > 12) {
    hours = (hours - 12)
    time = `${hours}:${minutes}:${seconds}pm`
} else {
    hours = hours
    time = `${hours} : ${minutes}:${seconds}am`
}


//Weather Emoji
let emoji = null;
if(dataFour.main == "Clouds") {
    emoji = "fa-cloud"
} else if(dataFour.main == "Thunderstorm"){
    emoji = "fa-bolt"
} else if(dataFour.main == "Drizzle") {
    emoji = "fa-cloud-rain"
} else if(dataFour.main == "Rain") {
    emoji = "fa-cloud-showers-heavy"
} else if(dataFour.main == "Snow") {
    emoji = "fa-snow-flake"
} else {
    emoji = "fa-smog"
}

//Search with button
const handleSearch = (e) => {
    e.preventDefault()
    setSearch(input)
}

//Search with ENTER key.
const pressHandle = (e) => {
    if(e.key === "Enter") {
        e.preventDefault()
        setSearch(input)
    }
}

  return (
    <div className='slider'>
        <div className='bg'>
            <div className='contentContainer'>
                <div className='card'>
                    <div className="search">
                        <input type="text" className="search_bar" value={input} onChange={(e) => setInput(e.target.value)} onKeyUp={pressHandle} required />
                        <FaSearch className="search__icon" size={20} onClick = {handleSearch} />
                    </div>

                    <div className="weather">
                        <h2 className="city">Weather in {dataOne.name}</h2>
                        <h1 className="temp">{dataTwo.temp}°C</h1>
                        <i className={`fas ${emoji} fa-4x`}></i>
                        <div className="description"> {dataFour.main}</div>
                        <div className="humidity">Humidity : {dataTwo.humidity}% </div>
                        <div className="wind">Wind speed : {dataThree.speed} km/h</div>
                    </div>
                </div>
                
                <p className='date'>
                    {days[currentDate.getDay()]}, {currentDate.getDate()}rd {currentDate.toLocaleString("default", {month: "long"})}, {currentDate.getFullYear()} <br /> {time}
                </p>
                <p className='date'></p>
            </div>
        </div>

        
    </div>
  )
}

export default SearchWeather