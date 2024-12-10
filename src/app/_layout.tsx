import { Stack } from 'expo-router';
import { colors, fontFamily } from '@/styles/theme';
import { useFonts } from 'expo-font';
import { Loading } from '@/components/loading';

export default function Layout() {
	const [fontsLoaded] = useFonts(fontFamily);

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
