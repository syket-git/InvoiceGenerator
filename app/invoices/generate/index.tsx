import dayjs from 'dayjs';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { useEffect, useState } from 'react';
import { Alert, Platform, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import BillToInfo from '~/components/generate/BillToInfo';
import FromInfo from '~/components/generate/FromInfo';
import PaymentInfo from '~/components/generate/PaymentInfo';
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

  const [paymentInfo, setPaymentInfo] = useState({
    number: '',
    date: dayjs(),
    description: '',
    rate: 1,
    quantity: 1,
    amount: 1,
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
    } else if (state === 3) {
      const ifDataExists = await getObjectData('paymentInfo');
      if (ifDataExists) {
        setPaymentInfo(ifDataExists);
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
        return <PaymentInfo formData={paymentInfo} setFormData={setPaymentInfo} />;
      case 4:
        return <PreviewInfo paymentInfo={paymentInfo} />;
      default:
        return null;
    }
  };

  const generatePDF = async () => {
    const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .header { text-align: center; margin-bottom: 20px; }
            .section { margin-bottom: 20px; }
            .bold { font-weight: bold; }
          </style>
        </head>
        <body>
          <h1 class="header">Invoice Details</h1>
          <div class="section">
            <p><span class="bold">Invoice:</span> #${paymentInfo.number}</p>
            <p><span class="bold">Date:</span> ${dayjs(paymentInfo?.date).locale('en').format('MMMM DD, YYYY')}</p>
            <p><span class="bold">Quantity:</span> ${paymentInfo.quantity}</p>
            <p><span class="bold">Rate:</span> ${paymentInfo.rate} USD</p>
            <p><span class="bold">Total Amount:</span> ${Number(paymentInfo?.quantity) * Number(paymentInfo.rate)} USD</p>
          </div>
          <div class="section">
            <h2>From</h2>
            <p><span class="bold">Name:</span> ${fromInfo?.name || 'N/A'}</p>
            <p><span class="bold">Email:</span> ${fromInfo?.email || 'N/A'}</p>
            <p><span class="bold">Street:</span> ${fromInfo?.street || 'N/A'}</p>
            <p><span class="bold">City:</span> ${fromInfo?.city || 'N/A'}</p>
            <p><span class="bold">Postal Code:</span> ${fromInfo?.postalCode || 'N/A'}</p>
          </div>
          <div class="section">
            <h2>Bill To</h2>
            <p><span class="bold">Name:</span> ${billToInfo?.name || 'N/A'}</p>
            <p><span class="bold">Email:</span> ${billToInfo?.email || 'N/A'}</p>
            <p><span class="bold">Street:</span> ${billToInfo?.street || 'N/A'}</p>
            <p><span class="bold">City:</span> ${billToInfo?.city || 'N/A'}</p>
            <p><span class="bold">Postal Code:</span> ${billToInfo?.postalCode || 'N/A'}</p>
          </div>
        </body>
      </html>
    `;

    try {
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      console.log('PDF generated at:', uri);

      if (Platform.OS === 'ios' || Platform.OS === 'android') {
        await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
      } else {
        Alert.alert('Success', `PDF generated at: ${uri}`);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to generate PDF.');
    }
  };

  // Navigation handlers
  const handleNext = async () => {
    if (state === 4) {
      await generatePDF();
    }

    if (state < 4) {
      if (state === 1) {
        await storeData('fromInfo', fromInfo);
      } else if (state === 2) {
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
        <View className="mb-14 mt-6 flex flex-row items-center justify-center gap-3">
          {state > 1 && <Button onPress={handleBack} title="Back" className="flex-1" />}

          <Button
            onPress={handleNext}
            className="flex-1"
            title={state === 4 ? 'Generate PDF' : state === 3 ? 'Preview' : 'Next'}
          />
        </View>
      </ScrollView>
    </Container>
  );
};

export default GenerateInvoice;
