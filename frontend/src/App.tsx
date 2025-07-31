import { useState } from 'react';
import CaregiverDashboard from './components/CaregiverDashboard';
import UserView from './components/UserView';
import type { MarkerType } from './types';

function App() {
  const [markers, setMarkers] = useState<MarkerType[]>([]);
  const [view, setView] = useState<'caregiver' | 'user'>('caregiver');
  //const [darkMode, setDarkMode] = useState(false);

  return (
    <div>
      <button onClick={() => setView('caregiver')}>Caregiver View</button>
      <button onClick={() => setView('user')}>User View</button>
       {/*<button onClick={() => setDarkMode((prev) => !prev)}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>*/}
        
      {view === 'caregiver' ? (
        <CaregiverDashboard markers={markers} setMarkers={setMarkers} />
      ) : (
        <UserView markers={markers} />
      )}
    </div>
  );
}

export default App;
