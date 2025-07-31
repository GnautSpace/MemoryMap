import { useState, useEffect } from 'react';
import type { MarkerType } from '../types';
import '../MapView.css';

type Props = {
    onAddMarker: (marker: MarkerType) => void;
};

function AddMarkerForm({ onAddMarker }: Props) {
    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');

    useEffect(() => {
        if (searchQuery.length < 3) {
            setSuggestions([]);
            return;
        }

        const timeout = setTimeout(async () => {
            try {
                const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
                const data = await res.json();
                setSuggestions(data); 
            } catch (err) {
                console.error('failed to fetch location data:', err);
            }
        }, 500); 

        return () => clearTimeout(timeout);
    }, [searchQuery]);

    const handleSuggestionClick = (s: any) => {
        setLat(s.lat);
        setLng(s.lon);
        setTitle(s.display_name);
        setSearchQuery(s.display_name);
        setSuggestions([]);
    };
    const [iconType, setIconType] = useState('tree'); 



    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!lat || !lng || !title) return;

        onAddMarker({
            lat: parseFloat(lat),
            lng: parseFloat(lng),
            title,
            note,
            placeName: title,
            iconType,
        });

        setTitle('');
        setNote('');
        setLat('');
        setLng('');
        setSearchQuery('');
        setSuggestions([]);
    };

    return (
        <form onSubmit={handleSubmit} className="add-marker-form">
            <h3>Add a Memory Marker</h3>

            <input
                type="text"
                placeholder="Search for a place"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoComplete="off"
            />
            {suggestions.length > 0 && (
                <ul className="suggestions">
                    {suggestions.map((s, idx) => (
                        <li key={idx} onClick={() => handleSuggestionClick(s)}>
                            {s.display_name}
                        </li>
                    ))}
                </ul>
            )}

            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
                placeholder="Note (optional)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
            />

            <select value={iconType} onChange={(e) => setIconType(e.target.value)}>
                <option value="tree">Tree</option>
                <option value="med">Medicine</option>
                <option value="citysquare">City Square</option>
                <option value="footprint">Footprint</option>
            </select>
            <button type="submit">Add Marker</button>
        </form>
    );
}

export default AddMarkerForm;
