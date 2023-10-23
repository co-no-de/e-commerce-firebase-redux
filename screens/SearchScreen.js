import {
  StyleSheet,
  View,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../data";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import SearchResult from "../components/SearchResult";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import Logo from "../components/Logo";
import { Image } from "expo-image";

const SearchScreen = () => {
  const insets = useSafeAreaInsets();
  const [input, setInput] = useState("");
  const [foundProducts, setFoundProducts] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  async function searchProducts(text) {
    setInput(text);
    if (text.length > 2) {
      setShowLoader(true);

      const productsRef = collection(db, "products");

      let searchText = text.toLowerCase();

      const q = query(
        productsRef,
        where("arrayTitle", "array-contains-any", [searchText])
      );

      let productsArray = [];

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(doc => {
        productsArray.push(doc.data());
      });

      const q2 = query(
        productsRef,
        where("arrayCategory", "array-contains-any", [searchText])
      );

      const querySnapshot2 = await getDocs(q2);

      querySnapshot2.forEach(doc => {
        productsArray.push(doc.data());
      });

      let idsArray = productsArray.map(product => product.id);

      function removeusingSet(arr) {
        let outputArray = Array.from(new Set(arr));
        return outputArray;
      }

      idsArray = removeusingSet(idsArray);

      let uniqueProductArray = [];

      for (let i = 0; i < productsArray.length; i++) {
        if (idsArray.includes(productsArray[i].id)) {
          let id = idsArray.indexOf(productsArray[i].id);
          delete idsArray[id];
          uniqueProductArray.push(productsArray[i]);
        }
      }

      setFoundProducts(uniqueProductArray);

      if (uniqueProductArray.length > 0) {
        setShowLoader(false);
      }
    } else {
      setFoundProducts([]);
      setShowLoader(false);
    }
  }

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        backgroundColor: colors.teal,
      }}
    >
      <Logo />
      <View style={styles.container}>
        <Pressable
          style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
        >
          <AntDesign
            style={styles.icon}
            name="search1"
            size={22}
            color="black"
          />
          <TextInput
            value={input}
            style={styles.input}
            placeholder="Search products"
            onChangeText={text => searchProducts(text)}
          />
        </Pressable>
      </View>
      <ScrollView style={styles.scrollView}>
        {showLoader && (
          <View style={styles.loaderContainer}>
            <Image
              source={require("../assets/images/search-loader.gif")}
              style={{ width: 100, height: 30, contentFit: "contain" }}
            />
          </View>
        )}
        {foundProducts &&
          foundProducts.map(product => (
            <SearchResult key={product.id} product={product} />
          ))}
      </ScrollView>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: 70,
  },
  input: {
    padding: 10,
    flex: 1
  },
  pressable: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 7,
    gap: 10,
    backgroundColor: colors.white,
    borderRadius: 3,
   
  },
  scrollView: {
    backgroundColor: colors.white,
  },
  image: {
    width: 70,
    height: 70,
    contentFit: "cover",
  },
  pressed: {
    opacity: 0.7,
  },
  loaderContainer: {
    padding: 9,
  },
  icon: {
    marginLeft: 7
  }
});
