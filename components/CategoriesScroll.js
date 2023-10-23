import { StyleSheet, View, ScrollView, Pressable } from "react-native";
import { colors } from "../data";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import HeadingText from "./HeadingText";
import DefaultText from "./DefaultText";

const CategoriesScroll = () => {
  const navigation = useNavigation();

  function navigationToCategorycreen(category) {
    navigation.navigate("ProductCategoryScreen", { category });
  }

  const categories = [
    {
      id: "0",
      image:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-firebase-131e5.appspot.com/o/Cameras%20and%20Photography%20Equipment.jpg?alt=media&token=01ce417f-7894-4c33-8299-8638a8f68986",
      name: "Cameras and Photography Equipment",
    },
    {
      id: "1",
      image:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-firebase-131e5.appspot.com/o/External%20Drives%20and%20Storage.jpg?alt=media&token=2e739d75-fb0a-419a-8f30-7335b5349aed",
      name: "External Drives and Storage",
    },
    {
      id: "2",
      image:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-firebase-131e5.appspot.com/o/Gaming%20Consoles%20and%20Accessories.jpg?alt=media&token=744e8b51-5c9c-4e27-a23d-bf228ad6b46b",
      name: "Gaming Consoles and Accessories",
    },
    {
      id: "3",
      image:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-firebase-131e5.appspot.com/o/Headphones%20and%20Audio%20Equipment.jpg?alt=media&token=84990fdc-34a8-46f9-86a8-bb936822899f",
      name: "Headphones and Audio Equipment",
    },
    {
      id: "4",
      image:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-firebase-131e5.appspot.com/o/Laptops%20and%20Computers.jpg?alt=media&token=2b96ba57-73f1-490f-b6a8-48b51a64e441",
      name: "Laptops and Computers",
    },
    {
      id: "5",
      image:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-firebase-131e5.appspot.com/o/Monitors%20and%20Displays.jpg?alt=media&token=3ee6ba92-e82c-4a1f-856d-24ece07981f0",
      name: "Monitors and Displays",
    },
    {
      id: "6",
      image:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-firebase-131e5.appspot.com/o/Scanners%20and%20Printers.jpg?alt=media&token=d56d2ff4-a06c-432c-b214-8f97b978106f",
      name: "Scanners and Printers",
    },
    {
      id: "7",
      image:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-firebase-131e5.appspot.com/o/Smartphones.jpg?alt=media&token=651d22fb-a445-45ac-bf84-9aaf6a1cfea3",
      name: "Smartphones",
    },
    {
      id: "9",
      image:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-firebase-131e5.appspot.com/o/Tablets%20and%20E-Readers.jpg?alt=media&token=6cc7312a-acfa-48e6-a258-236a08eae90b",
      name: "Tablets and E-Readers",
    },
  ];

  return (
    <View style={styles.container}>
      <HeadingText fontSize={20}>Browse a category</HeadingText>
      <ScrollView horizontal style={styles.scrollHorizontal}>
        {categories.map(category => (
          <View key={category.id} style={styles.innerContainer}>
            <Pressable
              style={({ pressed }) => pressed && styles.pressed}
              onPress={() => navigationToCategorycreen(category.name)}
            >
              <Image
                source={{ uri: category.image }}
                style={styles.scrollImage}
              />
              <DefaultText fontSize={12} style={styles.scrollImageText}>
                {category.name}
              </DefaultText>
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default CategoriesScroll;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  innerContainer: {
    width: 120,
    marginHorizontal: 12,
  },
  scrollHorizontal: {
    padding: 5,
  },
  scrollImage: {
    width: 120,
    height: 120,
    contentFit: "contain",
  },
  scrollImageText: {
    textAlign: "center",
    marginTop: 5,
  },
  pressed: {
    opacity: 0.7,
  },
});
