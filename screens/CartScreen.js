import { StyleSheet, View, ScrollView, Pressable, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { emptyCart } from "../redux/CartReducer";
import { colors } from "../data";
import CartItem from "../components/CartItem";
import { auth, db } from "../firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import Logo from "../components/Logo";
import DefaultText from "../components/DefaultText";
import { useEffect } from "react";
import HeadingText from "../components/HeadingText";
import RowView from "../components/RowView";

const CartScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const cart = useSelector(state => state.cart.cart);
  let user = auth.currentUser;

  const total = cart
    ?.map(item => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);
  const dispatch = useDispatch();

  async function placeOrder() {
    try {
      //Get user details

      const userDocRef = doc(db, "user-profiles", `${auth.currentUser.uid}`);
      const docSnap = await getDoc(userDocRef);

      const {
        city,
        country,
        email,
        firstName,
        houseNo,
        lastName,
        street,
        telephone,
        zipCode,
      } = docSnap.data();

      // let { orders } = docSnap.data();
      let { numOfOrders } = docSnap.data();

      const userDetails = {
        firstName,
        lastName,
        telephone,
        email,
      };

      const shippingAddress = {
        street,
        houseNo,
        zipCode,
        city,
        country,
      };

      const orderNumber = new Date().getTime();

      const orderData = {
        OrderedItems: cart,
        totalPrice: total,
        shippingAddress,
        userDetails,
        date: new Date(),
        orderNumber,
        userId: auth.currentUser.uid,
      };

      const newOrderRef = doc(collection(db, "orders"));

      await setDoc(newOrderRef, orderData);

      numOfOrders = numOfOrders + 1;

      await setDoc(userDocRef, { numOfOrders }, { merge: true });

      dispatch(emptyCart());

      Alert.alert(
        "Order placed succesfully",
        "You can view your order in your profile"
      );
    } catch (error) {
      console.log("error placing order on CartScreen", error);
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (auth.currentUser) {
        user = auth.currentUser;
      }
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View
      style={{ flex: 1, paddingTop: insets.top, backgroundColor: colors.teal }}
    >
      <Logo />
      {total != 0 ? (
        <HeadingText style={{ backgroundColor: colors.white }}>
          Your cart items
        </HeadingText>
      ) : (
        <HeadingText style={{ backgroundColor: colors.white }}>
          Your cart is currently empty
        </HeadingText>
      )}
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          {cart?.map((product, index) => (
            <CartItem product={product} key={index} />
          ))}
        </View>
      </ScrollView>

      {total != 0 && user && (
        <>
          <RowView style={styles.summaryContainer}>
            <HeadingText>Total : </HeadingText>
            <HeadingText>${total.toFixed(2)}</HeadingText>
          </RowView>
          <View style={styles.orderBtnContainer}>
            <Pressable
              onPress={placeOrder}
              style={({ pressed }) => [
                styles.orderPressable,
                pressed && styles.pressed,
              ]}
            >
              <DefaultText>Place Order</DefaultText>
            </Pressable>
          </View>
        </>
      )}

      {!user && total != 0 && (
        <>
          <RowView style={styles.summaryContainer}>
            <HeadingText>Total : </HeadingText>
            <HeadingText>${total.toFixed(2)}</HeadingText>
          </RowView>
          <View style={styles.orderBtnContainer}>
            <Pressable
              onPress={() => navigation.navigate("LogInScreen")}
              style={({ pressed }) => [
                styles.logInPressable,
                pressed && styles.pressed,
              ]}
            >
              <DefaultText>Log in to place your order</DefaultText>
            </Pressable>
          </View>
        </>
      )}

      <View style={{ height: 30, backgroundColor: colors.white }}></View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollView: {
    backgroundColor: colors.white,
  },
  orderPressable: {
    backgroundColor: colors.yellow,
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 10,
  },
  logInPressable: {
    backgroundColor: colors.lightGray,
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 10,
  },
  summaryContainer: {
    padding: 10,
    backgroundColor: colors.white,
  },
  orderBtnContainer: {
    backgroundColor: colors.white,
  },
  pressed: {
    opacity: 0.7,
  },
});
