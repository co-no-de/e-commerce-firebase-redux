import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, fonts } from "../data";
import { useState } from "react";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Logo from "../components/Logo";
import DefaultText from "../components/DefaultText";
import HeadingText from "../components/HeadingText";
import { Feather, AntDesign, Entypo } from "@expo/vector-icons";
import RowView from "../components/RowView";

const RegisterScreen = ({ navigation }) => {
  const { width } = Dimensions.get("window");
  const insets = useSafeAreaInsets();
  const [isPassWordVisible, setIsPassWordVisible] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isPasswordLongEnough, setIsPasswordLongEnough] = useState(false);
  const [doesPasswordhaveSpecChar, setDoesPasswordhaveSpecChar] =
    useState(false);
  const [doesPasswordhaveCapitalLetter, setDoesPasswordhaveCapitalLetter] =
    useState(false);
  const [doesPasswordHaveANumber, setDoesPasswordHaveANumber] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const registerNewUser = () => {
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      telephone === "" ||
      houseNo === "" ||
      street === "" ||
      country === "" ||
      city === "" ||
      zipCode === "" ||
      !isPasswordValid ||
      !isEmailValid
    ) {
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
    }
    createUserWithEmailAndPassword(auth, email, password).then(
      userCredential => {
        const myUserUid = auth.currentUser.uid;

        setDoc(doc(db, "user-profiles", `${myUserUid}`), {
          firstName,
          lastName,
          email,
          telephone,
          houseNo,
          street,
          country,
          city,
          zipCode,
          numOfOrders: 0,
        });
      }
    );

    Alert.alert(
      "Account registrered succesfully",
      "Enjoy shopping at our store!"
    );

    navigation.replace("HomeTabs");
  };

  function handleEmailInput(text) {
    setEmail(text);
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (emailRegex.test(text)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  }

  function handlePasswordInput(text) {
    setPassword(text);

    const upper = new RegExp("(?=.*[A-Z])");
    const number = new RegExp("(?=.*[0-9])");
    const special = new RegExp("(?=.*[!@#$%^&?*])");
    const length = new RegExp("(?=.{8,})");

    if (upper.test(text)) {
      setDoesPasswordhaveCapitalLetter(true);
    } else {
      setDoesPasswordhaveCapitalLetter(false);
    }

    if (number.test(text)) {
      setDoesPasswordHaveANumber(true);
    } else {
      setDoesPasswordHaveANumber(false);
    }

    if (special.test(text)) {
      setDoesPasswordhaveSpecChar(true);
    } else {
      setDoesPasswordhaveSpecChar(false);
    }

    if (length.test(text)) {
      setIsPasswordLongEnough(true);
    } else {
      setIsPasswordLongEnough(false);
    }

    if (
      doesPasswordHaveANumber &&
      doesPasswordhaveCapitalLetter &&
      doesPasswordhaveSpecChar &&
      isPasswordLongEnough
    ) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
  }

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
        <View style={{ width: width * 0.92 }}>
          <HeadingText>Register an account</HeadingText>

          <ScrollView>
            <KeyboardAvoidingView>
              <RowView style={styles.inputContainer}>
                <View>
                  <DefaultText style={styles.inputText}>
                    First name:
                  </DefaultText>
                </View>
                <TextInput
                  placeholderTextColor={colors.black}
                  style={styles.textInput}
                  value={firstName}
                  placeholder="First name"
                  onChangeText={text => setFirstName(text)}
                />
              </RowView>

              <RowView style={styles.inputContainer}>
                <DefaultText style={styles.inputText}>Last name:</DefaultText>
                <TextInput
                  placeholderTextColor={colors.black}
                  style={styles.textInput}
                  value={lastName}
                  placeholder="Last name"
                  onChangeText={text => setLastName(text)}
                />
              </RowView>

              <RowView style={styles.inputContainer}>
                <DefaultText style={styles.inputText}>Telephone No</DefaultText>
                <TextInput
                  placeholderTextColor={colors.black}
                  style={styles.textInput}
                  value={telephone}
                  placeholder="Telephone number"
                  onChangeText={text => setTelephone(text)}
                />
              </RowView>

              <RowView style={styles.inputContainer}>
                <DefaultText style={styles.inputText}>Street</DefaultText>
                <TextInput
                  placeholderTextColor={colors.black}
                  style={styles.textInput}
                  value={street}
                  placeholder="Street"
                  onChangeText={text => setStreet(text)}
                />
              </RowView>

              <RowView style={styles.inputContainer}>
                <DefaultText style={styles.inputText}>House No</DefaultText>
                <TextInput
                  placeholderTextColor={colors.black}
                  style={styles.textInput}
                  value={houseNo}
                  placeholder="House number"
                  onChangeText={text => setHouseNo(text)}
                />
              </RowView>

              <RowView style={styles.inputContainer}>
                <DefaultText style={styles.inputText}>Zipcode</DefaultText>
                <TextInput
                  placeholderTextColor={colors.black}
                  style={styles.textInput}
                  value={zipCode}
                  placeholder="Zipcode"
                  onChangeText={text => setZipCode(text)}
                />
              </RowView>

              <RowView style={styles.inputContainer}>
                <DefaultText style={styles.inputText}>City</DefaultText>
                <TextInput
                  placeholderTextColor={colors.black}
                  style={styles.textInput}
                  value={city}
                  placeholder="City"
                  onChangeText={text => setCity(text)}
                />
              </RowView>

              <RowView style={styles.inputContainer}>
                <DefaultText style={styles.inputText}>Country</DefaultText>
                <TextInput
                  placeholderTextColor={colors.black}
                  style={styles.textInput}
                  value={country}
                  placeholder="Country"
                  onChangeText={text => setCountry(text)}
                />
              </RowView>

              <RowView style={styles.inputContainer}>
                <DefaultText style={styles.inputText}>Email</DefaultText>
                <View style={{ flex: 1 }}>
                  <TextInput
                    placeholderTextColor={colors.black}
                    style={styles.textInput}
                    value={email}
                    placeholder="Email"
                    onChangeText={text => handleEmailInput(text)}
                  />
                  {!isEmailValid && (
                    <DefaultText fontSize={10} style={{ color: colors.red }}>
                      Please enter a valid emailadress
                    </DefaultText>
                  )}
                </View>
              </RowView>

              <RowView style={styles.passwordContainer}>
                <DefaultText style={[styles.inputText, { paddingTop: 8 }]}>
                  Password
                </DefaultText>
                <View style={{ flex: 1 }}>
                  <RowView style={styles.passwordInnerContainer}>
                    <TextInput
                      placeholderTextColor={colors.black}
                      style={styles.passwordInput}
                      value={password}
                      onChangeText={text => handlePasswordInput(text)}
                      placeholder="Choose a password"
                      secureTextEntry={isPassWordVisible}
                    />
                    <Pressable
                      style={({ pressed }) => pressed && styles.pressed}
                      onPress={() => setIsPassWordVisible(!isPassWordVisible)}
                    >
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
                  <View style={styles.checksContainer}>
                    {isPasswordLongEnough ? (
                      <RowView>
                        <AntDesign
                          name="check"
                          size={10}
                          color={colors.green}
                        />
                        <DefaultText
                          fontSize={10}
                          style={{ color: colors.green }}
                        >
                          Password has 8 characters or more
                        </DefaultText>
                      </RowView>
                    ) : (
                      <RowView>
                        <Entypo name="cross" size={10} color={colors.red} />
                        <DefaultText
                          fontSize={10}
                          style={{ color: colors.red }}
                        >
                          Password needs to be at least 8 characters long
                        </DefaultText>
                      </RowView>
                    )}

                    {doesPasswordHaveANumber ? (
                      <RowView>
                        <AntDesign
                          name="check"
                          size={10}
                          color={colors.green}
                        />
                        <DefaultText
                          fontSize={10}
                          style={{ color: colors.green }}
                        >
                          Password has a number in it
                        </DefaultText>
                      </RowView>
                    ) : (
                      <RowView>
                        <Entypo name="cross" size={10} color={colors.red} />
                        <DefaultText
                          fontSize={10}
                          style={{ color: colors.red }}
                        >
                          Password needs to have at least one number
                        </DefaultText>
                      </RowView>
                    )}

                    {doesPasswordhaveCapitalLetter ? (
                      <RowView>
                        <AntDesign
                          name="check"
                          size={10}
                          color={colors.green}
                        />
                        <DefaultText
                          fontSize={10}
                          style={{ color: colors.green }}
                        >
                          Password has at least on capital letter
                        </DefaultText>
                      </RowView>
                    ) : (
                      <RowView>
                        <Entypo name="cross" size={10} color={colors.red} />
                        <DefaultText
                          fontSize={10}
                          style={{ color: colors.red }}
                        >
                          Password needs at least on capital letter
                        </DefaultText>
                      </RowView>
                    )}

                    {doesPasswordhaveSpecChar ? (
                      <RowView>
                        <AntDesign
                          name="check"
                          size={10}
                          color={colors.green}
                        />
                        <DefaultText
                          fontSize={10}
                          style={{ color: colors.green }}
                        >
                          Password has a special character
                        </DefaultText>
                      </RowView>
                    ) : (
                      <RowView>
                        <Entypo name="cross" size={10} color={colors.red} />
                        <DefaultText
                          fontSize={10}
                          style={{ color: colors.red }}
                        >
                          Password needs to have a special character
                        </DefaultText>
                      </RowView>
                    )}
                  </View>
                </View>
              </RowView>

              <Pressable
                onPress={registerNewUser}
                style={({ pressed }) => [
                  styles.loginPressable,
                  pressed && styles.pressed,
                ]}
              >
                <DefaultText style={styles.login}>Register</DefaultText>
              </Pressable>

              <View style={styles.linkContainer}>
                <Pressable
                  style={({ pressed }) => pressed && styles.pressed}
                  onPress={() => navigation.navigate("LogInScreen")}
                >
                  <DefaultText style={styles.pressableText}>
                    Already have an account? Log in here
                  </DefaultText>
                </Pressable>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    paddingHorizontal: 5,
    overflow: "hidden",
  },
  inputContainer: {
    justifyContent: "space-between",
    gap: 4,
    marginBottom: 12,
  },
  inputText: {
    width: 100,
  },
  passwordInnerContainer: {
    flex: 1,
    gap: 4,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 5,
  },
  textInput: {
    flex: 1,
    padding: 5,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 5,
    color: colors.black,
    fontFamily: fonts.textFont,
  },
  passwordInput: {
    flex: 1,
    padding: 5,
  },
  loginPressable: {
    alignItems: "center",
    marginTop: 25,
    marginBottom: 15,
    backgroundColor: colors.teal,
    elevation: 3,
  },
  linkContainer: {
    alignItems: "center",
  },
  login: {
    padding: 16,
    textAlign: "center",
  },
  passwordIcon: {
    paddingRight: 8,
  },
  passwordContainer: {
    flex: 1,
    alignItems: "flex-start",
  },
  pressableText: {
    padding: 7,
  },
  checksContainer: {
    height: 55,
    justifyContent: "center",
    paddingLeft: 5,
  },
  pressed: {
    opacity: 0.7,
  },
});
