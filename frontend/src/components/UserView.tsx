import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import type { MarkerType } from '../types';

const defaultIcon = L.icon({
  iconUrl: '/tree.png',
  iconSize: [30, 40],
});

const iconMap: Record<string, L.Icon> = {
  tree: L.icon({ iconUrl: '/tree.png', iconSize: [30, 40] }),
  med: L.icon({ iconUrl: '/medicine.png', iconSize: [30, 40] }),
  citysquare: L.icon({ iconUrl: '/citysquare.png', iconSize: [30, 40] }),
  footprint: L.icon({ iconUrl: '/footprint.png', iconSize: [30, 40] }),

};

type Props = {
  markers: MarkerType[];
};

function UserView({ markers }: Props) {
  const center = markers.length > 0
    ? [markers[0].lat, markers[0].lng]
    : [34.7025, 135.4959];

  return (

    <MapContainer center={center} zoom={12} style={{ height: '100vh' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {markers.map((marker, idx) => {
        const icon = iconMap[marker.iconType || ''] || defaultIcon;

        return (
          <Marker key={idx} position={[marker.lat, marker.lng]} icon={icon}>
            <Popup>
              <strong>{marker.title}</strong>
              <br />
              {marker.note}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

export default UserView;
