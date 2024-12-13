import { View, Alert, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import { CategoriesList, CategoryProps } from '@/components/categories';
import { PlaceProps } from '@/components/place-list/place-item';
import { PlaceList } from '@/components/place-list';

import MapView, { Callout, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { colors } from '@/styles/colors';
import { fontFamily } from '@/styles/font-family';

type PlacesProps = PlaceProps & {
	latitude: number;
	longitude: number;
};

const currentLocation = {
	latitude: -23.561187293883442,
	longitude: -46.656451388116494,
};

export default function Home() {
	const [location, setLocation] = useState<Location.LocationObject | null>(
		null
	);
	const [places, setPlaces] = useState<PlacesProps[]>([]);
	const [categories, setCategories] = useState<CategoryProps[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<string>('');

	async function fetchCategories() {
		try {
			const { data } = await api.get('/categories');
			setCategories(data);
			setSelectedCategory(data[0].id);
		} catch (error) {
			console.error('Failed fetching categories', error);
			Alert.alert('Categories', 'Failed loading categories.');
		}
	}

	async function fetchPlaces() {
		try {
			if (!selectedCategory) return null;

			const { data } = await api.get('/markets/category/' + selectedCategory);
			setPlaces(data);
		} catch (error) {
			console.error('Failed fetching places', error);
			Alert.alert('Places', 'Failed loading places.');
		}
	}

	async function getCurrentLocation() {
		try {
			const { granted } = await Location.requestForegroundPermissionsAsync();

			if (granted) {
				let location = await Location.getCurrentPositionAsync({});
				setLocation(location);
			} else {
				let location = await Location.getCurrentPositionAsync({});
				setLocation(location);
			}
		} catch (error) {
			console.log('Error getting current location:', error);
		}
	}

	useEffect(() => {
		// getCurrentLocation();
		fetchCategories();
	}, []);

	useEffect(() => {
		fetchPlaces();
	}, [selectedCategory]);

	return (
		<View style={{ flex: 1 }}>
			<CategoriesList
				data={categories}
				selected={selectedCategory}
				onSelected={setSelectedCategory}
			/>

			<MapView
				style={{ flex: 1 }}
				initialRegion={{
					latitude: currentLocation.latitude,
					longitude: currentLocation.longitude,
					latitudeDelta: 0.01,
					longitudeDelta: 0.01,
				}}
			>
				<Marker
					identifier="current"
					coordinate={{
						latitude: currentLocation.latitude,
						longitude: currentLocation.longitude,
					}}
					image={require('@/assets/location.png')}
				/>

				{places.map((item) => (
					<Marker
						key={item.id}
						identifier={item.id}
						coordinate={{ latitude: item.latitude, longitude: item.longitude }}
						image={require('@/assets/pin.png')}
					>
						<Callout>
							<View>
								<Text
									style={{
										fontSize: 14,
										color: colors.gray[600],
										fontFamily: fontFamily.medium,
									}}
								>
									{item.name}
								</Text>
								<Text
									style={{
										fontSize: 12,
										color: colors.gray[600],
										fontFamily: fontFamily.regular,
									}}
								>
									{item.address}
								</Text>
							</View>
						</Callout>
					</Marker>
				))}
			</MapView>

			<PlaceList data={places} />
		</View>
	);
}
