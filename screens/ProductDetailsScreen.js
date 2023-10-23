import {
  View,
  Pressable,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { colors } from "../data";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartReducer";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Logo from "../components/Logo";
import HeadingText from "../components/HeadingText";
import DefaultText from "../components/DefaultText";
import { auth, db } from "../firebase";
import RowView from "../components/RowView";
import { collection, getDocs, query, where, limit } from "firebase/firestore";
import { addVisitedProducts } from "../redux/ProductsReducer";

export default function ProductDetailsScreen({ route, navigation }) {
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(false);

  const currentUser = auth.currentUser;

  const { productId } = route.params;

  const cart = useSelector(state => state.cart.cart);
  const visitedProducts = useSelector(state => state.products.visitedProducts);

  const insets = useSafeAreaInsets();

  const { width } = Dimensions.get("window");

  const [addedToCart, setAddedToCart] = useState(false);

  const dispatch = useDispatch();

  // HIER MOET HET MET ALGORIA BETER KUNNEN KWA ZOEKEN

  function addItemToCart(product) {
    setAddedToCart(true);

    const cartItem = {
      ...product,
      price: product.discountPrice ? product.discountPrice : product.price,
    };

    dispatch(addToCart(cartItem));
  }

  useEffect(() => {
    const isInCart = cart.find(item => item.id === productId);

    if (isInCart) {
      setAddedToCart(true);
    }
  }, [cart]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      async function getProduct() {
        let viewedProduct;

        visitedProducts.find(product => {
          if (product.id === productId) {
            viewedProduct = product;
          }
        });

        if (viewedProduct) {
          setProduct(viewedProduct);
        } else {
          setLoading(true);
          const productsRef = collection(db, "products");

          const snapShot = await getDocs(
            query(productsRef, where("id", "==", productId), limit(1))
          );

          if (snapShot.docs) {
            const pageProduct = snapShot.docs[0].data();
            setProduct(pageProduct);
            dispatch(
              addVisitedProducts({ id: productId, product: pageProduct })
            );
            setLoading(false);
          }
        }
      }

      getProduct();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        backgroundColor: colors.teal,
      }}
    >
      <Logo />

      {product && !loading ? (
        <ScrollView style={styles.scrollView}>
          <HeadingText>{product.title}</HeadingText>
          <Image
            style={{ width, height: width, contentFit: "cover" }}
            source={{ uri: product.image }}
          />

          <View style={styles.productDetails}>
            <DefaultText>{product.description}</DefaultText>

            {product.sale ? (
              <View>
                <HeadingText
                  style={{
                    textAlign: "left",
                    textDecorationLine: "line-through",
                  }}
                >
                  ${product.price}
                </HeadingText>
                <RowView>
                  <HeadingText style={{ textAlign: "left", color: "red" }}>
                    Sale!
                  </HeadingText>
                  <HeadingText
                    style={{
                      textAlign: "left",
                    }}
                  >
                    ${product.discountPrice}
                  </HeadingText>
                </RowView>
              </View>
            ) : (
              <HeadingText style={{ textAlign: "left" }}>
                ${product.price}
              </HeadingText>
            )}
          </View>

          <Pressable
            onPress={() => addItemToCart(product)}
            style={({ pressed }) => [
              styles.addPressable,
              pressed && styles.pressed,
            ]}
          >
            {addedToCart ? (
              <View>
                <DefaultText>Add more to Cart</DefaultText>
              </View>
            ) : (
              <DefaultText>Add to Cart</DefaultText>
            )}
          </Pressable>

          {addedToCart && currentUser && (
            <Pressable
              style={({ pressed }) => [
                styles.buyPressableActive,
                pressed && styles.pressed,
              ]}
              onPress={() => navigation.navigate("Tab-Cart")}
            >
              <DefaultText>Buy Now</DefaultText>
            </Pressable>
          )}

          {addedToCart && !currentUser && (
            <Pressable
              style={({ pressed }) => [
                styles.buyPressableInActive,
                pressed && styles.pressed,
              ]}
              onPress={() => navigation.navigate("LogInScreen")}
            >
              <DefaultText>Log in to your account to buy</DefaultText>
            </Pressable>
          )}
          <View style={{ height: 30 }}></View>
        </ScrollView>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: colors.white,
            paddingTop: insets.top,
            backgroundColor: colors.teal,
          }}
        >
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
              style={{ width, height: width, contentFit: "contain" }}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: colors.white,
  },
  buyPressableActive: {
    backgroundColor: colors.darkYellow,
    padding: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  buyPressableInActive: {
    backgroundColor: colors.lightGray,
    padding: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  addPressable: {
    backgroundColor: colors.yellow,
    padding: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  productDetails: {
    padding: 10,
  },
  pressed: {
    opacity: 0.7,
  },
});
