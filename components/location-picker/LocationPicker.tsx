'use client';
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from 'react-leaflet';
import { useState, useEffect, useMemo } from 'react';
import 'leaflet/dist/leaflet.css';
import { LatLngLiteral, LatLngTuple } from 'leaflet';
import L from 'leaflet';
import { getLocationByAdress } from '@/lib/getLocation';

const icon = L.icon({ iconUrl: '/images/marker-icon.png' });

interface locationProps {
  onLocationChange: (latlng: LatLngLiteral) => void;
  initLocation?: string;
}

const LocationPicker = ({ onLocationChange, initLocation }: locationProps) => {
  const [position, setPosition] = useState<LatLngLiteral | null>(null);

  const memePos = useMemo(() => {
    if (initLocation && position && position.lat && position.lng)
      return [position.lat, position.lng];
  }, [position, initLocation]);

  useEffect(() => {
    async function fetchLoc() {
      if (initLocation) {
        let address = await getLocationByAdress(initLocation);
        return address;
      }
    }

    if (initLocation) {
      fetchLoc().then((address) => setPosition(address));
    }
  }, [initLocation]);

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        const newPostion = e.latlng;
        setPosition(newPostion);
        onLocationChange(newPostion);
      },
    });
    return position === null ? null : (
      <Marker position={position} icon={icon} />
    );
  };

  return (
    <MapContainer
      center={[37.6138, -122.4869]}
      zoom={13}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <ChangeView center={memePos as [number, number]} zoom={13} />

      <MapEvents />
    </MapContainer>
  );
};

export default LocationPicker;

type Props = {
  zoom: number;
  center: [number, number];
};
const ChangeView = ({ center, zoom }: Props) => {
  const map = useMap();
  if (center && zoom) {
    map.setView(center, zoom);
  }
  return null;
};
