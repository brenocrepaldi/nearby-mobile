import { View, Text, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import { CategoriesList, CategoryProps } from '@/components/categories';
import { PlaceProps } from '@/components/place-list/place-item';
import { PlaceList } from '@/components/place-list';

type PlacesProps = PlaceProps;

export default function Home() {
	const [places, setPlaces] = useState<PlaceProps[]>([]);
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

	useEffect(() => {
		fetchCategories();
		fetchPlaces();
	}, []);

	useEffect(() => {
		fetchPlaces();
	}, [selectedCategory]);

	return (
		<View style={{ flex: 1, backgroundColor: '#CECECE' }}>
			<CategoriesList
				data={categories}
				selected={selectedCategory}
				onSelected={setSelectedCategory}
			/>

			<PlaceList data={places} />
		</View>
	);
}
