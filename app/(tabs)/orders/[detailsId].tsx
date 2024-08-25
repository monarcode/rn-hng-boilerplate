import React from 'react';
import { StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import BasicHeader from '~/components/basic-header';
import { THEME } from '~/constants/theme';
import normalize from '~/libs/normalize';
import { View, Text, Button } from '~/components/shared';
import SmallTruck from '~/assets/icons/truck-blur.svg';

const OrderDetails = () => {
  const { t } = useTranslation();
  return (
    <ScrollView
      contentContainerStyle={{ gap: THEME.spacing.md }}
      showsVerticalScrollIndicator={false}
      style={styles.container}>
      {/* top header */}
      <View style={styles.topHeader}>
        <BasicHeader label="Orders" />
      </View>
      {/* main container */}
      <View style={styles.mainContainer}>
        {/* order image */}
        <View style={{ paddingHorizontal: THEME.spacing.md }}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../../assets/shoe-clear.png')}
              style={{
                height: 0.15 * normalize(Dimensions.get('window').height),
                width: normalize(200),
              }}
              resizeMode="contain"
            />
          </View>
        </View>
        {/* order summary */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: THEME.spacing.md,
          }}>
          <View style={{ gap: normalize(2) }}>
            <Text style={{ color: THEME.colors.neutral[300] }} size="xl" weight="medium">
              Order:
              <Text> </Text>
              <Text weight="medium" size="xl" style={{ color: '#141fa4' }}>
                #99012
              </Text>
            </Text>
            <Text weight="medium" size="md">
              {t('Order Created')}
            </Text>
            <Text style={{ color: THEME.colors.neutral[300] }}>August 16th, 2024 at 10:30pm</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: normalize(10) }}>
            <View
              style={{
                backgroundColor: 'green',
                paddingHorizontal: normalize(THEME.spacing.sm),
                paddingVertical: normalize(THEME.spacing.xs + 3),
                alignItems: 'center',
                borderRadius: normalize(8),
              }}>
              <Text size="md" style={{ color: THEME.colors.white }}>
                {t('Paid')}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#f8faff',
                paddingHorizontal: normalize(THEME.spacing.sm),
                paddingVertical: normalize(THEME.spacing.xs + 3),
                alignItems: 'center',
                borderRadius: normalize(8),
              }}>
              <Text size="md" style={{ color: '#3880bc' }}>
                {t('In Transit')}
              </Text>
            </View>
          </View>
        </View>

        {/* progess container */}
        <View
          style={{
            backgroundColor: '#FAFAFA',
            padding: THEME.spacing.md,
            gap: normalize(10),
          }}>
          <Text size="xl" weight="bold">
            {t('Progress')}
          </Text>
          {/* progess bar */}
          <View style={{ flexDirection: 'row', gap: normalize(5) }}>
            <View
              style={{
                height: normalize(5),
                borderRadius: normalize(20),
                backgroundColor: 'green',
                flex: 1,
                borderTopLeftRadius: 200,
                borderBottomLeftRadius: 200,
              }}></View>
            <View
              style={{
                height: normalize(5),
                backgroundColor: 'green',
                flex: 1,
              }}></View>
            <View
              style={{
                height: normalize(5),
                backgroundColor: '#ACCCEC',
                flex: 1,
              }}></View>
            <View
              style={{
                height: normalize(5),
                backgroundColor: '#D9D9D9',
                flex: 1,
              }}></View>
            <View
              style={{
                height: normalize(5),
                borderTopRightRadius: 200,
                borderBottomRightRadius: 200,
                backgroundColor: '#D9D9D9',
                flex: 1,
              }}></View>
          </View>
          <Text style={{ color: THEME.colors.neutral[300] }}>{t('Processing...')}</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: normalize(5),
              alignSelf: 'center',
              borderRadius: normalize(8),
              borderWidth: 1,
              padding: normalize(10),
              borderColor: '#DEDEDE',
              width: '80%',
              justifyContent: 'center',
            }}>
            <SmallTruck />
            <Text>
              {t('Estimated Shipping Date:')} <Text>{t('Aug 20,2024')}</Text>
            </Text>
          </View>
          <View
            style={{
              width: '60%',
              alignSelf: 'center',
              padding: normalize(10),
              backgroundColor: THEME.colors.primary,
              borderRadius: normalize(8),
              alignItems: 'center',
            }}>
            <Text style={{ color: 'white' }}> {t('Confirm Shipment')}</Text>
          </View>
        </View>

        {/* customer and delivery details */}
        <View style={{ backgroundColor: '#FAFAFA', padding: THEME.spacing.md, gap: normalize(30) }}>
          {/* customer details */}
          <View style={{ gap: normalize(9) }}>
            <Text size="md" weight="medium">
              {t('Customer Details')}
            </Text>
            <Text>James Hung Ltd</Text>
            <Text>jameshung@gmail.com</Text>
            <Text>+234 9045004705</Text>
          </View>
          {/* delivery details */}
          <View style={{ gap: normalize(9) }}>
            <Text size="md" weight="semiBold" style={{ color: THEME.colors.neutral[300] }}>
              {t('Shipping Details')}
            </Text>
            <Text>James Hung Ltd</Text>
            <Text>112, Houston Street</Text>
            <Text>New York</Text>
            <Text>United States</Text>
          </View>
        </View>
        {/* order summary */}
        <View style={{ backgroundColor: '#FAFAFA', padding: THEME.spacing.md, gap: normalize(10) }}>
          <Text size="md" weight="semiBold">
            {t('Order Summary')}
          </Text>
          {/* subtotal */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text size="md">{t('Sub Total')}</Text>
            <Text size="md">${t('190.00')}</Text>
          </View>
          {/* discount */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text size="md">{t('Discount')}</Text>
            <Text size="md">$0.00</Text>
          </View>
          {/* shipping cost */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text size="md">{t('Shipping Cost')}</Text>
            <Text size="md">$0.00</Text>
          </View>
          {/* total */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text size="md" weight="semiBold">
              {t('Total')}
            </Text>
            <Text size="md" weight="semiBold">
              $190.00
            </Text>
          </View>
          <View
            style={{
              width: '60%',
              alignSelf: 'center',
              padding: normalize(10),
              borderRadius: normalize(8),
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#E2E8F0',
            }}>
            <Text style={{ color: 'black' }} weight="bold">
              {' '}
              {t('Resend Invoice')}
            </Text>
          </View>
        </View>
        {/* order products */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.white,
    gap: THEME.spacing.lg,
  },
  topHeader: {
    borderBottomWidth: 1,
    borderColor: '#F6F6F6',
  },
  imageContainer: {
    height: 0.2 * normalize(Dimensions.get('window').height),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F3F4',
    width: '100%',
    borderRadius: 12,
    paddingHorizontal: THEME.spacing.md,
  },
  mainContainer: {
    gap: THEME.spacing.md,
  },
});

export default OrderDetails;
