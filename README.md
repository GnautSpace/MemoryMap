# MemoryMap

**MemoryMap** is a mapping tool designed to help people with dementia stay connected to familiar places. Caregivers can add memory markers- locations with notes and icons - while users with cognitive impairment see a simplified, icon-based map view to reinforce memory and reduce disorientation.

---

## Features

- Caregiver view: Add places with notes and visual icons
- User view: Simplified map with familiar location markers
- Live geolocation route drawing (for caregivers)
- Built with React + Leaflet, designed for future Google Maps API migration

---

## Live Demo

Frontend deployed on Netlify: [LIVE](https://memory-map-coral.vercel.app/)

---

## Tech Stack

- React  
- Leaflet.js  
- Express.js (for location search proxy)
- OpenStreetMap Nominatim API
- Google Maps API future scope

---

##  How to Run Locally

```bash
npm install
npm start
```

### Note
Due to API access limitations, Leaflet is used in place of Google Maps, with full intent to migrate to Maps JavaScript API, Directions API, and Places API post-submission.
