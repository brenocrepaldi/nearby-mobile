import { TouchableOpacity, View, Text, Image } from 'react-native';
import { colors } from '@/styles/theme';
import { s } from './styles';
import { IconTicket } from '@tabler/icons-react-native';

export type PlaceProps = {
	id: string;
	name: string;
	description: string;
	coupons: number;
	cover: string;
	address: string;
};

type PlaceItemProps = {
	data: PlaceProps;
};

export function PlaceItem({ data, ...rest }: PlaceItemProps) {
	return (
		<TouchableOpacity style={s.container} {...rest}>
			<Image style={s.image} source={{ uri: data.cover }} />

			<View style={s.content}>
				<Text style={s.name}>{data.name}</Text>
				<Text style={s.description} numberOfLines={2}>
					{data.description}
				</Text>

				<View style={s.footer}>
					<IconTicket size={16} color={colors.red.base} />
					<Text style={s.tickets}>{data.coupons} cupons disponíveis</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
}
