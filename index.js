
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';

export default function Index() {

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {

    if (!email || !password) {
      alert("Enter all details");
      return;
    }

    const existing = await AsyncStorage.getItem('users');
    const users = existing ? JSON.parse(existing) : [];

    const user = users.find(
      u => u.email === email && u.password === password
    );

    if (user) {

      await AsyncStorage.setItem('currentUser', email);

      if (email === "admin@gmail.com") {
        await AsyncStorage.setItem('role', 'admin');
      }

      router.replace('/home');

    } else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <View style={styles.centerContainer}>
      <View style={styles.card}>

        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Login</Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/signup')}>
          <Text style={{ marginTop: 10, textAlign: 'center', color: '#4F46E5' }}>
            New User? Sign Up
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}