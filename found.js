import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { styles } from './styles';

export default function Found() {

  const router = useRouter();

  const [item, setItem] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState(null);

  // 📸 IMAGE PICK
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // ✅ SUBMIT
  const handleSubmit = async () => {

    if (!item || !description || !location || !date) {
      alert("Please fill all details");
      return;
    }

    const newItem = {
      id: "ID" + Date.now(),
      item,
      description,
      location,
      date,
      image
    };

    const existing = await AsyncStorage.getItem('foundItems');
    const data = existing ? JSON.parse(existing) : [];

    data.push(newItem);

    await AsyncStorage.setItem('foundItems', JSON.stringify(data));

    // clear form
    setItem('');
    setDescription('');
    setLocation('');
    setDate('');
    setImage(null);

    router.push('/success');
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
            <Text style={styles.title}>Report Found 📦</Text>
          </View>

          {/* FORM */}
          <View style={styles.card}>

            <TextInput
              placeholder="Item Name"
              value={item}
              onChangeText={setItem}
              style={styles.input}
            />

            <TextInput
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
              style={styles.input}
            />

            <TextInput
              placeholder="Location"
              value={location}
              onChangeText={setLocation}
              style={styles.input}
            />

            <TextInput
              placeholder="Date"
              value={date}
              onChangeText={setDate}
              style={styles.input}
            />

            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#10B981' }]}
              onPress={pickImage}
            >
              <Text style={styles.buttonText}>Upload Image</Text>
            </TouchableOpacity>

            {image && (
              <Image
                source={{ uri: image }}
                style={{
                  width: '100%',
                  height: 150,
                  borderRadius: 10,
                  marginTop: 10
                }}
              />
            )}

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>

          </View>

        </View>

      </View>

    </View>
  );
}