import { ScrollView, View, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../data";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import NewestProducts from "../components/NewestProducts";
import SaleProducts from "../components/SaleProducts";
import CategoriesScroll from "../components/CategoriesScroll";
import Logo from "../components/Logo";
import { Image } from "expo-image";

const HomeScreen = () => {
  const insets = useSafeAreaInsets();

  const [newProductsLoaded, setNewProductsLoaded] = useState(false);
  const [saleProductsLoaded, setSaleProductsLoaded] = useState(false);

  const [newProducts, setNewProducts] = useState(false);
  const [saleProducts, setSaleProducts] = useState(false);

  const { width } = Dimensions.get("window");

  const imageSize = width * 0.8;

  useEffect(() => {
    async function getFrontPageProducts() {
      const productsRef = collection(db, "products");

      const q = query(productsRef, orderBy("sortDate", "desc"));

      const querySnapshot = await getDocs(q);

      let productsArray = [];
      querySnapshot.forEach(doc => {
        let {
          description,
          discountPrice,
          image,
          price,
          sale,
          title,
          id,
          category,
        } = doc.data();

        if (!discountPrice) {
          discountPrice = 0;
        }

        const product = {
          id,
          description,
          discountPrice,
          image,
          price,
          sale,
          title,
          category,
        };

        productsArray.push(product);
      });

      const newProductsArray = productsArray.filter(product => !product.sale).slice(0,6)   

      const saleProductsArray = productsArray.filter(product => product.sale);

      setNewProducts(newProductsArray);
      setSaleProducts(saleProductsArray);

      setNewProductsLoaded(true);
      setSaleProductsLoaded(true);
    }

    getFrontPageProducts();
  }, []);

  if (!newProductsLoaded || !saleProductsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.white,
          paddingTop: insets.top,
          backgroundColor: colors.teal,
        }}
      >
        <Logo />

        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            backgroundColor: colors.white,
          }}
        >
          <Image
            source={require("../assets/images/loading.gif")}
            style={{
              width: imageSize,
              height: imageSize / 10,
              contentFit: "contain",
            }}
          />
        </View>
      </View>
    );
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
      <ScrollView>
        <CategoriesScroll />

        <NewestProducts newProducts={newProducts} />

        <SaleProducts saleProducts={saleProducts} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
