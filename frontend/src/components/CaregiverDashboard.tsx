import MapView from './MapView';
import type { MarkerType } from '../types';

type Props = {
  markers: MarkerType[];
  setMarkers: React.Dispatch<React.SetStateAction<MarkerType[]>>;
};

function CaregiverDashboard({ markers, setMarkers }: Props) {
  return (
    <div>
      <MapView markers={markers} setMarkers={setMarkers} />
    </div>
  );
}

export default CaregiverDashboard;
