import { StyleSheet, View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../data";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import CategoryItem from "../components/CategoryItem";
import Logo from "../components/Logo";
import HeadingText from "../components/HeadingText";
import DefaultText from "../components/DefaultText";

const ProductCategoryScreen = ({ route }) => {
  const { category } = route.params;

  const insets = useSafeAreaInsets();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProductsFromCategory() {
      const q = query(
        collection(db, "products"),
        where("category", "==", category)
      );
      let productsArray = [];

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => {
        productsArray.push(doc.data());
      });

      setProducts(productsArray);
    }

    getProductsFromCategory();
  }, [category]);

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
        <HeadingText>{category}</HeadingText>
        <ScrollView>
          {products.length > 0 ? (
            <View>
              {products.map(product => (
                <CategoryItem product={product} key={product.id} />
              ))}
            </View>
          ) : (
            <DefaultText>Loading product from this category</DefaultText>
          )}
          <View style={{ height: 30 }}></View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ProductCategoryScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
});
