import { View, Text, ScrollView, TextInput, Image } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';

export default function Helpdesk() {

  const [foundData, setFoundData] = useState([]);
  const [lostData, setLostData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  
  const loadData = async () => {
    const found = await AsyncStorage.getItem('foundItems');
    const lost = await AsyncStorage.getItem('lostItems');

    setFoundData(found ? JSON.parse(found) : []);
    setLostData(lost ? JSON.parse(lost) : []);
  };

  
  const filteredLost = lostData.filter(i =>
    i.item.toLowerCase().includes(search.toLowerCase())
  );

  const filteredFound = foundData.filter(i =>
    i.item.toLowerCase().includes(search.toLowerCase())
  );

  
  const isSimilar = (a, b) => {
    const t1 = a.toLowerCase();
    const t2 = b.toLowerCase();
    return t1.includes(t2) || t2.includes(t1);
  };

  const checkMatch = (lostItem, foundItem) => {

    let score = 0;

    if (isSimilar(lostItem.item, foundItem.item)) score++;
    if (isSimilar(lostItem.description, foundItem.description)) score++;
    if (isSimilar(lostItem.location, foundItem.location)) score++;

    return score >= 2;
  };

  return (
    <ScrollView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Help Desk 🛠️</Text>
      </View>

      {/* SEARCH */}
      <TextInput
        placeholder="Search item..."
        value={search}
        onChangeText={setSearch}
        style={styles.input}
      />

      {/* LOST ITEMS */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
        Lost Items
      </Text>

      {filteredLost.length === 0 ? (
        <Text>No lost items</Text>
      ) : (
        filteredLost.map((item) => {

          const isMatch = foundData.some(f => checkMatch(item, f));

          return (
            <View
              key={item.id}
              style={[
                styles.card,
                {
                  backgroundColor: isMatch ? '#FEF3C7' : '#E0F2FE'
                }
              ]}
            >

              {/* IMAGE */}
              {item.image && (
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: '100%',
                    height: 120,
                    borderRadius: 10,
                    marginBottom: 10
                  }}
                />
              )}

              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                {item.item}
              </Text>

              <Text>📄 {item.description}</Text>
              <Text>📍 {item.location}</Text>
              <Text>📅 {item.date}</Text>
              <Text>ID: {item.id}</Text>

              {isMatch && (
                <Text style={{
                  color: 'green',
                  fontWeight: 'bold',
                  marginTop: 5
                }}>
                  ✅ Match Found!
                </Text>
              )}

            </View>
          );
        })
      )}

      {/* FOUND ITEMS */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 20 }}>
        Found Items
      </Text>

      {filteredFound.length === 0 ? (
        <Text>No found items</Text>
      ) : (
        filteredFound.map((item) => {

          const isMatch = lostData.some(l => checkMatch(l, item));

          return (
            <View
              key={item.id}
              style={[
                styles.card,
                {
                  backgroundColor: isMatch ? '#FEF3C7' : '#DCFCE7'
                }
              ]}
            >

              {item.image && (
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: '100%',
                    height: 120,
                    borderRadius: 10,
                    marginBottom: 10
                  }}
                />
              )}

              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                {item.item}
              </Text>

              <Text>📄 {item.description}</Text>
              <Text>📍 {item.location}</Text>
              <Text>📅 {item.date}</Text>
              <Text>ID: {item.id}</Text>

              {isMatch && (
                <Text style={{
                  color: 'green',
                  fontWeight: 'bold',
                  marginTop: 5
                }}>
                  ✅ Match Found!
                </Text>
              )}

            </View>
          );
        })
      )}

    </ScrollView>
  );
}
