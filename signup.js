import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';

export default function Signup() {

  const router = useRouter();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {

    if (!name || !username || !email || !password) {
      alert("Fill all details");
      return;
    }

    const existing = await AsyncStorage.getItem('users');
    const users = existing ? JSON.parse(existing) : [];

    const userExists = users.find(u => u.email === email);

    if (userExists) {
      alert("User already exists!");
      return;
    }

    users.push({ name, username, email, password });

    await AsyncStorage.setItem('users', JSON.stringify(users));

    alert("Signup successful!");
    router.replace('/');
  };

  return (
    <View style={styles.centerContainer}>
      <View style={styles.card}>

        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Sign Up</Text>

        <TextInput placeholder="Name" style={styles.input} onChangeText={setName} />
        <TextInput placeholder="Username" style={styles.input} onChangeText={setUsername} />
        <TextInput placeholder="Email" style={styles.input} onChangeText={setEmail} />
        <TextInput placeholder="Password" secureTextEntry style={styles.input} onChangeText={setPassword} />

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}