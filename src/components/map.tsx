import { useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import { Image } from 'cloudinary-react'
import ReactMapGL, { Source, Marker, Popup, ViewState } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
// import { useLocalState } from "src/utils/useLocalState";
// import { HousesQuery_houses } from "src/generated/HousesQuery";
// import { SearchBox } from "./searchBox";

interface IProps {}

export default function Map({}: IProps) {
	const mapRef = useRef<ReactMapGL | null>(null)
	const [viewport, setViewport] = useState<ViewState>({
		latitude: 43,
		longitude: -79,
		zoom: 10,
		bearing: 0,
		pitch: 80,
	})

	const onMapLoad = useCallback(evt => {
		const map = evt.target
		console.log(map)
		if (map && map.setTerrain) map.setTerrain({ source: 'mapbox-dem', exaggeration: 0.5 })
	}, [])

	return (
		<div className="text-black relative">
			<ReactMapGL
				{...viewport}
				width="100%"
				height="calc(100vh - 64px)"
				mapStyle="mapbox://styles/leighhalliday/ckhjaksxg0x2v19s1ovps41ef" //"mapbox://styles/mapbox/satellite-v9"
				mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
				onViewportChange={nextViewport => setViewport(nextViewport)}
				ref={instance => (mapRef.current = instance)}
				minZoom={5}
				maxZoom={15}
				onLoad={onMapLoad}>
				<Source
					id="mapbox-dem"
					type="raster-dem"
					url="mapbox://mapbox.mapbox-terrain-dem-v1"
					tileSize={512}
					maxzoom={14}
				/>
			</ReactMapGL>
		</div>
	)
}
