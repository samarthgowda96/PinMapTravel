import { useState, useEffect} from 'react';
import ReactMapGL,{Marker,Popup}from 'react-map-gl';
import {Room,Star} from '@material-ui/icons'
import './App.css';
import axios from 'axios';
import {format} from "timeago.js"
function App() {
  const [currentUser,setCurrentUser]= useState('sam@gmaissasdsdsdasassal.cos')
  const [pins,setPins]=useState([])
  const [currentPlaceId, setCurrentPlaceId]=useState(null)
  const [newPlace, setNewPlace]=useState(null)
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vw",
    latitude: 15.3173,
    longitude: 75.7139,
    zoom: 4
  });
   useEffect(()=>{ 
    const getPins = async()=>{ 
      try {
        
        const res = await axios.get("http://localhost:6900/api/pins",{
          headers: { 
          "Content-Type": "application/json" ,
          "Access-Control-Allow-Origin":"*",
        }
      })
          console.log(res.data)
          setPins(res.data)
      } catch (error) {
        console.log(error)
      }
    }
      

    getPins(); 
    
   },[]) 
   
   const handleMarkerClick=(id,lat,long)=>{
     setCurrentPlaceId(id)
     setViewport({...viewport,latitude:lat,longitude:long})
 }
   const handleAddClick=(e)=>{
     const [long,lat]=e.lngLat;
     setNewPlace({
       lat,
       long,
     });

   }

  return (
    <div className="App">
        <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={nextViewport => setViewport(nextViewport)}
        mapStyle='mapbox://styles/samarthgowda/ckonhl1ai145k17ni9ilv527h'
        onDblClick={handleAddClick}
        transitionDuration="5 00"
      >
        {pins.map(pin=>(

       
      <>
      <Marker 
      
      latitude={pin.lat} 
      longitude={pin.long} 
      offsetLeft={-20} 
      offsetTop={-10}
      key={pin._id}
      >
        <Room
        key={pin._id}
        style={{
          fontSize:viewport.zoom*7, 
          color:pin.username===currentUser?"tomato":"slateblue ",
          cursor:"pointer"
        }}
        onClick={()=>handleMarkerClick(pin._id,pin.lat,pin.long)}
        />
        </Marker>
        {pin._id===currentPlaceId && (
        
         <Popup
         key={pin._id}
          latitude={pin.lat}
          longitude={pin.long}
          closeButton={true}
          closeOnClick={false}
          anchor="left"
          onClose={()=>setCurrentPlaceId(null)}
           > 
          <div className="card" key={pin._id}>
            <label>Place</label>
            <h4 className="place">{pin.title}</h4>
            <label>Review</label>
            <p className="desc">{pin.desc}</p>
            <label>Rating</label>
            <div className="stars">
              <Star className="star"/>
              <Star className="star"/>
              <Star className="star"/>
              <Star className="star"/>
              <Star className="star"/>
            </div>


            <label>Information</label>
            <span className="username"> created  by <b>{pin.username}</b></span>
            <span className="date"> {format(pin.createdAt)}</span>
          </div>

          </Popup> 
        )
}
          </>

))}
    {newPlace &&(
      <Popup
          latitude={newPlace.lat}
          longitude={newPlace.long}
          closeButton={true}
          closeOnClick={false}
          anchor="left"
          onClose={()=>setNewPlace(null)}
           >
             <div>
               <form>
                 <label>Title</label>
                 <input placeholder="Enter a title"></input>
                 <label>Review</label>
                 <textarea placeholder="say something about this place you love"></textarea>
                 <label>Rating</label>
                 <select>
                   <option value="1">1</option>
                   <option value="2">2</option>
                   <option value="3">3</option>
                   <option value="4">4</option>
                   <option value="5">5</option>
                 </select>
                 <button className="submitButton" type="submit">Add Pin :)</button>
               </form>
             </div>
       </Popup>
        )}


      </ReactMapGL>
      
    </div>
  );
}

export default App;
