import { StyleSheet } from 'react-native';
import { colors, fontFamily } from '@/styles/theme';

export const s = StyleSheet.create({
	container: {
		gap: 14,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		height: 56,
		maxHeight: 56,
		borderRadius: 12,
		backgroundColor: colors.green.base,
	},
	title: {
		fontSize: 16,
		color: colors.gray[100],
		fontFamily: fontFamily.semiBold,
	},
});
