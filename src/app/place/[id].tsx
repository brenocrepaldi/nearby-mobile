import { useEffect, useState, useRef } from 'react';
import { View, Alert, Modal, StatusBar, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Loading } from '@/components/loading';
import { api } from '@/services/api';
import { Cover } from '@/components/place/cover';
import { Details, DetailsProps } from '@/components/place/details';
import { Coupon } from '@/components/place/coupon';
import { Button } from '@/components/button';
import { IconScan } from '@tabler/icons-react-native';
import { colors } from '@/styles/colors';
import { CameraView, useCameraPermissions } from 'expo-camera';

type PlaceDetailsProps = DetailsProps & {
	cover: string;
};

export default function Place() {
	const [placeDetails, setPlaceDetails] = useState<PlaceDetailsProps>();
	const [coupon, setCoupon] = useState<string | null>(null);
	const [isCouponFetching, setIsCouponFetching] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isCameraModalOpen, setIsCameraModalOpen] = useState<boolean>(false);
	const [_, requestPermision] = useCameraPermissions();
	const qrLock = useRef<boolean>(false);

	const params = useLocalSearchParams<{ id: string }>();

	async function handleOpenCamera() {
		try {
			const { granted } = await requestPermision();

			if (!granted) return Alert.alert('Camera', 'Camera permission needed');

			qrLock.current = false;
			setIsCameraModalOpen(true);
		} catch (error) {
			console.log(error);
			Alert.alert('Camera', 'Failed to open camera');
		}
	}

	async function fetchMarket() {
		try {
			const { data } = await api.get(`/markets/${params.id}`);
			if (data) {
				setPlaceDetails(data);
				setIsLoading(false);
			} else throw new Error();
		} catch (error) {
			console.log(error);
			Alert.alert('Error', 'Error loading place details', [
				{ text: 'OK', onPress: () => router.back() },
			]);
		}
	}

	async function getCoupon(id: string) {
		try {
			setIsCouponFetching(true);

			const { data } = await api.patch(`/coupons/${id}`);

			Alert.alert('Coupon', data.coupon);
			setCoupon(data.coupon);
		} catch (error) {
			console.error(error);
			Alert.alert('Error', 'Failed getting coupon');
		} finally {
			setIsCouponFetching(false);
		}
	}

	function handleUseCoupon(id: string) {
		setIsCameraModalOpen(false);
		Alert.alert(
			'Cupom',
			'Não será possível reutilizar este cupom. Deseja resgatá-lo?',
			[
				{ style: 'cancel', text: 'Não' },
				{ text: 'Sim', onPress: () => getCoupon(id) },
			]
		);
	}

	useEffect(() => {
		fetchMarket();
	}, [params.id, coupon]);

	if (isLoading) return <Loading />;

	if (!placeDetails) router.back();

	return (
		<View style={{ flex: 1 }}>
			<StatusBar barStyle="light-content" hidden={isCameraModalOpen} />

			<ScrollView showsVerticalScrollIndicator={false}>
				<Cover uri={placeDetails!.cover} />
				<Details data={placeDetails!} />
				{coupon && <Coupon code={coupon} />}
			</ScrollView>
			
			<View style={{ padding: 32 }}>
				<Button onPress={handleOpenCamera}>
					<IconScan size={26} color={colors.gray[100]} />
					<Button.Title>Ler QR Code</Button.Title>
				</Button>
			</View>

			<Modal style={{ flex: 1 }} visible={isCameraModalOpen}>
				<CameraView
					style={{ flex: 1 }}
					facing="back"
					onBarcodeScanned={({ data }) => {
						if (data && !qrLock.current) {
							qrLock.current = true;
							setTimeout(() => {
								handleUseCoupon(data), 500;
							});
						}
					}}
				/>
				<View style={{ position: 'absolute', bottom: 32, left: 32, right: 32 }}>
					<Button
						onPress={() => setIsCameraModalOpen(false)}
						isLoading={isCouponFetching}
					>
						<Button.Title>Voltar</Button.Title>
					</Button>
				</View>
			</Modal>
		</View>
	);
}
