import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { getObjectData } from '~/helper/getObjectData';

interface InfoType {
  name: string;
  email: string;
  street: string;
  city: string;
  postalCode: string;
  phone: string;
  businessNumber: string;
}

const FromInfo = () => {
  const [fromInfo, setFromInfo] = useState<InfoType | null>(null);
  const [billToInfo, setBillToInfo] = useState<InfoType | null>(null);

  const handleGetData = async () => {
    const fromInfo = await getObjectData('fromInfo');
    const billToInfo = await getObjectData('billToInfo');

    fromInfo && setFromInfo(fromInfo);
    billToInfo && setBillToInfo(billToInfo);
  };

  useEffect(() => {
    handleGetData();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
      <Text className="my-2 text-center text-xl font-bold">Review your invoice details</Text>
      <View>
        <View>
          <Text className="my-2 text-xl font-bold">From</Text>
          <View className="border-b border-gray-300" />
          <Text className="my-2 text-xl font-bold">Name : {fromInfo?.name || 'N/A'}</Text>
          <Text className="my-2 text-xl font-bold">Email : {fromInfo?.email || 'N/A'}</Text>
          <Text className="my-2 text-xl font-bold">Street : {fromInfo?.street || 'N/A'}</Text>
          <Text className="my-2 text-xl font-bold">City : {fromInfo?.city || 'N/A'}</Text>
          <Text className="my-2 text-xl font-bold">
            Postal Code : {fromInfo?.postalCode || 'N/A'}
          </Text>
        </View>

        <View className="mt-5">
          <Text className="my-2 text-xl font-bold">Bill To</Text>
          <View className="border-b border-gray-300" />

          <Text className="my-2 text-xl font-bold">Name : {billToInfo?.name || 'N/A'}</Text>
          <Text className="my-2 text-xl font-bold">Email : {billToInfo?.email || 'N/A'}</Text>
          <Text className="my-2 text-xl font-bold">Street : {billToInfo?.street || 'N/A'}</Text>
          <Text className="my-2 text-xl font-bold">City : {billToInfo?.city || 'N/A'}</Text>
          <Text className="my-2 text-xl font-bold">
            Postal Code : {billToInfo?.postalCode || 'N/A'}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default FromInfo;
