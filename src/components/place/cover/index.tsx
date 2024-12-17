import { ImageBackground, View } from 'react-native';
import { s } from './styles';
import { Button } from '@/components/button';
import { router } from 'expo-router';
import { IconArrowLeft } from '@tabler/icons-react-native';

type CoverProps = {
	uri: string;
};

export function Cover({ uri }: CoverProps) {
	return (
		<ImageBackground source={{ uri }} style={s.container}>
			<View style={s.header}>
				<Button style={s.button} onPress={() => router.back()}>
					<Button.Icon icon={IconArrowLeft} />
				</Button>
			</View>
		</ImageBackground>
	);
}
