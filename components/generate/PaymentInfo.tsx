import { memo } from 'react';
import { Text, View } from 'react-native';

import DatePickerComponent from '../DatePicker';
import TextInputWithLabel from '../TextInputWithLabel';

const MemoizedTextInputWithLabel = memo(TextInputWithLabel);

const PaymentInfo = ({ formData, setFormData }: { formData: any; setFormData: any }) => {
  const handleInputChange = (key: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  };

  return (
    <View>
      <Text className="text-xl font-bold">Payment Info</Text>
      <View className="border-b border-gray-300 pt-3" />
      <View>
        <MemoizedTextInputWithLabel
          containerClassName="my-4"
          label="Number"
          value={formData.number}
          onChangeText={(text) => handleInputChange('number', text)}
          placeholder="Invoice serial"
        />
        <View>
          <Text className="mb-2 text-lg font-bold">Select the date</Text>
          <DatePickerComponent
            date={formData.date}
            setDate={(date: string) => handleInputChange('date', date)}
          />
        </View>

        <MemoizedTextInputWithLabel
          containerClassName="mb-4"
          label="Description"
          value={formData.description}
          onChangeText={(text) => handleInputChange('description', text)}
          placeholder="Description"
        />
        <MemoizedTextInputWithLabel
          containerClassName="mb-4"
          label="Rate"
          value={formData.rate}
          onChangeText={(text) => handleInputChange('rate', text)}
          placeholder="Rate"
          keyboardType="numeric"
        />
        <MemoizedTextInputWithLabel
          containerClassName="mb-4"
          label="Quantity"
          value={formData.quantity}
          onChangeText={(text) => handleInputChange('quantity', text)}
          placeholder="Quantity"
          keyboardType="numeric"
        />
        <View>
          <Text className="mb-2 text-lg font-bold">
            Amount: {Number(formData.rate) * Number(formData.quantity)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PaymentInfo;
