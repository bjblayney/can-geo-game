// src/components/Map.jsx
import React, { useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import * as topojson from 'topojson-client';

const geoUrl = '/can-prov.topojson'; // Ensure this path is correct

const Map = ({ onSelectProvince, currentProvince }) => {
  const [geographies, setGeographies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(geoUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // console.log('Fetched TopoJSON data:', data);

        const provinceKey = 'canadaprov'; // Updated key based on your TopoJSON
        if (!data.objects[provinceKey]) {
          throw new Error(`Object key '${provinceKey}' not found in TopoJSON file.`);
        }

        const geoFeatures = topojson.feature(data, data.objects[provinceKey]).features;
        setGeographies(geoFeatures);
        setLoading(false);
      })
      .catch((error) => {
        console.error('There was a problem when fetching the data:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading map...</p>;
  if (error) return <p>Error loading map: {error.message}</p>;

  return (
    <div className="w-full lg:w-1/2">
      <ComposableMap projection="geoAlbers">
        <Geographies geography={geographies}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const isActive = geo.properties.name === currentProvince.name; // Check if the province is active
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => onSelectProvince(geo)} // Handle user clicks
                  className={`transition-colors duration-300 ${isActive ? 'fill-yellow-500 stroke-orange-500' : 'fill-gray-300 stroke-white'}`}
                  style={{
                    //   default: {
                    //     fill: isActive ? '#FF5722' : '#ECEFF1', // Active province gets a different color
                    //     outline: 'none',
                    //   },
                    hover: {
                      fill: '#FF7043', // Hover effect
                      outline: 'none',
                    },
                    pressed: {
                      fill: '#FF5722',
                      outline: 'none',
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default Map;
