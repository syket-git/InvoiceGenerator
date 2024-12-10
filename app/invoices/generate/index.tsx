import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import BillToInfo from '~/components/generate/BillToInfo';
import FromInfo from '~/components/generate/FromInfo';
import PreviewInfo from '~/components/generate/PreviewInfo';
import { getObjectData } from '~/helper/getObjectData';
import { storeData } from '~/helper/storeObjectData';

const GenerateInvoice = () => {
  const [state, setState] = useState<number>(1);
  const [fromInfo, setFromInfo] = useState({
    name: '',
    email: '',
    street: '',
    city: '',
    postalCode: '',
    phone: '',
    businessNumber: '',
  });

  const [billToInfo, setBillToInfo] = useState({
    name: '',
    email: '',
    street: '',
    city: '',
    postalCode: '',
    phone: '',
    businessNumber: '',
  });

  const handleGetData = async () => {
    if (state === 1) {
      const ifDataExists = await getObjectData('fromInfo');
      if (ifDataExists) {
        setFromInfo(ifDataExists);
      }
    } else if (state === 2) {
      const ifDataExists = await getObjectData('billToInfo');
      if (ifDataExists) {
        setBillToInfo(ifDataExists);
      }
    }
  };

  useEffect(() => {
    handleGetData();
  }, [state]);

  const renderStepComponent = () => {
    switch (state) {
      case 1:
        return <FromInfo formData={fromInfo} setFormData={setFromInfo} />;
      case 2:
        return <BillToInfo formData={billToInfo} setFormData={setBillToInfo} />;
      case 3:
        return <PreviewInfo />;
      default:
        return null;
    }
  };

  // Navigation handlers
  const handleNext = async () => {
    if (state < 3) {
      if (state === 1) {
        await storeData('fromInfo', fromInfo);
      }

      if (state === 2) {
        await storeData('billToInfo', billToInfo);
      }
      setState((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (state > 1) setState((prev) => prev - 1);
  };

  return (
    <Container>
      <ScrollView className="flex-1 p-6">
        <Text className="text-center text-4xl font-bold">Invoice</Text>

        {renderStepComponent()}
        <View className="mt-6 flex flex-row items-center justify-center gap-3">
          {/* Show the "Back" button for states 2 and 3 */}
          {state > 1 && <Button onPress={handleBack} title="Back" className="flex-1" />}

          {/* "Next/Preview/Generate" button */}
          <Button
            onPress={handleNext}
            className="flex-1"
            title={state === 3 ? 'Generate' : state === 2 ? 'Preview' : 'Next'}
          />
        </View>
      </ScrollView>
    </Container>
  );
};

export default GenerateInvoice;
