import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { StyleSheet, View, ScrollView, Pressable } from "react-native";
import { colors } from "../data";
import DefaultText from "./DefaultText";
import HeadingText from "./HeadingText";

const SaleProducts = ({ saleProducts }) => {
  const navigation = useNavigation();

  function navigationToDetailScreen(product) {
    navigation.navigate("ProductDetailsScreen", { productId: product.id });
  }

  return (
    <View style={styles.container}>
      {saleProducts.length > 0 ? (
        <>
          <HeadingText>Current deals</HeadingText>
          <ScrollView horizontal style={styles.offersContainer}>
            {saleProducts.map(product => (
              <Pressable
                key={product.id}
                style={({ pressed }) => [
                  styles.offerPressable,
                  pressed && styles.pressed,
                ]}
                onPress={() => navigationToDetailScreen(product)}
              >
                <View style={styles.innerContainer}>
                  <Image
                    style={styles.offerIMage}
                    source={{ uri: product.image }}
                  />
                  <View style={styles.saleProductsContainer}>
                    <DefaultText
                      numberOfLines={2}
                      style={styles.saleProductStyle}
                    >
                      {product.title}
                    </DefaultText>
                    <DefaultText style={styles.offer}>
                      ${product.discountPrice}
                    </DefaultText>
                  </View>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </>
      ) : (
        <HeadingText>Loading our deals.....</HeadingText>
      )}
    </View>
  );
};

export default SaleProducts;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingBottom: 0,
  },
  offersContainer: {
    paddingVertical: 10,
  },
  offerPressable: {
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  offerIMage: {
    width: 160,
    height: 160,
    contentFit: "cover",
  },
  offer: {
    backgroundColor: colors.red,
    marginTop: 4,
    padding: 4,
    borderRadius: 5,
    width: 100,
    textAlign: "center",
  },
  saleProductsContainer: {
    width: 160,
    alignItems: "center",
    padding: 6,
  },
  saleProductStyle: {
    textAlign: "center",
  },
  innerContainer: {
    backgroundColor: colors.white,
    elevation: 2,
    alignItems: "center",
    marginBottom: 10,
  },
  pressed: {
    opacity: 0.7,
  },
});
