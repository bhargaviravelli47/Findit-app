import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { styles } from './styles';

export default function Home() {

  const router = useRouter();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const email = await AsyncStorage.getItem('currentUser');
    const data = await AsyncStorage.getItem('users');
    const users = data ? JSON.parse(data) : [];

    const user = users.find(u => u.email === email);

    if (user) {
      setUserName(user.username || user.email);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.clear();
    router.replace('/');
  };

  return (

    // 🔥 FULL SCREEN
    <View style={{ flex: 1, backgroundColor: '#EEF2FF' }}>

      {/* 🔥 CENTER FIX */}
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>

        {/* 🔥 WIDTH CONTROL */}
        <View style={{ width: '100%', maxWidth: 400 }}>

          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.title}>FindIt 🔍</Text>
            <Text style={{ color: 'white', marginTop: 5 }}>
              Welcome {userName ? userName : 'User'} 👋
            </Text>
          </View>

          {/* MAIN CARD */}
          <View style={styles.card}>

            <Text style={{
              textAlign: 'center',
              marginBottom: 15,
              fontSize: 16
            }}>
              Choose an option
            </Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push('/lost')}
            >
              <Text style={styles.buttonText}>Report Lost</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push('/found')}
            >
              <Text style={styles.buttonText}>Report Found</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push('/helpdesk')}
            >
              <Text style={styles.buttonText}>Help Desk</Text>
            </TouchableOpacity>

            {/* LOGOUT */}
            <TouchableOpacity onPress={handleLogout}>
              <Text style={{
                textAlign: 'center',
                marginTop: 15,
                color: 'red',
                fontWeight: 'bold'
              }}>
                Logout
              </Text>
            </TouchableOpacity>

          </View>

        </View>

      </View>

    </View>
  );
}