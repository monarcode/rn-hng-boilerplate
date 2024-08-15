import React from 'react';
import { View, Text } from '../shared';
import GridIcon from '../../assets/icons/icongrid.svg';
import { List } from 'react-native-feather';
import { Pressable, StyleSheet } from 'react-native';
import { THEME } from '~/constants/theme';
import GoBack from '../go-back';

type TopHeaderProps = {
    listViewOption: string;
    setListViewOption: React.Dispatch<'list' | 'grid'>;
};

const ProductTopHeader = ({ listViewOption, setListViewOption }: TopHeaderProps) => {
    return (
        <View style={styles.container}>
            <GoBack/>
            <View style={{ gap: THEME.spacing.xs }}>
                <Text size="3xl" weight="bold">
                    Products
                </Text>
                <Text size="lg">View all products</Text>
            </View>
            {/* <View style={{ flexDirection: 'row', gap: THEME.spacing.sm }}>
                <Pressable
                    style={[
                        styles.listToggleButton,
                        { backgroundColor: listViewOption == 'list' ? THEME.colors.black : 'transparent' },
                    ]}
                    onPress={() => {
                        setListViewOption('list');
                    }}>
                    <List
                        width={25}
                        height={25}
                        color={listViewOption == 'list' ? THEME.colors.white : THEME.colors.border}
                    />
                </Pressable>
                <Pressable
                    style={[
                        styles.gridToggleButton,
                        { backgroundColor: listViewOption == 'grid' ? THEME.colors.black : 'transparent' },
                    ]}
                    onPress={() => {
                        setListViewOption('grid');
                    }}>
                    <GridIcon
                        width={25}
                        height={25}
                        stroke={listViewOption == 'grid' ? THEME.colors.white : THEME.colors.border}
                    />
                </Pressable>
            </View> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap:THEME.spacing.lg,
        alignItems: 'center',
        borderBottomWidth: 1,
        padding: THEME.spacing.md,
        paddingTop: THEME.spacing.xl * 2,
        borderColor: THEME.colors.border,
    },
    listToggleButton: {
        padding: THEME.spacing.xs,
        borderWidth: 1,
        borderColor: THEME.colors.border,
        borderRadius: 5,
    },
    gridToggleButton: {
        padding: THEME.spacing.xs,
        borderWidth: 1,
        borderColor: THEME.colors.border,
        borderRadius: 5,
    },
});

export default ProductTopHeader;
