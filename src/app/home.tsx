import { View, Text, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import { CategoriesList, CategoryProps } from '@/components/categories';

export default function Home() {
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

	useEffect(() => {
		fetchCategories();
	}, []);

	return (
		<View style={{ flex: 1 }}>
			<CategoriesList
				data={categories}
				selected={selectedCategory}
				onSelected={setSelectedCategory}
			/>
		</View>
	);
}
