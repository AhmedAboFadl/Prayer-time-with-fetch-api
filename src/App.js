
import './App.css';
import "./index.css";
import Prayer from './component/Prayer'
import { useEffect, useState } from 'react';

function App() {

  const [ prayerTimes , setprayerTimes ] = useState({});
  const [dateTime, setdateTime] = useState("");
  const [city, setCity] = useState("cairo");


  const citys=[


    {name:"القاهره",value:"cairo"},
    {name:"الاسكندريه", value:"Alexandria"},
    {name:"الجيزه" ,value:"Giza"},
    {name:"المنصوره", value:"Mansoura"},
    {name:"اسوان" ,value:"Aswan"},
    {name:"الاقصر" ,value:"Luxor"},

  ];



  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const res = await fetch(
          `https://api.aladhan.com/v1/timingsByCity?city=Cairo&country=${city}`
        );
        const data_prayer = await res.json();
        console.log(data_prayer.data.timings);
        setprayerTimes(data_prayer.data.timings);
        setdateTime(data_prayer.data.date.gregorian.date);
      } catch (error) {
        console.error("Error fetching prayer times:", error);
      }
    };

    fetchPrayerTimes();
  }, [city]);


  const formatTimes = (time) =>{


  if(!time){
    return "00:00";
  }
  let [hours , minutes] = time.split(":").map(Number)
  const perd = hours>=12 ? "PM":"AM"
  hours = hours % 12 || 12 ;
  return `${hours}:${minutes } ${perd}`
  }


  return (
    <section>

      <div className="container">
        <div className="top-section">
          <div className="city">
            <h3> المدينه</h3>
            <select name="" id="" onChange={(e) => setCity(e.target.value)}>
              {citys.map((city) => {
                return (
                  <option key={city.value} value={city.value}>
                    {city.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="date">
            <h3>التاريخ</h3>
            <h4>{dateTime}</h4>
          </div>
        </div>

        <Prayer name="الفجر" time={formatTimes(prayerTimes.Fajr)} />
        <Prayer name="الضهر" time={formatTimes(prayerTimes.Dhuhr)} />
        <Prayer name="العصر" time={formatTimes(prayerTimes.Asr)} />
        <Prayer name="المغرب" time={formatTimes(prayerTimes.Maghrib)} />
        <Prayer name="العشاء" time={formatTimes(prayerTimes.Isha)} />
      </div>
    </section>
  );
}

export default App;