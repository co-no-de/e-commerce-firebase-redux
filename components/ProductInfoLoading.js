import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

const ProductInfoLoading = ({ width }) => {
  return (
    <View>
      <View>
        <Text>Loading title</Text>
      </View>

      <View>
        <Image style={{ width, height: width, contentFit: "cover" }} />
      </View>

      <View>
        <Text>Loading description</Text>
      </View>
    </View>
  );
};

export default ProductInfoLoading;

const styles = StyleSheet.create({});
