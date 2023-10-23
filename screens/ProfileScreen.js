import { useEffect, useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  Pressable,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { colors, fonts } from "../data";
import Order from "../components/Order";
import { auth, db } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import Logo from "../components/Logo";
import DefaultText from "../components/DefaultText";
import HeadingText from "../components/HeadingText";
import { signOut } from "firebase/auth";
import RowView from "../components/RowView";

const ProfileScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { orderPlaced } = useSelector(state => state.cart);
  const user = auth.currentUser;

  const [firstName, setFirstName] = useState("Loading your data...");
  const [lastName, setLastName] = useState("Loading your data...");
  const [email, setEmail] = useState("Loading your data...");
  const [telephone, setTelephone] = useState("Loading your data...");
  const [houseNo, setHouseNo] = useState("Loading your data...");
  const [street, setStreet] = useState("Loading your data...");
  const [country, setCountry] = useState("Loading your data...");
  const [city, setCity] = useState("Loading your data...");
  const [zipCode, setZipCode] = useState("Loading your data...");
  const [orders, setOrders] = useState([]);

  const [firstNameBU, setFirstNameBU] = useState("Loading your data...");
  const [lastNameBU, setLastNameBU] = useState("Loading your data...");
  const [emailBU, setEmailBU] = useState("Loading your data...");
  const [telephoneBU, setTelephoneBU] = useState("Loading your data...");
  const [houseNoBU, setHouseNoBU] = useState("Loading your data...");
  const [streetBU, setStreetBU] = useState("Loading your data...");
  const [countryBU, setCountryBU] = useState("Loading your data...");
  const [cityBU, setCityBU] = useState("Loading your data...");
  const [zipCodeBU, setZipCodeBU] = useState("Loading your data...");

  const [numOfOrders, setNumberOfOrders] = useState(0);

  const [isEditAble, setIsEditAble] = useState(false);

  const [profileDataShown, setProfileDataShown] = useState(true);

  async function editProfile() {
    setIsEditAble(true);
  }

  async function saveProfile() {
    try {
      const userData = {
        firstName,
        lastName,
        email,
        telephone,
        houseNo,
        street,
        city,
        country,
        zipCode,
      };

      await updateDoc(
        doc(db, "user-profiles", `${auth.currentUser.uid}`),
        userData,
        {
          merge: true,
        }
      );

      setIsEditAble(false);
      getUserData();
    } catch (error) {
      console.log("Error updating user in profile screen", error);
    }
  }

  function toggleData(whatToShow) {
    if (!profileDataShown) {
      if (whatToShow === "profile") {
        setProfileDataShown(true);
      }
    } else {
      if (whatToShow === "orders") {
        setProfileDataShown(false);
      }
    }
  }

  useEffect(() => {
    if (user) {
      getUserData();
    }
  }, []);

  useLayoutEffect(() => {
    // aanpasren: als een order geplaatst wordt is numoforders siwuiesioo hoger dan 0
    if (user) {
      async function getUserOrderData() {
        const userDocRef = doc(db, "user-profiles", `${auth.currentUser.uid}`);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          const { numOfOrders } = docSnap.data();

          setNumberOfOrders(numOfOrders);

          if (numOfOrders != 0) {
            const orderDocRef = collection(db, "orders");
            const q = query(
              orderDocRef,
              orderBy("orderNumber", "desc"),
              where("userId", "==", `${auth.currentUser.uid}`),
              limit(numOfOrders)
            );

            const querySnapshot = await getDocs(q);

            let ordersArray = [];

            querySnapshot.forEach(doc => {
              ordersArray.push(doc.data());
            });

            setOrders(ordersArray);
          } else {
            const orderDocRef = collection(db, "orders");
            const q = query(
              orderDocRef,
              where("userId", "==", `${auth.currentUser.uid}`),
              orderBy("orderNumber", "desc")
            );

            const querySnapshot = await getDocs(q);

            let ordersArray = [];

            querySnapshot.forEach(doc => {
              ordersArray.push(doc.data());
            });

            setOrders(ordersArray);
          }
        } else {
          console.log("No such document!");
        }
      }

      getUserOrderData();
    }
  }, [orderPlaced]);

  function cancelEdit() {
    setFirstName(firstNameBU);
    setLastName(lastNameBU);
    setEmail(emailBU);
    setTelephone(telephoneBU);
    setHouseNo(houseNoBU);
    setStreet(streetBU);
    setCountry(countryBU);
    setCity(cityBU);
    setZipCode(zipCodeBU);

    setIsEditAble(false);
  }

  async function getUserData() {
    const userDocRef = doc(db, "user-profiles", `${auth.currentUser.uid}`);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      const {
        city,
        country,
        email,
        firstName,
        houseNo,
        lastName,
        orders,
        street,
        telephone,
        zipCode,
      } = docSnap.data();

      setFirstName(firstName);
      setLastName(lastName);
      setEmail(email);
      setOrders(orders);
      setTelephone(telephone);
      setHouseNo(houseNo);
      setStreet(street);
      setCountry(country);
      setCity(city);
      setZipCode(zipCode);

      setFirstNameBU(firstName);
      setLastNameBU(lastName);
      setEmailBU(email);
      setTelephoneBU(telephone);
      setHouseNoBU(houseNo);
      setStreetBU(street);
      setCountryBU(country);
      setCityBU(city);
      setZipCodeBU(zipCode);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  async function logOut() {
    try {
      await signOut(auth);
      navigation.replace("HomeTabs");
    } catch (error) {
      console.log("error logging out: ", error);
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

      {user ? (
        <RowView style={styles.toggleContainer}>
          <Pressable
            onPress={() => toggleData("profile")}
            style={({ pressed }) => [
              pressed && styles.pressed,
              profileDataShown
                ? styles.pressableActive
                : styles.pressableInActive,
            ]}
          >
            <DefaultText
              style={profileDataShown ? styles.textActive : styles.textInActive}
            >
              Profile data
            </DefaultText>
          </Pressable>

          <Pressable
            onPress={() => toggleData("orders")}
            style={({ pressed }) => [
              pressed && styles.pressed,
              !profileDataShown
                ? styles.pressableActive
                : styles.pressableInActive,
            ]}
          >
            <DefaultText
              style={
                !profileDataShown ? styles.textActive : styles.textInActive
              }
            >
              Order history
            </DefaultText>
          </Pressable>

          <Pressable
            onPress={() => logOut()}
            style={({ pressed }) => [
              styles.logInBtn,
              pressed && styles.pressed,
            ]}
          >
            <DefaultText>Log out</DefaultText>
          </Pressable>
        </RowView>
      ) : (
        <RowView style={styles.toggleContainer}>
          <Pressable
            onPress={() => navigation.replace("LogInScreen")}
            style={({ pressed }) => pressed && styles.pressed}
          >
            <DefaultText style={styles.logInBtn}>Log in</DefaultText>
          </Pressable>

          <Pressable
            onPress={() => navigation.replace("RegisterScreen")}
            style={({ pressed }) => [
              styles.registerBtn,
              pressed && styles.pressed,
            ]}
          >
            <DefaultText
              style={
                !profileDataShown ? styles.textActive : styles.textInActive
              }
            >
              Register
            </DefaultText>
          </Pressable>
        </RowView>
      )}

      {!user && (
        <View style={styles.noUserContainer}>
          <HeadingText>
            Register an account or log in to view your personal profile page
          </HeadingText>
        </View>
      )}

      {profileDataShown && user && (
        <View style={styles.profileContainer}>
          <HeadingText>Your profile data</HeadingText>
          <ScrollView>
            <DefaultText fontSize={18} style={styles.textTitles}>
              First name:
            </DefaultText>

            <TextInput
              editable={isEditAble}
              onChangeText={text => setFirstName(text)}
              placeholderTextColor={colors.black}
              placeholder={
                firstName ? firstName : "No first name registered yet"
              }
              value={firstName}
              style={[styles.textInput, isEditAble && styles.editBackground]}
            />

            <DefaultText style={styles.textTitles}>Last name:</DefaultText>

            <TextInput
              editable={isEditAble}
              onChangeText={text => setLastName(text)}
              placeholderTextColor={colors.black}
              placeholder={lastName ? lastName : "No last name registered yet"}
              value={lastName}
              style={[styles.textInput, isEditAble && styles.editBackground]}
            />

            <DefaultText style={styles.textTitles}>Email</DefaultText>

            <TextInput
              editable={isEditAble}
              onChangeText={text => setEmail(text)}
              placeholderTextColor={colors.black}
              placeholder={email ? email : "No email registered yet"}
              value={email}
              style={[styles.textInput, isEditAble && styles.editBackground]}
            />

            <View>
              <DefaultText style={styles.textTitles}>Telephone</DefaultText>

              <TextInput
                editable={isEditAble}
                value={telephone}
                onChangeText={text => setTelephone(text)}
                placeholderTextColor={colors.black}
                placeholder={
                  telephone ? telephone : "No telephone registered yet"
                }
                style={[styles.textInput, isEditAble && styles.editBackground]}
              />
            </View>

            <View style={{ marginVertical: 10 }}>
              <DefaultText style={styles.textTitles}>House number</DefaultText>

              <TextInput
                editable={isEditAble}
                value={houseNo}
                onChangeText={text => setHouseNo(text)}
                placeholderTextColor={colors.black}
                placeholder={
                  houseNo ? houseNo : "No house number registered yet"
                }
                style={[styles.textInput, isEditAble && styles.editBackground]}
              />
            </View>

            <View style={{ marginVertical: 10 }}>
              <DefaultText style={styles.textTitles}>Street</DefaultText>

              <TextInput
                editable={isEditAble}
                value={street}
                onChangeText={text => setStreet(text)}
                placeholderTextColor={colors.black}
                placeholder={street ? street : "No street registered yet"}
                style={[styles.textInput, isEditAble && styles.editBackground]}
              />
            </View>

            <View style={{ marginVertical: 10 }}>
              <DefaultText style={styles.textTitles}>Zip code</DefaultText>

              <TextInput
                editable={isEditAble}
                value={zipCode}
                onChangeText={text => setZipCode(text)}
                placeholderTextColor={colors.black}
                placeholder={zipCode ? zipCode : "No zipcode registered yet"}
                style={[styles.textInput, isEditAble && styles.editBackground]}
              />
            </View>

            <View style={{ marginVertical: 10 }}>
              <DefaultText style={styles.textTitles}>City</DefaultText>

              <TextInput
                editable={isEditAble}
                value={city}
                onChangeText={text => setCity(text)}
                placeholderTextColor={colors.black}
                placeholder={zipCode ? zipCode : "No zipcode registered yet"}
                style={[styles.textInput, isEditAble && styles.editBackground]}
              />
            </View>

            <View style={{ marginVertical: 10 }}>
              <DefaultText style={styles.textTitles}>Country</DefaultText>

              <TextInput
                editable={isEditAble}
                value={country}
                onChangeText={text => setCountry(text)}
                placeholderTextColor={colors.black}
                placeholder={country ? country : "No country registered yet"}
                style={[styles.textInput, isEditAble && styles.editBackground]}
              />
            </View>
          </ScrollView>
          <View style={styles.btnContainer}>
            {!isEditAble ? (
              <Pressable style={styles.editPressable} onPress={editProfile}>
                <DefaultText style={styles.btnText}>Edit profile</DefaultText>
              </Pressable>
            ) : (
              <RowView style={styles.RowView}>
                <Pressable style={styles.savePressable} onPress={saveProfile}>
                  <DefaultText style={styles.btnText}>Save profile</DefaultText>
                </Pressable>
                <Pressable
                  style={styles.cancelPressable}
                  onPress={() => cancelEdit()}
                >
                  <DefaultText style={styles.btnText}>Cancel</DefaultText>
                </Pressable>
              </RowView>
            )}
          </View>
        </View>
      )}

      {!profileDataShown && user && (
        <View style={styles.ordersContainer}>
          <HeadingText style={styles.textTitle}>Your orders</HeadingText>

          {orders && orders.length > numOfOrders && (
            <View style={styles.noOrdersContainer}>
              <DefaultText>No orders yet</DefaultText>
            </View>
          )}

          {orders && orders.length === numOfOrders ? (
            <ScrollView>
              {orders.map(
                (
                  order,
                  index //SORT BY DATE
                ) => (
                  <Order key={index} order={order} />
                )
              )}
            </ScrollView>
          ) : (
            <View style={styles.noOrdersContainer}>
              <DefaultText>No orders yet</DefaultText>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  profileContainer: {
    padding: 10,
    paddingBottom: 240,
    marginBottom: 30,
    backgroundColor: colors.white,
  },
  ordersContainer: {
    padding: 10,
    paddingBottom: 10,
    backgroundColor: colors.white,
    flex: 1,
  },
  noUserContainer: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  toggleContainer: {
    justifyContent: "space-around",
    paddingBottom: 20,
  },
  pressableActive: {
    padding: 10,
    borderColor: colors.black,
    borderWidth: 1,
    backgroundColor: colors.black,
  },
  pressableInActive: {
    padding: 10,
    borderColor: colors.black,
    borderWidth: 1,
    backgroundColor: colors.white,
  },
  logOutBtn: {
    padding: 10,
    borderColor: colors.black,
    borderWidth: 1,
    backgroundColor: colors.lightYellow,
  },
  logInBtn: {
    padding: 10,
    borderColor: colors.black,
    borderWidth: 1,
    backgroundColor: colors.lightGray,
  },
  registerBtn: {
    padding: 10,
    borderColor: colors.black,
    borderWidth: 1,
    backgroundColor: colors.lightYellow,
  },
  textActive: {
    color: colors.white,
  },
  textInActive: {
    color: colors.black,
  },
  textTitles: {
    fontWeight: "bold",
  },
  textInput: {
    color: colors.black,
    padding: 10,
    borderColor: colors.lightGray,
    borderWidth: 1,
    marginTop: 7,
    marginBottom: 15,
    borderRadius: 5,
    fontFamily: fonts.textFont,
  },
  btnContainer: {
    paddingVertical: 8,
    alignItems: "center",
  },
  editPressable: {
    backgroundColor: colors.green,
    padding: 20,
  },
  savePressable: {
    backgroundColor: colors.babyBlue,
    padding: 20,
  },
  btnText: {
    color: colors.white,
  },
  editBackground: {
    backgroundColor: colors.lightYellow,
  },
  RowView: {
    gap: 12,
  },
  cancelPressable: {
    padding: 20,
    backgroundColor: colors.yellow,
  },
  noOrdersContainer: {
    backgroundColor: colors.white,
    flex: 1,
  },
  pressed: {
    opacity: 0.7,
  },
});
