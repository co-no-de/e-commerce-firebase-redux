import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, fonts } from "../data";
import { MaterialIcons, AntDesign, Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Logo from "../components/Logo";
import HeadingText from "../components/HeadingText";
import DefaultText from "../components/DefaultText";
import RowView from "../components/RowView";

const LogInScreen = ({ navigation }) => {
  const [isPassWordVisible, setIsPassWordVisible] = useState(true);
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const { width } = Dimensions.get("window");

  function logInUser() {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        navigation.replace("HomeTabs");
      })
      .catch(error => {
        Alert.alert(
          "Invalid Details",
          "Please fill all the details correctly",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ],
          { cancelable: false }
        );
      });
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        navigation.replace("HomeTabs");
      }
    });

    return unsubscribe;
  }, []);

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        backgroundColor: colors.teal,
      }}
    >
      <Logo />

      <View style={styles.container}>
        <HeadingText>Login to your account</HeadingText>

        <View style={{ width: width * 0.92}}>
        <KeyboardAvoidingView>
          <RowView style={styles.inputContainer}>
            <MaterialIcons
              style={styles.icon}
              name="email"
              size={24}
              color={colors.black}
            />
            <TextInput
              value={email}
              placeholder="Enter your email"
              onChangeText={text => setEmail(text)}
              style={styles.textInput}
              placeholderTextColor={colors.black}
            />
          </RowView>

          <RowView style={styles.inputContainer}>
            <AntDesign
              name="lock"
              size={24}
              color={colors.black}
              style={styles.icon}
            />
            <TextInput
              value={password}
              onChangeText={text => setPassword(text)}
              style={styles.textInput}
              placeholder="Enter your password"
              secureTextEntry={isPassWordVisible}
              placeholderTextColor={colors.black}
            />
            <Pressable onPress={() => setIsPassWordVisible(!isPassWordVisible)}>
              {!isPassWordVisible ? (
                <Feather
                  name="eye"
                  size={24}
                  color={colors.black}
                  style={styles.passwordIcon}
                />
              ) : (
                <Feather
                  name="eye-off"
                  size={24}
                  color={colors.black}
                  style={styles.passwordIcon}
                />
              )}
            </Pressable>
          </RowView>

          <Pressable
            onPress={logInUser}
            style={({ pressed }) => [
              styles.loginPressable,
              pressed && styles.pressed,
            ]}
          >
            <DefaultText style={styles.login}>Log in</DefaultText>
          </Pressable>

          <View style={styles.linkContainer}>
            <Pressable
              style={({ pressed }) => pressed && styles.pressed}
              onPress={() => navigation.navigate("RegisterScreen")}
            >
              <DefaultText style={styles.pressableText}>
                Don't have an account? Register here
              </DefaultText>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
        </View>

      
      </View>
    </View>
  );
};

export default LogInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  image: {
    width: 150,
    height: 100,
  },
  loginPressable: {
    alignItems: "center",
    marginTop: 25,
    marginBottom: 15,
    backgroundColor: colors.teal,
    elevation: 3,
  },
  login: {
    padding: 16,
    textAlign: "center",
  },
  inputContainer: {
    gap: 4,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 5,
    marginBottom: 12,
  },
  passwordIcon: {
    paddingRight: 8,
  },
  textInput: {
    flex: 1,
    padding: 9,
    color: colors.black,
    fontFamily: fonts.textFont,
  },
  icon: {
    marginLeft: 8,
  },
  linkContainer: {
    alignItems: "center",
  },
  pressableText: {
    padding: 7,
  },
  pressed: {
    opacity: 0.7,
  },
});
