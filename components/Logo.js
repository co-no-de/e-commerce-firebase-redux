import { Image } from "expo-image";
import { Pressable, StyleSheet, View, Dimensions } from "react-native";
import { colors } from "../data";
import RowView from "./RowView";
import { Entypo } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import DefaultText from "./DefaultText";
import { useNavigation } from "@react-navigation/native";

const Logo = () => {
  const navigation = useNavigation();
  const { width } = Dimensions.get("window");
  const cart = useSelector(state => state.cart.cart);
  const numCartItems = cart
    .map(item => item.quantity)
    .reduce((curr, prev) => curr + prev, 0);

  return (
    <RowView style={styles.container}>
      <View>
        <Image
          style={{width: width * 0.7, height: width * 0.16, contentFit: 'contain'}}
          source={require("../assets/images/logo.jpg")}
        />
      </View>

      <RowView style={styles.cartContainer}>
        <Pressable
          onPress={() => navigation.navigate("Tab-Cart")}
          style={({ pressed }) => pressed && styles.pressed}
        >
          <RowView style={styles.cartContainer}>
            <Entypo name="shopping-cart" size={24} color={colors.white} />
            {numCartItems > 0 && (
              <View style={styles.itemNumContainer}>
                <DefaultText fontSize={12} style={styles.itemNumText}>
                  {numCartItems}
                </DefaultText>
              </View>
            )}
          </RowView>
        </Pressable>
      </RowView>
    </RowView>
  );
};

export default Logo;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.teal,
    alignItems: "center",
  },
  cartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'flex-end',
    height: 45,
  },
  itemNumContainer: {
    borderWidth: 1,
    borderColor: colors.white,
    height: 24,
    width: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  itemNumText: {
    color: colors.white,
  },
  pressed: {
    opacity: 0.7,
  },
});
