import { View, Text } from 'react-native';
import { s } from './styles';
import { StepItem } from './step-item';
import { IconMapPin, IconQrcode, IconTicket } from '@tabler/icons-react-native';

export function StepList() {
	return (
		<View style={s.container}>
			<Text style={s.title}>Veja como funciona:</Text>

			<StepItem
				icon={IconMapPin}
				title="Encontre estabelecimentos"
				description="Veja locais perto de você que são parceiros Nearby"
			/>
			<StepItem
				icon={IconQrcode}
				title="Ative o cupom com QR Code"
				description="Escaneie o código no estabelecimento para usar o benefício"
			/>
			<StepItem
				icon={IconTicket}
				title="Garanta vantagens perto de você"
				description="Ative cupons onde estiver, em diferentes tipos de estabelecimento "
			/>
		</View>
	);
}
