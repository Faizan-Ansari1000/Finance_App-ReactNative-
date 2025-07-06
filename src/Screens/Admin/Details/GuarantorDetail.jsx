import { useRoute } from "@react-navigation/native";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function GuarantorDetail() {
  const route = useRoute();
  const { gDetail } = route.params;

  return (
    <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Guarantor Details</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{gDetail.name}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>CNIC:</Text>
          <Text style={styles.value}>{gDetail.cnic}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>{gDetail.phone}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Relation:</Text>
          <Text style={styles.value}>{gDetail.relation}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.value}>{gDetail.address}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Occupation:</Text>
          <Text style={styles.value}>{gDetail.occupation}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Income:</Text>
          <Text style={styles.value}>{gDetail.income}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Consent:</Text>
          <Text style={styles.value}>{gDetail.consent}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
    paddingTop:40,
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    borderRadius: 16,
    elevation: 4,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4A235A",
    marginBottom: 20,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    color: "#7f8c8d",
    width: "40%",
  },
  value: {
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
    width: "58%",
    textAlign: "right",
  },
});
