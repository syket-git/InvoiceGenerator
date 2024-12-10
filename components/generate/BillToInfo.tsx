import { memo } from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import TextInputWithLabel from '../TextInputWithLabel';

const MemoizedTextInputWithLabel = memo(TextInputWithLabel);

const FromInfo = ({ formData, setFormData }: { formData: any; setFormData: any }) => {
  const handleInputChange = (key: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
      <Text className="text-xl font-bold">Bill To</Text>
      <View className="border-b border-gray-300 pt-3" />
      <View>
        <MemoizedTextInputWithLabel
          containerClassName="my-4"
          label="Name"
          value={formData.name}
          onChangeText={(text) => handleInputChange('name', text)}
          placeholder="Enter your name"
        />
        <MemoizedTextInputWithLabel
          containerClassName="mb-4"
          label="Email"
          value={formData.email}
          onChangeText={(text) => handleInputChange('email', text)}
          placeholder="Enter your email"
        />
        <MemoizedTextInputWithLabel
          containerClassName="mb-4"
          label="Address"
          value={formData.street}
          onChangeText={(text) => handleInputChange('street', text)}
          placeholder="Street"
        />
        <MemoizedTextInputWithLabel
          label="City"
          containerClassName="mb-4"
          value={formData.city}
          onChangeText={(text) => handleInputChange('city', text)}
          placeholder="City"
        />
        <MemoizedTextInputWithLabel
          containerClassName="mb-4"
          label="Postal Code"
          value={formData.postalCode}
          onChangeText={(text) => handleInputChange('postalCode', text)}
          placeholder="Postal Code"
        />
        <MemoizedTextInputWithLabel
          containerClassName="mb-4"
          keyboardType="numeric"
          label="Phone"
          value={formData.phone}
          onChangeText={(text) => handleInputChange('phone', text)}
          placeholder="Phone"
        />
        <MemoizedTextInputWithLabel
          containerClassName="mb-4"
          keyboardType="numeric"
          label="Business Number"
          value={formData.businessNumber}
          onChangeText={(text) => handleInputChange('businessNumber', text)}
          placeholder="Business Number"
        />
      </View>
    </ScrollView>
  );
};

export default FromInfo;
