import { useState } from 'react';
import '../MapView.css';

type Marker = {
  lat: number;
  lng: number;
  title: string;
  note?: string;
  placeName: string;
  iconType: string;
};

type Props = {
  markers: Marker[];
  onRouteTo: (marker: Marker) => void;
  userLocation?: { lat: number; lng: number };
  onEdit: (idx: number) => void;
  onDelete: (idx: number) => void;
  onUpdate: (idx: number, updatedMarker: Marker) => void;
};


function MarkerList({ markers, onRouteTo, userLocation, onEdit, onDelete, onUpdate }: Props) {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedMarker, setEditedMarker] = useState<Marker | null>(null);

  const handleSelect = (selectedIndex: string) => {
    const idx = parseInt(selectedIndex);
    if (!isNaN(idx) && markers[idx]) {
      onRouteTo(markers[idx]);
    }
  };

  return (
    <div>
      <h3>Saved Places</h3>

      <select onChange={(e) => handleSelect(e.target.value)}>
        <option>Select a place</option>
        {markers.map((m, idx) => (
          <option key={idx} value={idx}>
            {m.title}
          </option>
        ))}
      </select>

      <ul className="marker-list">
        {markers
          .filter((m) => userLocation && getDistance(userLocation, m) < 2000)
          .map((marker, idx) => {
            return (
              <li key={idx} className={`marker-item ${editIndex === idx ? 'editing' : ''}`}>
                {editIndex === idx ? (
                  <>
                    <input
                      type="text"
                      value={editedMarker?.title || ''}
                      onChange={(e) =>
                        setEditedMarker({ ...editedMarker!, title: e.target.value })
                      }
                    />
                    <textarea
                      value={editedMarker?.note || ''}
                      onChange={(e) =>
                        setEditedMarker({ ...editedMarker!, note: e.target.value })
                      }
                    />
                    <button
                      onClick={() => {
                        if (editedMarker) {
                          onUpdate(idx, editedMarker);
                          setEditIndex(null);
                          setEditedMarker(null);
                        }
                      }}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditIndex(null);
                        setEditedMarker(null);
                      }}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <strong>
                      {marker.title} @ {marker.placeName}
                    </strong>
                    {marker.note && <p>{marker.note}</p>}
                    {userLocation && (
                      <p>Distance: {getDistance(userLocation, marker).toFixed(0)} meters</p>
                    )}
                    <div className="marker-actions">
                      <button onClick={() => onRouteTo(marker)}>Route</button>
                      <button
                        onClick={() => {
                          setEditIndex(idx);
                          setEditedMarker(marker);
                        }}
                      >
                        Edit
                      </button>
                      <button onClick={() => onDelete(idx)}>Delete</button>
                    </div>
                  </>
                )}
              </li>
            );
          })}
      </ul>
    </div>
  );
}

function getDistance(from: { lat: number; lng: number }, to: { lat: number; lng: number }): number {
  const R = 6371e3;
  const phi1 = (from.lat * Math.PI) / 180;
  const phi2 = (to.lat * Math.PI) / 180;
  const deltaPhi = ((to.lat - from.lat) * Math.PI) / 180;
  const deltaLambda = ((to.lng - from.lng) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) ** 2 +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

export default MarkerList;
