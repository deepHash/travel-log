import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { listLogEntries } from './API';
import FormEntry from './formEntry'

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState();
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 48.137154,
    longitude: 11.576124,
    zoom: 3.5
  });
  
  useEffect(() => {
    getEntries();
  }, []);

  const getEntries = async () => {
    const logEntries = await listLogEntries();
    setLogEntries(logEntries)
  }

  const showAddMarkerPopup = (event) => {
    const [longitude, latitude] = event.lngLat;
    setAddEntryLocation({
      latitude,
      longitude,
    });
  };

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle={"mapbox://styles/itsesis/ck7n9husc04891ithqvxu54w9"}
      onViewportChange={setViewport}
      onDblClick={showAddMarkerPopup}
    >
      {
        logEntries.map(entry => (
          <div
            key={entry._id}
            onClick={() => setShowPopup({
              [entry._id]: true,
            })}>
            <Marker
              latitude={entry.latitude} longitude={entry.longitude}
            >
              <div>
                <img className="marker"
                  style={{
                    height: `${6 * viewport.zoom}px`,
                    width: `${6 * viewport.zoom}px`
                  }}
                  src="https://i.imgur.com/kE0tQhN.png"
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
                  onClose={() => setShowPopup({})}
                  anchor="right" >
                  <div className="popup">
                    <h3>{entry.title}</h3>
                    <p>{entry.comments}</p>
                    <p>{entry.rating ? <small>Rating: {entry.rating}/10</small> : null}</p>
                    <small>Visited on: {new Date(entry.visitDate).toLocaleDateString()}</small>
                    {entry.image && <img src={entry.image} alt={entry.title} />}
                  </div>
                </Popup>
              ) : null
            }
          </div>
        ))
      }
      <div>
        {addEntryLocation ? (
          <div>
            <Marker latitude={addEntryLocation.latitude} longitude={addEntryLocation.longitude}>
              <div>
                <img className="marker"
                  style={{
                    height: `${6 * viewport.zoom}px`,
                    width: `${6 * viewport.zoom}px`
                  }}
                  src="https://i.imgur.com/kE0tQhN.png"
                  alt="marker"
                />
              </div>
            </Marker>
            <Popup
              latitude={addEntryLocation.latitude}
              longitude={addEntryLocation.longitude}
              closeButton={true}
              closeOnClick={true}
              onClose={() => setShowPopup({})}
              anchor="right" >
              <div className="popup">
                <FormEntry onClose={() => {
                  setAddEntryLocation(null);
                  setShowPopup({});
                  getEntries();
                }} latLon={addEntryLocation} />
              </div>
            </Popup>
          </div>

        ) : null}
      </div>

    </ReactMapGL>
  );
}


export default App;