import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import ky, { HTTPError } from 'ky';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { View, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';

import { OrganisationSignupFormSchema } from '../types/organisation-sign-up';
import { organisationSignupFormSchema } from '../validation-schema/organisation-sign-up';

import { Button, Text } from '~/components/shared';
import { FormInput, FormSelect } from '~/components/wrappers';
import { THEME } from '~/constants/theme';
import { AuthService } from '~/services/authentication';
import { useTranslation } from 'react-i18next';
// import useAuthStore from '~/store/auth';

const OrganisationSignupForm = () => {
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const form = useForm<OrganisationSignupFormSchema>({
    resolver: zodResolver(organisationSignupFormSchema),
  });

  // const authstore = useAuthStore();

  const onOrganisationSignIn = async (data: OrganisationSignupFormSchema) => {
    setLoading(true);
    try {
      const response = await AuthService.createUserOrganisation(data);

      if (response) {
        Toast.show({
          type: 'success',
          props: {
            title: 'Success',
            description: 'Organisation created successfully',
          },
        });
        router.push('/user/manage-organisation');
      }

      return response;
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        Toast.show({
          type: 'error',
          props: {
            title: 'Error',
            description: error.message,
          },
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCountry();
  }, []);

  const getCountry = async () => {
    try {
      const response = await ky.get('https://restcountries.com/v3.1/region/africa').json<any>();
      const countries = response.filter((country: any) => country.subregion === 'Western Africa');
      setCountries(countries);

      if ('error' in response) {
        throw new Error('Something went wrong');
      }

      return response;
    } catch (error: any) {
      if (error instanceof HTTPError) {
        const errorBody = await error.response.json<any>();
        throw new Error(errorBody.message || `HTTP error ${error.response.status}`);
      }
      throw error;
    }
  };

  return (
    <View style={styles.wrapper}>
      <FormInput
        control={form.control}
        name="name"
        label={t('Company\'s Name')}
        placeholder={t('Enter company\'s name')}
      />

      <FormInput
        control={form.control}
        name="email"
        label={t('Company\'s Email Address')}
        placeholder={t('Enter company\'s email address')}
      />

      <FormInput
        label={t('Description')}
        name="description"
        control={form.control}
        placeholder={t('Describe company here...')}
        numberOfLines={4}
        multiline
        containerStyle={{ width: '100%', height: 80, alignItems: 'flex-start' }}
        textAlign="left"
      />

      <FormSelect
        control={form.control}
        name="industry"
        label={t('Select Industry')}
        placeholder={t('Select')}
        options={[
          { label: t('Technology'), value: 'technology' },
          { label: t('Finance'), value: 'finance' },
          { label: t('Agriculture'), value: 'agriculture' },
        ]}
      />

      <FormSelect
        control={form.control}
        name="type"
        label={t('Organisation Type')}
        placeholder={t('Select')}
        options={[
          { label: t('Public'), value: 'public' },
          { label: t('Private'), value: 'private' },
          { label: t('Limited Liability Company (LLC)'), value: 'llc' },
        ]}
      />

      <Text weight="semiBold" size="xl" style={{ color: THEME.colors.dark }}>
        {t('Company Address')}
      </Text>

      <FormSelect
        control={form.control}
        name="country"
        label={t('Select Country')}
        placeholder={t('Select')}
        options={[
          ...countries.map((country: any) => ({
            label: country.name.common,
            value: country.name.common,
          })),
        ]}
      />

      <FormInput
        control={form.control}
        name="state"
        label={t('Company\'s State')}
        placeholder={t('Enter company\'s state')}
      />

      <Button onPress={form.handleSubmit(onOrganisationSignIn)} loading={loading}>
        {t('Create Organisation')}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    rowGap: THEME.spacing.lg,
    paddingBottom: 20,
  },
});

export default OrganisationSignupForm;
