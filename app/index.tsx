import { Link } from 'expo-router';
import { Image, View } from 'react-native';

import { Button } from '~/components/Button';
import { Container } from '~/components/Container';

export default function Home() {
  return (
    <Container>
      <View className="h-screen flex-1 items-center justify-center bg-white">
        <Image
          className="h-64 w-full"
          resizeMode="contain"
          source={{
            uri: 'https://static6.depositphotos.com/1014014/641/i/450/depositphotos_6414281-stock-photo-invoice-with-envelope.jpg',
          }}
        />
        <View className="w-full px-6">
          <Link href={{ pathname: '/invoices/generate' }} asChild>
            <Button title="Generate Invoice within min" />
          </Link>
        </View>
      </View>
    </Container>
  );
}
