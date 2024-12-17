import { useRef } from 'react';
import { Text, useWindowDimensions } from 'react-native';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { s } from './styles';
import { PlaceItem, PlaceProps } from './place-item';
import { router } from 'expo-router';

type PlaceListProps = {
	data: PlaceProps[];
};

export function PlaceList({ data }: PlaceListProps) {
	const dimensions = useWindowDimensions();
	const bottomSheetRef = useRef<BottomSheet>(null);

	const snapPoints = {
		min: 278,
		max: dimensions.height - 128,
	};

	return (
		<BottomSheet
			ref={bottomSheetRef}
			snapPoints={[snapPoints.min, snapPoints.max]}
			handleIndicatorStyle={s.indicator}
			backgroundStyle={s.container}
			enableOverDrag={false}
		>
			<BottomSheetFlatList
				data={data}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<PlaceItem
						data={item}
						onPress={() =>
							router.push({
								pathname: '/place/[id]',
								params: { id: item.id },
							})
						}
					/>
				)}
				contentContainerStyle={s.content}
				ListHeaderComponent={() => (
					<Text style={s.title}>Explore locais perto de você</Text>
				)}
			/>
		</BottomSheet>
	);
}
