import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  ActivityIndicator,
  StatusBar,
  // StatusBar,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import ApiInstance from "../config/Apis/ApiInstance";

export default function CNIC() {
  const [model, setModel] = useState({});
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const confirmation = async () => {
    if (!model.cnic) {
      return Toast.show({ type: "error", text2: "CNIC must required" });
    }
    if (model.cnic.length < 13) {
      return ToastAndroid.show("Wrong CNIC (00000-0000000-0)", ToastAndroid.SHORT);
    }
    try {
      setLoading(true);
      const res = await ApiInstance.post("/authRoute/cnic", model);
      const { role } = res.data;
      if (role === "admin") {
        Toast.show({ type: "success", text2: "Verification complete" });
        setLoading(false);
        setModel({});
        navigation.reset({ index: 0, routes: [{ name: "Admin" }] });
      }
      if (role === "user") {
        Toast.show({ type: "success", text2: "Home" });
        setModel({});
        setLoading(false);
        navigation.reset({ index: 0, routes: [{ name: "Home" }] });
      }
    } catch (error) {
      console.log(error);
      ToastAndroid.show(`${error.response?.data?.message}`, ToastAndroid.LONG);
      setLoading(false);
    }
  };

  return (
    <>
      <StatusBar translucent barStyle={"dark-content"} backgroundColor={"transparent"} />
      <View style={styles.container}>
        <Text style={styles.heading}>Enter CNIC</Text>

        <Text style={styles.subheading}>
          Please enter your valid CNIC to continue
        </Text>

        <View style={styles.form}>
          <Text style={styles.label}>Enter CNIC</Text>
          <TextInput
            placeholder="42201-0000000-0"
            placeholderTextColor="#7f8c8d"
            style={styles.input}
            maxLength={15}
            keyboardType="number-pad"
            secureTextEntry
            onChangeText={(e) => setModel({ ...model, cnic: e })}
            value={model.cnic || ""}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          disabled={loading}
          onPress={confirmation}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Continue</Text>
          )}
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: "#000",
  },
  subheading: {
    fontSize: 14,
    color: "#7f8c8d",
    textAlign: "center",
    marginBottom: 40,
  },
  form: {
    gap: 20,
  },
  label: {
    fontSize: 14,
    color: "#000",
    marginBottom: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: "#7f8c8d",
    borderRadius: 10,
    fontSize: 16,
    color: "#000",
    paddingVertical: 16,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#4a235a",
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 40,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
