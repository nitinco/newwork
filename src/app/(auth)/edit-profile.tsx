import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { Div, Input, Button, Text } from 'react-native-magnus';
import { useRouter } from 'expo-router';
import profileData from './profileData';
import { Alert } from 'react-native';

const EditProfile = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: profileData[0].value,
    email: profileData[1].value,
    phone: profileData[2].value,
    location: profileData[3].value
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      
      // Validate form data
      if (!formData.name || !formData.email) {
        Alert.alert('Error', 'Name and email are required');
        return;
      }

      // Make API call to update profile
      const response = await fetch('YOUR_API_ENDPOINT/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Add your authentication token here if required
          // 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      // Show success message
      Alert.alert(
        'Success',
        'Profile updated successfully',
        [
          {
            text: 'OK',
            onPress: () => router.back()
          }
        ]
      );

    } catch (error) {
      Alert.alert(
        'Error',
        'Failed to update profile. Please try again.'
      );
      console.error('Update profile error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Div w="90%" p={20}>
        <Text fontSize={24} fontWeight="bold" mb={20}>Edit Profile</Text>
        
        <Input
          placeholder="Name"
          value={formData.name}
          onChangeText={(value) => handleChange('name', value)}
          mb={10}
        />
        <Input
          placeholder="Email"
          value={formData.email}
          onChangeText={(value) => handleChange('email', value)}
          mb={10}
        />
        <Input
          placeholder="Phone"
          value={formData.phone}
          onChangeText={(value) => handleChange('phone', value)}
          mb={10}
        />
        <Input
          placeholder="Location"
          value={formData.location}
          onChangeText={(value) => handleChange('location', value)}
          mb={20}
        />

        <Button
          bg="blue500"
          h={50}
          w="100%"
          rounded="circle"
          onPress={handleSave}
          loading={loading}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </Div>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
});
