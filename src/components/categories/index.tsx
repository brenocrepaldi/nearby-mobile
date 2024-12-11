import { FlatList, View } from 'react-native';
import { CategoryItem } from './category-item';
import { s } from './styles';

export type CategoryProps = {
	id: string;
	name: string;
};

type CategoriesListProps = {
	data: CategoryProps[];
	selected: string;
	onSelected: (id: string) => void;
};

export function CategoriesList({
	data,
	selected,
	onSelected,
}: CategoriesListProps) {
	return (
		<FlatList
			style={s.container}
			contentContainerStyle={s.content}
			data={data}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => (
				<CategoryItem
					iconId={item.id}
					name={item.name}
					onPress={() => onSelected(item.id)}
					isSelected={item.id === selected}
				/>
			)}
			horizontal
			showsHorizontalScrollIndicator={false}
		/>
	);
}
