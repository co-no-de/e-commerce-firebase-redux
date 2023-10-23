import { StyleSheet, View, Pressable } from "react-native";
import { colors } from "../data";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import DefaultText from "./DefaultText";
import RowView from "./RowView";
import HeadingText from "./HeadingText";

const NewestProducts = ({ newProducts }) => {
  const navigation = useNavigation();

  function navigationToDetailScreen(product) {
    navigation.navigate("ProductDetailsScreen", { productId: product.id });
  }

  return (
    <View style={styles.container}>
      {newProducts.length > 0 ? (
        <View>
          <HeadingText>Our newest products</HeadingText>
          <RowView style={styles.newestContainer}>
            {newProducts.map(product => (
              <Pressable
                key={product.id}
                style={({ pressed }) => [
                  styles.newestPressable,
                  pressed && styles.pressed,
                ]}
                onPress={() => navigationToDetailScreen(product)}
              >
                <View style={styles.innerContainer}>
                  <HeadingText
                    fontSize={16}
                    numberOfLines={2}
                    style={styles.alignTextCenter}
                  >
                    {product.title}
                  </HeadingText>

                  <Image
                    style={styles.newestImage}
                    source={{ uri: product.image }}
                  />
                  <DefaultText style={styles.alignTextCenter}>
                    ${product.price.toString()}
                  </DefaultText>
                </View>
              </Pressable>
            ))}
          </RowView>
        </View>
      ) : (
        <HeadingText>Loading our newest products.....</HeadingText>
      )}
    </View>
  );
};

export default NewestProducts;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  newestContainer: {
    flexWrap: "wrap",
    paddingBottom: 12,
  },
  newestImage: {
    height: 180,
    contentFit: "cover",
    marginVertical: 4,
  },
  newestPressable: {
    width: "50%",
    marginVertical: 10,
    padding: 10,
    alignItem: "center",
  },
  alignTextCenter: {
    textAlign: "center",
    marginHorizontal: 5,
  },
  innerContainer: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    elevation: 4,
    backgroundColor: colors.white,
    paddingVertical: 6,
  },
  pressed: {
    opacity: 0.7,
  },
});
