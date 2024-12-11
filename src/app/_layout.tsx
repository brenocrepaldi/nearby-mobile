import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import { colors } from '@/styles/theme';
import { useFonts } from 'expo-font';
import { Loading } from '@/components/loading';
import {
	Rubik_500Medium,
	Rubik_700Bold,
	Rubik_400Regular,
	Rubik_600SemiBold,
} from '@expo-google-fonts/rubik';

export default function Layout() {
	const [fontsLoaded] = useFonts({
		Rubik_700Bold,
		Rubik_500Medium,
		Rubik_400Regular,
		Rubik_600SemiBold,
	});

	if (!fontsLoaded) return <Loading />;

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Stack
				screenOptions={{
					headerShown: false,
					contentStyle: { backgroundColor: colors.gray[100] },
				}}
			/>
		</GestureHandlerRootView>
	);
}
