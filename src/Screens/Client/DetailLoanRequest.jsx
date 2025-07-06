import { useRoute } from "@react-navigation/native";
import { ScrollView, Text, View, StyleSheet, StatusBar } from "react-native";

export default function DetailLoanRequest() {

    const route = useRoute();
    const { Request } = route.params || {};

    return (
        <>
            <StatusBar translucent barStyle={'dark-content'} backgroundColor={'transparent'} />
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.card}>

                    <Text style={styles.name}>{Request.name}</Text>
                    <Text style={styles.cnic}>CNIC: {Request.cnic}</Text>
                    <Text style={styles.phone}>Phone: {Request.phone}</Text>

                    <View style={styles.section}>
                        <Text style={styles.label}>Address</Text>
                        <Text style={styles.value}>{Request.address}</Text>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.half}>
                            <Text style={styles.label}>Loan Amount</Text>
                            <Text style={styles.value}>Rs {Request.amount}</Text>
                        </View>
                        <View style={styles.half}>
                            <Text style={styles.label}>Repayment Period</Text>
                            <Text style={styles.value}>{Request.period} months</Text>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.label}>Loan Purpose</Text>
                        <Text style={styles.value}>{Request.purpose}</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.label}>Monthly Income</Text>
                        <Text style={styles.value}>Rs {Request.income}</Text>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.half}>
                            <Text style={styles.label}>Status</Text>
                            <Text style={[styles.value, Request.status === "Approved" ? styles.approved : styles.other]}>
                                {Request.status}
                            </Text>
                        </View>
                        <View style={styles.half}>
                            <Text style={styles.label}>Date</Text>
                            <Text style={styles.value}>{Request.date}</Text>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.label}>Additional Notes</Text>
                        <Text style={styles.value}>{Request.additionDetail || "Not Provided"}</Text>
                    </View>

                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#fff",
        paddingTop: 40,
        flex:1
    },
    card: {
        backgroundColor: "#F9F9F9",
        borderRadius: 12,
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 4,
    },
    name: {
        fontSize: 22,
        fontWeight: "700",
        color: "#4A148C",
        marginBottom: 4,
    },
    cnic: {
        fontSize: 14,
        color: "#555",
        marginBottom: 8,
    },
    phone: {
        fontSize: 14,
        color: "#555",
        marginBottom: 16,
    },
    section: {
        marginBottom: 16,
    },
    label: {
        fontSize: 13,
        color: "#888",
        marginBottom: 4,
        fontWeight: "600",
        textTransform: "uppercase",
    },
    value: {
        fontSize: 16,
        color: "#222",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    half: {
        flex: 0.48,
    },
    approved: {
        color: "green",
        fontWeight: "700",
    },
    other: {
        color: "#B00020",
        fontWeight: "700",
    },
});
