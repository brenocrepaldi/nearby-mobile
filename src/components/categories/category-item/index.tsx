import { Text, Pressable, PressableProps } from 'react-native';
import { colors } from '@/styles/theme';
import { s } from './styles';
import { categoriesIcons } from '@/utils/categories-icons';

type CategoryItemProps = PressableProps & {
	iconId: string;
	isSelected?: boolean;
	name: string;
};

export function CategoryItem({
	iconId,
	isSelected = false,
	name,
	...rest
}: CategoryItemProps) {
	const Icon = categoriesIcons[iconId];

	return (
		<Pressable
			style={[s.container, isSelected && s.containerSelected]}
			{...rest}
		>
			<Icon size={16} color={colors.gray[isSelected ? 100 : 400]} />
			<Text style={[s.name, isSelected && s.nameSelected]}>{name}</Text>
		</Pressable>
	);
}
