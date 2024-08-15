import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View, StyleSheet } from 'react-native';

import { OrganisationSignupFormSchema } from '../types/organisation-sign-up';
import { organisationSignupFormSchema } from '../validation-schema/organisation-sign-up';

import { Button, Text } from '~/components/shared';
import { FormInput, FormSelect } from '~/components/wrappers';
import { THEME } from '~/constants/theme';
// import useAuthStore from '~/store/auth';

const OrganisationSignupForm = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm<OrganisationSignupFormSchema>({
    resolver: zodResolver(organisationSignupFormSchema),
  });

  // const authstore = useAuthStore();

  const onOrganisationSignIn = () => {
    // TODO: handle organisation sign up
    setTimeout(() => {
      setLoading(true);
      router.navigate('/login');
      console.log('done');
    }, 300);
  };

  return (
    <View style={styles.wrapper}>
      <FormInput
        control={form.control}
        name="company_name"
        label="Company's Name"
        placeholder="Enter company's name"
      />

      <FormInput
        control={form.control}
        name="company_email"
        label="Company's Email Address"
        placeholder="Enter company's email address"
      />

      <FormSelect
        control={form.control}
        name="industry"
        label="Select Industry"
        placeholder="Select"
        options={[
          { label: 'Technology', value: 'technology' },
          { label: 'Finance', value: 'finance' },
          { label: 'Agriculture', value: 'agriculture' },
        ]}
      />

      <FormSelect
        control={form.control}
        name="organisation_type"
        label="Organisation Type"
        placeholder="Select"
        options={[
          { label: 'Public', value: 'public' },
          { label: 'Private', value: 'private' },
          { label: 'Limited Liability Company (LLC)', value: 'llc' },
        ]}
      />

      <Text weight="semiBold" size="3xl" style={{ color: THEME.colors.dark }}>
        Company Address
      </Text>

      <FormSelect
        control={form.control}
        name="country"
        label="Select Country"
        placeholder="Select"
        options={[
          { label: 'USA', value: 'usa' },
          { label: 'Canada', value: 'canada' },
          { label: 'UK', value: 'uk' },
        ]}
      />

      <FormSelect
        control={form.control}
        name="state"
        label="Select State"
        placeholder="Select"
        options={[
          { label: 'New York', value: 'new-york' },
          { label: 'Los Angeles', value: 'los-angeles' },
          { label: 'Chicago', value: 'chicago' },
        ]}
      />

      <FormInput
        control={form.control}
        name="address"
        label="Company's Address"
        placeholder="Enter company's address"
      />

      <FormSelect
        control={form.control}
        name="lga"
        label="LGA"
        placeholder="Select"
        options={[
          { label: 'New York', value: 'new-york' },
          { label: 'Los Angeles', value: 'los-angeles' },
          { label: 'Chicago', value: 'chicago' },
        ]}
      />

      <Button onPress={form.handleSubmit(onOrganisationSignIn)} loading={loading}>
        Create Account
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    rowGap: THEME.spacing.lg,
  },
});

export default OrganisationSignupForm;
