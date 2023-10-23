import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors, fonts } from "../data";
import { Ionicons } from "@expo/vector-icons";
import {
  ProductDetailsScreen,
  ProductCategoryScreen,
  CartScreen,
  ProfileScreen,
  HomeScreen,
  LogInScreen,
  RegisterScreen,
  SearchScreen,
} from "../screens";
import { StyleSheet } from "react-native";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      backBehavior="history"
    >
      <Tab.Screen
        name="Tab-Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="home" size={24} color={colors.black} />
            ) : (
              <Ionicons name="home-outline" size={24} color={colors.black} />
            ),
        }}
      />

      <Tab.Screen
        name="Tab-Search"
        component={SearchScreen}
        options={{
          tabBarLabel: "Search",
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons
                name="ios-search-circle-sharp"
                size={24}
                color={colors.black}
              />
            ) : (
              <Ionicons
                name="ios-search-circle-outline"
                size={24}
                color={colors.black}
              />
            ),
        }}
      />

      <Tab.Screen
        name="Tab-Cart"
        component={CartScreen}
        options={{       
          tabBarButton: (props) => null, //this is additional if you want to hide the tab element from the bottom nav
        }}
      />

      <Tab.Screen
        name="Tab-Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="person-sharp" size={24} color={colors.black} />
            ) : (
              <Ionicons name="person-outline" size={24} color={colors.black} />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="HomeTabs" component={BottomTabs} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />

        <Stack.Screen name="LogInScreen" component={LogInScreen} />

        <Stack.Screen
          name="ProductDetailsScreen"
          component={ProductDetailsScreen}
        />
        <Stack.Screen
          name="ProductCategoryScreen"
          component={ProductCategoryScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;

const styles = StyleSheet.create({
  tabBarLabelStyle: {
    color: colors.black,
    fontFamily: fonts.titleFont,
  },
});
