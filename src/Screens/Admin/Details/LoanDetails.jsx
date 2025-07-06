import { ScrollView, Text, View, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

export default function LoanDetailsCard() {
    const route = useRoute();
    const { detailLoan } = route.params;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.card}>
                <View style={styles.row}>
                    <Text style={styles.name}>{detailLoan.name || "-"}</Text>
                    <Text style={styles.cnic}>{detailLoan.cnic || "-"}</Text>
                </View>

                <Text style={styles.text}>
                    <Text style={styles.label}>Phone: </Text>
                    {detailLoan.phone || "-"}
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.label}>Address: </Text>
                    {detailLoan.address || "-"}
                </Text>

                <View style={styles.row}>
                    <Text style={styles.text}>
                        <Text style={styles.label}>Amount: </Text>Rs. {detailLoan.amount || "-"}
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.label}>Date: </Text>
                        {detailLoan.date || "-"}
                    </Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.text}>
                        <Text style={styles.label}>Purpose: </Text>
                        {detailLoan.purpose || "-"}
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.label}>Status: </Text>
                        {detailLoan.status || "-"}
                    </Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.text}>
                        <Text style={styles.label}>Period: </Text>
                        {detailLoan.period ? detailLoan.period + " months" : "-"}
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.label}>Income: </Text>Rs. {detailLoan.income || "-"}
                    </Text>
                </View>

                <Text style={styles.text}>
                    <Text style={styles.label}>Additional Details: </Text>
                    {detailLoan.additionDetail || "-"}
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#fff",
        flex: 1,
    },
    card: {
        marginTop:30,
        height:'40%',
        backgroundColor: "#f9f9f9",
        borderRadius: 14,
        padding: 20,
        // shadowColor: "#000",
        // shadowOffset: { width: 0, height: 4 },
        // shadowOpacity: 0.1,
        // shadowRadius: 6,
        elevation: 4,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    name: {
        fontSize: 18,
        fontWeight: "700",
        color: "#4a235a",
        flex: 1,
    },
    cnic: {
        fontSize: 16,
        fontWeight: "500",
        color: "#888",
        textAlign: "right",
        flex: 1,
    },
    label: {
        fontWeight: "600",
        color: "#555",
    },
    text: {
        fontSize: 15,
        color: "#333",
        marginBottom: 8,
    },
});
