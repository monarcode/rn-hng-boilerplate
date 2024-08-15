import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, StatusBar, SafeAreaView } from 'react-native';
import { Button, Select, Text, TextInput } from '~/components/shared';
import { THEME } from '~/constants/theme';
import Dollar from '../../assets/dollar.svg';
import { ChevronLeft } from 'react-native-feather';

const CreateProductScreen = () => {
  const [description, setDescription] = useState('');

  const handleDescriptionChange = (text: string) => {
    if (text.length <= 72) {
      setDescription(text);
    } else {
      setDescription(text.substring(0, 72));
    }
  };

  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.contentContainer} contentContainerStyle={{ paddingBottom: 10 }}>
        <View style={styles.header}>
          <ChevronLeft color={THEME.colors.black} />
          <Text weight="bold" size="lg">
            Add a Product
          </Text>
          <View style={styles.iconPlaceholder} />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label} weight="semiBold">
            Title<Text style={{ color: THEME.colors.primary }}>*</Text>
          </Text>
          <TextInput placeholder="Product name" />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label} weight="semiBold">
            Description
          </Text>
          <TextInput
            value={description}
            onChangeText={handleDescriptionChange}
            containerStyle={{ height: 80 }}
            inputStyle={{ textAlign: 'left', textAlignVertical: 'top' }}
            placeholder="Enter product description"
          />
          <Text style={styles.subtext} weight="light">
            Maximum of 72 characters
          </Text>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label} weight="semiBold">
            Category
          </Text>
          <Select options={options} placeholder="Select an option" width={300} />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label} weight="semiBold">
            Standard Price<Text style={{ color: THEME.colors.primary }}>*</Text>
          </Text>
          <TextInput
            style={styles.priceInput}
            placeholder="0.00"
            icon={<Dollar width={24} height={24} />}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label} weight="semiBold">
            Quantity<Text style={{ color: THEME.colors.primary }}>*</Text>
          </Text>
          <TextInput placeholder="0.00 pcs" />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label} size="md" weight="semiBold">
            Media
          </Text>
          <View style={styles.uploadContainer}>
            <Button containerStyle={styles.uploadButton}>
              <Text style={styles.uploadButtonText} weight="medium">
                Upload New
              </Text>
            </Button>
            <Text style={styles.subtext}>Accepts images, videos or 3D models</Text>
          </View>
        </View>

        <View style={styles.buttonGroup}>
          <Button
            variant="outline"
            containerStyle={styles.cancelButton}
            textStyle={styles.cancelButtonText}>
            Cancel
          </Button>
          <Button containerStyle={styles.addButton}>Add</Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingHorizontal: THEME.spacing.gutter,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: THEME.spacing.lg,
    paddingVertical: THEME.spacing.md,
    borderBottomWidth: 0.6,
    borderBottomColor: THEME.colors.neutral[400],
  },
  iconPlaceholder: {
    width: 24,
    height: 24,
    backgroundColor: 'transparent',
    borderRadius: 12,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
  },
  subtext: {
    marginTop: 5,
  },
  priceInput: {
    flex: 1,
    borderWidth: 0,
  },
  uploadContainer: {
    borderWidth: 1,
    gap: 5,
    borderColor: THEME.colors.border,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: THEME.spacing.gutter,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9F9F9',
    borderStyle: 'dashed',
  },
  uploadButton: {
    backgroundColor: THEME.colors.white,
    elevation: 3,
    shadowColor: '#ccc',
    shadowOffset: { width: 3, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  uploadButtonText: {
    color: THEME.colors.black,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: THEME.spacing.xl,
  },
  cancelButton: {
    flex: 1,
    borderColor: '#E0E0E0',
    marginRight: 5,
  },
  cancelButtonText: {
    fontSize: THEME.fontSize.md,
    color: '#333',
  },
  addButton: {
    flex: 1,
    marginLeft: 5,
  },
});
