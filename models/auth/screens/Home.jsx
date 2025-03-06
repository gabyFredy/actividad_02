import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { Card, Image } from 'react-native-elements';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/utils/firebaseConnections";

const { width } = Dimensions.get('window');

export default function Home({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "product"));
        const productArray = [];
        querySnapshot.forEach((doc) => {
          const product = { id: doc.id, ...doc.data() }; // Ensure the ID is included
          console.log(`${doc.id} => ${doc.data()}`);
          productArray.push(product);
        });
        setProducts(productArray);
      } catch (error) {
        console.log("Error getting documents: ", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const renderProduct = ({ item }) => (
    <TouchableOpacity>
      <Card containerStyle={styles.card}>
        <Image
          source={{ uri: item.imagen ? item.imagen[0] : 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50' }}
          style={styles.image}
        />
        <Text style={styles.name}>{item.nombre}</Text>
        <Text style={styles.price}>${item.precio}</Text>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id} // Ensure the key is unique
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  card: {
    width: (width - 40) / 2,
    margin: 0,
    borderRadius: 10,
    padding: 10,
    marginBottom: 90,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  price: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
});
