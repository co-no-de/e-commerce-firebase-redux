import { Image } from "expo-image";
import { StyleSheet, View, Pressable } from "react-native";
import { colors } from "../data";
import { useNavigation } from "@react-navigation/native";
import DefaultText from "./DefaultText";
import RowView from "./RowView";
import HeadingText from "./HeadingText";

const SearchResult = ({ product }) => {
  const navigation = useNavigation();

  function navigationToDetailScreen(product) {
    navigation.navigate("ProductDetailsScreen", { productId: product.id });
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigationToDetailScreen(product)}>
        <RowView style={styles.innerContainerTop}>
          <Image style={styles.image} source={{ uri: product.image }} />
          <DefaultText style={styles.titleText}>{product.title}</DefaultText>
          <HeadingText style={styles.price}>${product.price}</HeadingText>
        </RowView>
      </Pressable>
    </View>
  );
};

export default SearchResult;

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
});
