import React from 'react';
import { StyleSheet, Switch } from 'react-native';
import { Text, View } from '~/components/shared';
import { THEME } from '~/constants/theme';

type Item = {
	header: string;
	body: string;
	status: true | false;
};

const RenderSetting = ({ item, toggleSwitch, sectionIndex, itemIndex, }: {
	item: Item;
	toggleSwitch: Function;
	sectionIndex: number;
	itemIndex: number;
}) => {

	return (
		<View style={styles.sectionBodyCon}>
			<View style={styles.sectionBody}>
				<Text size="md" weight="medium">{item.header}</Text>
				<Text size="sm" weight="regular">{item.body}</Text>
			</View>
			<Switch
				trackColor={{ false: '#D0D6D6', true: '#F97316' }}
				thumbColor={item?.status ? '#F9F9F9' : '#E6F5F3'}
				ios_backgroundColor="#D0D6D6"
				onValueChange={() => toggleSwitch(sectionIndex, itemIndex)}
				value={item?.status}
			/>
		</View>
	)
}

export default RenderSetting;

const styles = StyleSheet.create({
	sectionBodyCon: {
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 20,
	},
	sectionBody: {
		flexDirection: 'column',
		justifyContent: 'space-between',
		width: '75%',
		paddingBottom: 11,
		marginTop: THEME.spacing.md,
		gap: 12,
	},
})