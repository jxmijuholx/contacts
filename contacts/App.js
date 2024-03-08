import * as Contacts from 'expo-contacts';
import React, { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
      });
      if (data.length === 0) {
        return;
      }
      const formattedContacts = data.map(contact => {
        const name = contact.name || '';
      
        let phoneNumber = 'N/A';
        if (contact.phoneNumbers.length > 0) {
          const firstPhoneNumber = contact.phoneNumbers[0];
          if (firstPhoneNumber.number) {
            phoneNumber = firstPhoneNumber.number;
          }
        }
        return { name, phoneNumber };
      });
      setContacts(formattedContacts);
      
    } else {
      console.log('Contacts permission denied');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Get Contacts" onPress={getContacts} />
      <FlatList
        data={contacts}
        renderItem={({ item }) => (
          <View style={styles.contactContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.phoneNumber}>{item.phoneNumber}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  contactContainer: {
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  phoneNumber: {
    fontSize: 16,
    color: 'gray',
  },
});
