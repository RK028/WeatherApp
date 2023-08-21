import { ReactDOM, forwardRef, useEffect, useState } from "react";
import '../Styles/weather.css'
import axios from "axios";

function Weather(){
    const apikey ="e250c2739666495cb0c101219231908"
    const [data, setdata] =useState({})
    const [arr, setdataArray] = useState([])
    const [inputCity, setInputCity] = useState("")
    const [btn , setbtn] = useState(false)
    const getWeatherDetails = (cityName)=>{
        if(!cityName) return
        const apiURL = "http://api.weatherapi.com/v1/forecast.json?key="+ apikey +"&q="+ cityName +"&days=7&aqi=no&alerts=no"
        axios.get(apiURL).then((res)=>{
            console.log("response",res.data)
            setdata(res.data)
            setdataArray(res.data.forecast.forecastday)
        }).catch((err)=>{
            console.log("err", err);
        })
    }

    const handleChange =(e) =>{
        console.log("value",e.target.value);
        setInputCity(e.target.value)
    }
    const handleSearch = ()=>{
        getWeatherDetails(inputCity)
    }
    useEffect(()=>{
        getWeatherDetails("madurai")
    }, [])
    const Logout =()=>{
        localStorage.removeItem("signin")
        window.location.reload()
    }
    const Delete =()=>{
        localStorage.clear()
        window.location.reload()

    }
    const handlebtn = (click)=>{
        if(click=="C"){
        setbtn(true)
        }
        else{
            setbtn(false)
        }
    }
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const getdate = function(dateUnix){
        const date = new Date((dateUnix) * 1000);
        const dayName = dayNames[date.getUTCDay()];
        return dayName;
        
    }

    return(
            <div>
               <div className="body">
             
           <div className="container-fluid">
           <div className="bL">
                    <button onClick={Logout}>Logout</button>
                    <button onClick={Delete} style={{backgroundColor: "red"}}>Delete Acount</button>
                </div>
                
               <div className="header">
                <div>
                <input type="text"  className="input" placeholder="Enter City For Eg: Mudurai"
                value={inputCity} onChange={handleChange} />
                <button className="btn"  type="button" onClick={handleSearch}>Search</button>
                </div>
                <div>
                    <div className="heading"><h1>{data.location?.name}-Weather Forecast</h1></div>
                    <div className="Subhaeding"><h3>{data?.location?.region},{data.location?.country}</h3></div>
                </div>
                <div>
                    <button className="bn" onClick={function(){handlebtn("F")}}>&#176;F</button>
                    <button className="bn" onClick={function(){handlebtn("C")}}>&#176;C</button>
                </div>
                
               </div>

               {btn? <div className="temp">
                <div className="bx">
                    <img src={data?.current?.condition?.icon} width="60%"/>
                    <h3>{data?.current?.condition?.text}</h3>
                </div>
                <div className="bx1" >
                        <div>Wind: {data?.current?.wind_mph}mph</div>
                        <div>Precip: {data?.current?.precip_in} in</div>
                        <div>Pressure: {data?.current?.pressure_in} in</div><br/>
                        <div><h1>{data?.current?.feelslike_f}&#176;C</h1></div>
                </div>
               </div>
               :
               <div className="temp">
                <div className="bx">
                    <img src={arr? arr[0]?.day?.condition?.icon:[]} width="60%"/>
                   <h3> {arr? arr[0]?.day?.condition?.text:[]}</h3>
                </div>
                <div className="bx1" >
                        <div>Wind: {arr? arr[0]?.day?.maxwind_mph:[]}mph</div>
                        <div>Min.Temp: {arr? arr[0]?.day?.mintemp_f:[]}</div>
                        <div>Max.Temp: {arr? arr[0]?.day?.maxtemp_f:[]}</div><br/>
                        <div><h1>{arr? arr[0]?.day?.maxtemp_c:[]}&#176;F</h1></div>
                </div>
               </div>}

               <div className="hour">
                 {arr? arr.map(forecastday =>{
                 return (<div className="hour-box"> 
                          {getdate(forecastday.date_epoch)}
                        <br/>
                       <img src={forecastday.day.condition.icon}/><br/>
                      {forecastday.day.avgtemp_f}&#176;f
                    </div>)
                 }):[]}
               </div>

            </div>
            </div>
</div>
)}

export default Weather;