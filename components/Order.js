import { Pressable, StyleSheet, View } from "react-native";
import { colors } from "../data";
import { Image } from "expo-image";
import { useState } from "react";
import DefaultText from "./DefaultText";
import RowView from "./RowView";

const Order = ({ order }) => {
  const date = new Date(order.date.toDate());
  const [orderShown, setOrderShow] = useState(false);

  return (
    <View style={styles.container}>
      <RowView>
        <View style={styles.orderData}>
          <DefaultText>Order date: {date.toDateString()}</DefaultText>
          <DefaultText>Ordernumber: {order.orderNumber}</DefaultText>
        </View>
        <Pressable
          style={({ pressed }) => pressed && styles.pressed}
          onPress={() => setOrderShow(!orderShown)}
        >
          <DefaultText style={styles.toggleOpen}>+</DefaultText>
        </Pressable>
      </RowView>
      {orderShown && (
        <View>
          <View>
            <DefaultText>Order items:</DefaultText>
            {order.OrderedItems.map((product, index) => (
              <View key={index}>
                <RowView style={styles.productContainer}>
                  <DefaultText style={styles.quantityText}>
                    {product.quantity}x
                  </DefaultText>
                  <View style={styles.imageContainer}>
                    <Image
                      source={{ uri: product.image }}
                      style={styles.image}
                    />
                  </View>
                  <View style={styles.textContainer}>
                    <DefaultText style={styles.productText}>
                      {product.title}
                    </DefaultText>
                    <DefaultText style={styles.productText}>
                      ${product.price}
                    </DefaultText>
                  </View>
                </RowView>
              </View>
            ))}
          </View>

          <View style={styles.shippingContainer}>
            <DefaultText>Shipping details:</DefaultText>

            <RowView>
              <DefaultText>
                {order.userDetails.firstName} {order.userDetails.lastName}
              </DefaultText>
            </RowView>

            <RowView>
              <DefaultText>{order.shippingAddress.street} </DefaultText>
              <DefaultText>{order.shippingAddress.houseNo}</DefaultText>
            </RowView>

            <RowView>
              <DefaultText>{order.shippingAddress.zipCode} </DefaultText>
              <DefaultText>{order.shippingAddress.city}</DefaultText>
            </RowView>

            <DefaultText>{order.shippingAddress.country}</DefaultText>
          </View>
        </View>
      )}

      <RowView>
        <DefaultText>Total order price: </DefaultText>
        <DefaultText>${order.totalPrice.toFixed(2)}</DefaultText>
      </RowView>
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    marginVertical: 7,
    padding: 8,
    borderColor: colors.darkBlue,
    borderTopWidth: 2,
    backgroundColor: colors.lightGray,
  },
  orderData: {
    flex: 1,
  },
  image: {
    width: 80,
    height: 80,
  },
  productContainer: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    marginBottom: 8,
    backgroundColor: colors.white,
  },
  quantityText: {
    padding: 6,
    textAlign: "center",
  },
  imageContainer: {
    width: 80,
    margin: 8,
  },
  textContainer: {
    flex: 1,
    paddingRight: 4,
  },
  productText: {
    textAlign: "center",
  },

  toggleOpen: {
    fontSize: 33,
    paddingRight: 10,
  },
  shippingContainer: {
    marginVertical: 3,
  },
  pressed: {
    opacity: 0.7,
  },
});
