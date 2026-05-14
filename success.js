import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from './styles';

export default function Success() {

  const router = useRouter();

  return (
    <View style={styles.centerContainer}>

      <Text style={{ fontSize: 22, color: 'green' }}>
        Submitted Successfully
      </Text>

      <TouchableOpacity style={styles.button} onPress={() => router.replace('/home')}>
        <Text style={styles.buttonText}>Go Home</Text>
      </TouchableOpacity>

    </View>
  );
}