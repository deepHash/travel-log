import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup} from 'react-map-gl';
import { listLogEntries } from './API';

const App = () => {
  const [logEntries, setLogEntries] = useState([])
  const [showPopup, setShowPopup] = useState({})
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 48.137154,
    longitude: 11.576124,
    zoom: 3.5
  });

  useEffect(() => {
    (async () => {
       const logEntries = await listLogEntries();
       setLogEntries(logEntries)
    })()
  }, []);

  return (
    <ReactMapGL 
    {...viewport}      
    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    mapStyle={"mapbox://styles/itsesis/ck7n9husc04891ithqvxu54w9"}
    onViewportChange={setViewport}
    >
      {
        logEntries.map(entry =>(
          <div 
          onClick={() => setShowPopup({
            ...showPopup,
            [entry._id]: true,
          })}>
            <Marker
              key={entry._id} 
              latitude={entry.latitude} longitude={entry.longitude} 
              offsetLeft={-20} offsetTop={-10}>
              <div>
                <img className="marker"
                    style={{height: `${6 * viewport.zoom}px`,
                            width: `${6 * viewport.zoom}px` }}
                      src="https://i.imgur.com/O93KG5X.png" //@ToDo - replace image to svg
                      alt="marker"
                />              
              </div>
            </Marker>
            {
            showPopup[entry._id] ? (
              <Popup
                latitude={entry.latitude} 
                longitude={entry.longitude} 
                closeButton={true}
                closeOnClick={false}
                onClose={() => this.setState({showPopup: false})}
                anchor="top" >
                <div>
                  <h3>{entry.title}</h3>
                  <p>{entry.comments}</p>
                </div>
              </Popup>

              ) : null
            }
          </div>
        ))
          
      }

    </ReactMapGL> 
  );
}


export default App;