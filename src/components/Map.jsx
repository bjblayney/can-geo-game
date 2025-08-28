// src/components/Map.jsx
import React, { useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import * as topojson from 'topojson-client';
import provinceColors from '../data/provinceColours';

const geoUrl = '/can-geo-game/can-prov.topojson';

const Map = ({ onSelectProvince, currentProvince, showCapital, gameOver }) => {
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
    <div className="w-full lg:w-3/4">
      <ComposableMap
        projection="geoAlbers"
        projectionConfig={{
          center: [0, 60],
          scale: 700,
        }}
        width={800}
        height={400}
        style={{ width: '100%', height: 'auto' }}
      >
        <Geographies geography={geographies}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const provinceName = geo.properties.name;
              const isActive = provinceName === currentProvince.name; // Check if the province is active
              const fillColor = provinceColors[provinceName] || '#EEE'; // Default color if not mapped

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => {
                    onSelectProvince(geo);
                  }} // Handle user clicks
                  className={`transition-colors duration-300 ${isActive ? 'fill-red-500 stroke-gray-50' : 'fill-red-300 stroke-white'}`}
                  style={{
                    default: {
                      fill: isActive ? 'oklch(52.7% 0.154 150.069)' : gameOver ? fillColor : 'oklch(84.5% 0.143 164.978)', // Highlight active province
                      outline: 'none',
                      stroke: '#FFFFFF',
                      strokeWidth: 1,
                      cursor: 'pointer',
                      transition: 'fill 0.3s, stroke 0.3s',
                    },
                    hover: {
                      fill: 'oklch(69.6% 0.17 162.48)', // Light Blue on hover
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
        {showCapital && (
          <Marker coordinates={currentProvince.coordinates}>
            <g fill="none" stroke="#FF5722" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" transform="translate(-12, -24)">
              <circle cx={12} cy={10} r={3} fill="#FF5722" />
              <path d="M12 21v-11" />
            </g>
            <text textAnchor="middle" y={-19} style={{ fontFamily: 'system-ui', fontWeight: `700`, fill: '#000000', fontSize: 25 }}>
              {currentProvince.capital}
            </text>
          </Marker>
        )}
      </ComposableMap>
    </div>
  );
};

export default Map;
