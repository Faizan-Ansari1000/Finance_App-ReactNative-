import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import ApiInstance from "../../../config/Apis/ApiInstance";

export default function Guarantors() {
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchCnic, setSearchCnic] = useState("");
  const navigation = useNavigation();

  const getGuarantors = useCallback(async () => {
    try {
      setLoading(true);
      const res = await ApiInstance.get(`/userRoute/guarantor`);
      console.log(res.data);
      setPostData(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      ToastAndroid.show(`${error.response?.data?.message}`, ToastAndroid.LONG);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getGuarantors();
  }, []);

  const filteredData = searchCnic
    ? postData.filter((item) =>
        item.cnic.toLowerCase().includes(searchCnic.toLowerCase())
      )
    : postData;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by CNIC"
        onChangeText={(e) => setSearchCnic(e)}
        value={searchCnic || ""}
        placeholderTextColor="#999"
      />

      {loading ? (
        <ActivityIndicator size="large" color="#4A235A" />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          data={filteredData}
          keyExtractor={(item, index) => item._id || index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate("GuarantorDetail", { gDetail: item })}
            >
              <Text style={styles.name}>{item.name || "N/A"}</Text>
              <Text style={styles.cnic}>{item.cnic || "N/A"}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 14,
    marginBottom: 20,
    color: "#000",
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 18,
    borderRadius: 14,
    marginBottom: 15,
    elevation: 3,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4A235A",
    marginBottom: 8,
  },
  cnic: {
    fontSize: 14,
    color: "#555",
  },
});
