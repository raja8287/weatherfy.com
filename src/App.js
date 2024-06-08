import './App.css';
import WeatherIcon from './thermometer.svg'; // Import SVG file
import wind from "./wind-2-svgrepo-com.svg";
import humi from "./humidity-svgrepo-com.svg";
import cloud from"./cloud-sun-alt-svgrepo-com.svg";
import windy from"./wind-2-svgrepo-com.svg";
import lightning from"./night-alt-lightning-svgrepo-com.svg"
import nightrain from"./night-alt-rain-svgrepo-com.svg";
import nightsnow from"./night-alt-snow-svgrepo-com.svg";
import coudysuny from "./cloud-sun-alt-svgrepo-com.svg"
import daycloud from "./day-cloudy-svgrepo-com.svg"
import raniday from "./weather-rain-with-svgrepo-com.svg"
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { useEffect, useState } from 'react';



function App() {
  const [data,setdata]=useState([]);//weather info.
  const [City,setcity]=useState('');//City info.
  const [tempo,settempo]=useState(cloud);//svg img for weather status
  const [status,setstt]=useState('No info')
  const [type,seting]=useState(true);//typeing check
  
 
  useEffect(()=>{

  },[])
  //data fecthing using axios from api for selected city
  function getdata(){
    var name=document.getElementById('search').value;
    if(name){
      const options = {
        method: 'GET',
        url: 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather',
        params: { city: `${name}` },
        headers: {
          'X-RapidAPI-Key': '737da948ebmsh59a2e80c61a023dp1be28ajsn46c82dfad5ed',
          'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
        }
      };
      
      axios.request(options)
        .then(response => {
          console.log(response.data);
          // Displaying some specific weather data
          const { temp, humidity, wind_speed, description } = response.data;
          if(temp>42){
            settempo(coudysuny);
            setstt("sunny day")

          }
        if(35<temp){
          settempo(daycloud)
          setstt("warm day")
        }
        else{
          settempo(raniday)
          setstt("rainy day")

        }
          setdata(response.data);
          console.log(`Temperature: ${temp}°C`);
          console.log(`Humidity: ${humidity}%`);
          console.log(`Wind Speed: ${wind_speed} m/s`);
          console.log(`Description: ${description}`);
          console.log("response data:",response.data)
        })
        .catch(error => {
          console.error('Error fetching weather data:', error);
        });
        console.log(name);
    }
    
  
    document.getElementById('search').value=" ";
  }

//seting the input and reseting filed name
  function sname(e){
    setcity(e.target.value);
    setdata([]);
    if(e.target.value){
      seting(false);

    }
    else{
      seting(true);
    }

  }
  //ham navbar animation
function Ham(){
  var ham=document.getElementById('mainnav').style;
  
  if(ham.display=="inline-block"){
    document.getElementById('mainnav').style.display="none";
    
    document.getElementById('ham').style.transform="rotate(0deg)";
  }else{
    
    document.getElementById('mainnav').style.display="inline-block";
    
    document.getElementById('ham').style.transform="rotate(90deg)";
  }
}




  return (
    <div className="App">
      {/**Nav bar */}
 <nav id='mainnav'>
  
<div className='logo'><p>
  <span>Weather</span>< span>fy.com</span></p></div>

{/**search bar and input*/}
  <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
      onChange={(e)=>{sname(e)}}
        id='search'
       
      />
      <button onClick={()=>{getdata()}}>Search</button>
    </div>

 </nav>
{/*hamburger */}
 <div id='hamdiv'>
 <span id='ham' onClick={()=>{Ham()}}>!!!</span>


 </div>

 
{/**main content div */}
 <main>
 {type ||data.temp?
  <>
  
    
  <div className='info'>

<>
      <div>
        <img src={tempo}/>
        <span>{data.feels_like||"0"}°C</span>
      </div>
      <div>
        <img src={humi}/>
        <span>{data.humidity||"0"}%</span>
      </div>
      <div>
        <img src={WeatherIcon}/>
        <span>{data.temp||"0"}°C</span>
      </div>
      <div>
        <img src={wind}/>
        <span>{data.wind_speed}m/s</span>
      </div></>
  </div>
{data.temp?
  <div className='back'>
    <div>
      <p><span>{status} in </span>
      <span>{City||"Delhi"}</span></p>
    </div>  
  </div>:
  <div className='back'>
    <div>
      <p><span>Happy to see you here</span></p>
      
      <p><span>search weather...</span></p>
    </div>  
  </div>}
 
 
</>

:<><div className='loader2'></div><span></span></>}
 </main>

 {/*footer*/}
  <div id='footer1' >
        <div id='foo1'>
        <p>
        <span>Weather</span>< span>fy.com</span></p><br></br>
        <p>Lorem ipsum is typically a corrupted version of De finibus bonorum et malorum, </p>
        </div>
        </div></div>
  );
}

export default App;
