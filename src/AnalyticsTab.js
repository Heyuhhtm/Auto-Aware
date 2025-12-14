import React, { useState, useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import iconMarker from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix for default marker icon missing in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetina,
  iconUrl: iconMarker,
  shadowUrl: iconShadow,
});

const AnalyticsTab = ({ accidents }) => {
  // State to track which location is currently selected for the map view
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [blackspots, setBlackspots] = useState([]);

  useEffect(() => {
    // Fetch the Danger Zones from your Python Server
    const fetchBlackspots = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/analytics/blackspots');
        const data = await response.json();
        console.log("🔥 Loaded Blackspots:", data); // Check console to verify
        setBlackspots(data);
      } catch (error) {
        console.error("Error loading blackspots:", error);
      }
    };

    fetchBlackspots();
  }, []);

  // Process raw accident data into grouped statistics
  const locationStats = useMemo(() => {
    const stats = {};
    
    accidents.forEach(acc => {
      // Round coordinates to ~11m precision to group nearby accidents
      const key = `${Number(acc.lat).toFixed(4)},${Number(acc.lon).toFixed(4)}`;
      
      if (!stats[key]) {
        stats[key] = {
          id: key,
          lat: acc.lat,
          lon: acc.lon,
          count: 0,
          lastTime: acc.timestamp
        };
      }
      stats[key].count += 1;
      stats[key].lastTime = acc.timestamp;
    });

    // Convert to array and sort by frequency (highest count first)
    return Object.values(stats).sort((a, b) => b.count - a.count);
  }, [accidents]);

  // Automatically select the first location (highest frequency) when data loads
  useEffect(() => {
    if (!selectedLocation && locationStats.length > 0) {
      setSelectedLocation(locationStats[0]);
    }
  }, [locationStats, selectedLocation]);

  const mapCenter = useMemo(() => {
    if (selectedLocation) {
      return [Number(selectedLocation.lat), Number(selectedLocation.lon)];
    }
    return [0, 0]; // A default center
  }, [selectedLocation]);

  return (
    <div className="w-full max-w-6xl flex flex-col gap-6 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-4">Accident Analytics</h2>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Column: Frequency List */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-3 text-gray-600 dark:text-gray-300">
              Identified Hotspots ({locationStats.length})
            </h3>
            <div className="bg-gray-100 dark:bg-gray-900 rounded-xl overflow-hidden max-h-96 overflow-y-auto">
              {locationStats.length === 0 ? (
                <div className="p-4 text-center text-gray-500">No accident data recorded yet.</div>
              ) : (
                <table className="w-full text-left">
                  <thead className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                    <tr>
                      <th className="p-3 text-sm">Location</th>
                      <th className="p-3 text-sm">Frequency</th>
                      <th className="p-3 text-sm">Last Incident</th>
                    </tr>
                  </thead>
                  <tbody>
                    {locationStats.map((stat) => (
                      <tr 
                        key={stat.id}
                        onClick={() => setSelectedLocation(stat)}
                        className={`cursor-pointer transition-colors border-b dark:border-gray-800 ${
                          selectedLocation?.id === stat.id 
                            ? 'bg-blue-100 dark:bg-blue-900' 
                            : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                      >
                        <td className="p-3 text-sm font-mono">
                          {Number(stat.lat).toFixed(3)}, {Number(stat.lon).toFixed(3)}
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <span className="font-bold">{stat.count}</span>
                            {/* Simple bar chart visualization */}
                            <div 
                              className="h-2 bg-red-500 rounded-full" 
                              style={{ width: `${Math.min(stat.count * 10, 100)}px` }}
                            ></div>
                          </div>
                        </td>
                        <td className="p-3 text-xs text-gray-500">
                          {new Date(stat.lastTime).toLocaleTimeString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Right Column: Map View */}
          <div className="flex-1 flex flex-col">
            <h3 className="text-lg font-semibold mb-3 text-gray-600 dark:text-gray-300">
              Hotspot Visualization
            </h3>
            <div className="rounded-2xl overflow-hidden h-96 shadow-lg relative bg-gray-200 dark:bg-gray-900">
              <MapContainer
                center={mapCenter}
                zoom={14}
                style={{ height: '100%', width: '100%' }}
                key={selectedLocation ? selectedLocation.id : 'default-map'}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* Existing Marker for the Accident */}
                {selectedLocation && <Marker position={mapCenter} />}

                {/* --- NEW: Draw Danger Zones --- */}
                {blackspots.map((zone, index) => (
                  <Circle
                    key={index}
                    center={[zone.lat, zone.lng || zone.lon]}
                    radius={300} // Radius in meters (e.g., 300m zone)
                    pathOptions={{
                      color: zone.color,         // Corresponds to strokeColor
                      opacity: 0.8,              // Corresponds to strokeOpacity
                      weight: 2,                 // Corresponds to strokeWeight
                      fillColor: zone.color,     // Same color fill
                      fillOpacity: 0.35,         // Transparent so you can see roads underneath
                      interactive: false,        // Corresponds to clickable: false
                    }}
                  />
                ))}
              </MapContainer>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              * Map shows the selected hotspot location.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTab;