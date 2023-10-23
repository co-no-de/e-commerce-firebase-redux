import { Image } from "expo-image";
import { StyleSheet, View, Pressable } from "react-native";
import { colors } from "../data";
import { useNavigation } from "@react-navigation/native";
import DefaultText from "./DefaultText";
import RowView from "./RowView";
import HeadingText from "./HeadingText";

const CategoryItem = ({ product }) => {
  const navigation = useNavigation();

  function navigationToDetailScreen(product) {
    navigation.navigate("ProductDetailsScreen", { productId: product.id });
  }

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => pressed && styles.pressed}
        onPress={() => navigationToDetailScreen(product)}
      >
        <RowView style={styles.innerContainerTop}>
          <Image style={styles.image} source={{ uri: product.image }} />

          <DefaultText numberOfLines={3} style={styles.titleText}>
            {product.title}
          </DefaultText>
          <HeadingText style={styles.price}>${product.price}</HeadingText>
        </RowView>
      </Pressable>
    </View>
  );
};

export default CategoryItem;

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
  image: {
    width: 70,
    height: 70,
    contentFit: "contain",
  },
  titleText: {
    width: 150,
    marginTop: 10,
  },
  price: {
    marginTop: 6,
  },
  pressed: {
    opacity: 0.7,
  },
});
