import { Image } from "expo-image";
import { StyleSheet, View, Pressable } from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../redux/CartReducer";
import { colors, fonts } from "../data";
import { useNavigation } from "@react-navigation/native";
import DefaultText from "./DefaultText";
import RowView from "./RowView";
import HeadingText from "./HeadingText";

const Cartproduct = ({ product }) => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const increaseQuantity = item => {
    dispatch(incrementQuantity(item));
  };
  const decreaseQuantity = item => {
    dispatch(decrementQuantity(item));
  };
  const deleteproduct = item => {
    dispatch(removeFromCart(item));
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => pressed && styles.pressed}
        onPress={() =>
          navigation.navigate("ProductDetailsScreen", { productId: product.id })
        }
      >
        <RowView style={styles.innerContainerTop}>
          <Image style={styles.image} source={{ uri: product.image }} />

          <DefaultText numberOfLines={3} fontSize={16} style={styles.titleText}>
            {product.title}
          </DefaultText>
          <HeadingText>${product.price}</HeadingText>
        </RowView>
      </Pressable>

      <RowView style={styles.innerContainerBottom}>
        {product.quantity > 1 ? (
          <Pressable
            onPress={() => decreaseQuantity(product)}
            style={({ pressed }) => [
              styles.quantityBtn,
              pressed && styles.pressed,
            ]}
          >
            <AntDesign name="minus" size={24} color="black" />
          </Pressable>
        ) : (
          <Pressable
            onPress={() => deleteproduct(product)}
            style={({ pressed }) => [
              styles.quantityBtn,
              pressed && styles.pressed,
            ]}
          >
            <AntDesign name="delete" size={24} color="black" />
          </Pressable>
        )}

        <Pressable
          style={({ pressed }) => [styles.quantity, pressed && styles.pressed]}
        >
          <DefaultText style={styles.quantity}>{product.quantity}</DefaultText>
        </Pressable>

        <Pressable
          onPress={() => increaseQuantity(product)}
          style={({ pressed }) => [
            styles.quantityBtn,
            pressed && styles.pressed,
          ]}
        >
          <Feather name="plus" size={24} color="black" />
        </Pressable>
        <Pressable
          onPress={() => deleteproduct(product)}
          style={({ pressed }) => [styles.deleteBtn, pressed && styles.pressed]}
        >
          <DefaultText>Remove</DefaultText>
        </Pressable>
      </RowView>
    </View>
  );
};

export default Cartproduct;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 9,
    margin: 20,
    elevation: 2,
  },
  innerContainerTop: {
    gap: 10,
    marginBottom: 5,
  },
  innerContainerBottom: {
    gap: 5,
  },
  image: { width: 70, height: 70, contentFit: "contain" },
  deleteBtn: {
    backgroundColor: colors.red,
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 5,
    borderColor: colors.lightGray,
    borderWidth: 0.6,
  },
  quantity: {
    backgroundColor: colors.white,
    paddingHorizontal: 18,
    paddingVertical: 6,
  },
  quantityBtn: {
    backgroundColor: colors.lightGray,
    padding: 7,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  titleText: {
    width: 150,
    marginTop: 10,
    fontFamily: fonts.textFont,
  },
  price: {
    marginTop: 6,
  },
  quantity: {
    paddingHorizontal: 4,
  },
  pressed: {
    opacity: 0.7,
  },
});
