import { Text, View } from 'react-native';

import { colors } from '@/styles/colors';
import { IconProps } from '@tabler/icons-react-native';
import { s } from './styles';

interface StepItemProps {
	icon: React.ComponentType<IconProps>;
	title: string;
	description: string;
}

export function StepItem({ icon: Icon, title, description }: StepItemProps) {
	return (
		<View style={s.container}>
			{Icon && <Icon size={32} color={colors.red.base}></Icon>}
			<View style={s.details}>
				<Text style={s.title}>{title}</Text>
				<Text style={s.description}>{description}</Text>
			</View>
		</View>
	);
}
