import { Stack } from 'expo-router';
import { colors, fontFamily } from '@/styles/theme';
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

	console.log(fontsLoaded);
	if (!fontsLoaded) return <Loading />;

	return (
		<Stack
			screenOptions={{
				headerShown: false,
				contentStyle: { backgroundColor: colors.gray[100] },
			}}
		/>
	);
}
