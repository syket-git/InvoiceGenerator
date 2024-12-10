import { StyleSheet, View } from 'react-native';
import DateTimePicker from 'react-native-ui-datepicker';

export default function DatePicker({
  date,
  setDate,
}: {
  date: string;
  setDate: (e: string) => void;
}) {
  return (
    <View style={styles.container}>
      <DateTimePicker mode="single" date={date} onChange={(params) => setDate(params.date)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
