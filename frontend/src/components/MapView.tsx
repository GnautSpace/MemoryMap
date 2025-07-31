import { MapContainer, Marker, Popup, TileLayer, Polyline } from 'react-leaflet';
import { useRef, useState } from 'react';
import type { Map as LeafletMap } from 'leaflet';
import type { LatLngExpression } from 'leaflet';

import AddMarkerForm from './AddMarkerForm';
import MarkerList from './MarkerList';
import type { MarkerType } from '../types';
import 'leaflet/dist/leaflet.css';
import '../MapView.css';

type Props = {
  markers: MarkerType[];
  setMarkers: React.Dispatch<React.SetStateAction<MarkerType[]>>;
};


function MapView({ markers, setMarkers }: Props) {
  const mapRef = useRef<LeafletMap | null>(null);
  const defaultPos: LatLngExpression = [34.7025, 135.4959];


  const [selectedMarker, setSelectedMarker] = useState<{ lat: number; lng: number } | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  
  const handleAddMarker = (marker: MarkerType) => {
    setMarkers(prev => [...prev, marker]);
  };


  const handleRouteTo = (marker: MarkerType) => {
    if (!navigator.geolocation) {
      alert('Geolocation not supported');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const current = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(current);
        setSelectedMarker({ lat: marker.lat, lng: marker.lng });

        if (mapRef.current) {
          mapRef.current.setView([marker.lat, marker.lng], 15);
        }
      },
      (err) => {
        alert('failed to get current location');
        console.error(err);
      }
    );
  };

  const handleMarkerUpdate = (idx: number, updated: MarkerType) => {
    setMarkers(prev => {
      const updatedMarkers = [...prev];
      updatedMarkers[idx] = updated;
      return updatedMarkers;
    });
  };

  const handleMarkerDelete = (idx: number) => {
    setMarkers(prev => prev.filter((_, i) => i !== idx));
    if (selectedMarker && markers[idx].lat === selectedMarker.lat && markers[idx].lng === selectedMarker.lng) {
      setSelectedMarker(null);
    }
  };

  return (
    <div className="map-wrapper">
      <div className="sidebar">
        <h1>Caregiver Dashboard</h1>
        <AddMarkerForm onAddMarker={handleAddMarker} />
        <MarkerList
          markers={markers}
          onRouteTo={handleRouteTo}
          onEdit={() => {}}
          onDelete={handleMarkerDelete}
          onUpdate={handleMarkerUpdate}
          userLocation={userLocation || undefined}
        />
      </div>

      <div className="map-section">
        <MapContainer
          center={defaultPos}
          zoom={12}
          scrollWheelZoom={false}
          style={{ height: '500px', width: '100%' }}
          ref={mapRef}
          className="leaflet-container"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {markers.map((marker, idx) => (
            <Marker key={idx} position={[marker.lat, marker.lng]}>
              <Popup>
                <strong>{marker.title}</strong>
                <br />
                {marker.note}
              </Popup>
            </Marker>
          ))}
          {userLocation && selectedMarker && (
            <Polyline
              positions={[
                [userLocation.lat, userLocation.lng],
                [selectedMarker.lat, selectedMarker.lng],
              ]}
              pathOptions={{ color: 'blue', weight: 5 }}
            />
          )}
        </MapContainer>
      </div>
    </div>
  );
}

export default MapView;
