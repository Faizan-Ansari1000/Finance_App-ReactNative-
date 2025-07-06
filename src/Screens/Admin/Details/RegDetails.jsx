import { ScrollView, Text, View, StyleSheet, Image } from "react-native";
import { useRoute } from "@react-navigation/native";

export default function RegDetails() {
    const route = useRoute();
    const { users } = route.params;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.card}>
                <Image
                    source={{ uri: users?.imageUrl || 'https://anrp.tamu.edu/wp-content/uploads/sites/29/2014/12/Image-Not-Available.jpg' }}
                    style={styles.profileImg}
                    resizeMode="cover"
                />

                <View style={styles.nameRow}>
                    <Text style={styles.name}>{users.name || "-"}</Text>
                    <Text style={styles.cnic}>{users.cnic || "-"}</Text>
                </View>

                <View style={styles.infoSection}>
                    <Text style={styles.text}>
                        <Text style={styles.label}>Phone: </Text>
                        {users.phone || "-"}
                    </Text>

                    <Text style={styles.text}>
                        <Text style={styles.label}>Location: </Text>
                        {users.location || "-"}
                    </Text>

                    <Text style={styles.text}>
                        <Text style={styles.label}>Country: </Text>
                        {users.country || "-"}
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#fff",
        flexGrow: 1,
        paddingTop:35
        // justifyContent: 'center'
    },
    card: {
        backgroundColor: "#f9f9f9",
        borderRadius: 14,
        padding: 20,
        elevation: 4,
        alignItems: "center",
        width: '100%',
    },
    profileImg: {
        width: "100%",
        height: 200,        // fixed height for better consistency
        borderRadius: 12,
        marginBottom: 20,
    },
    nameRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 20,
    },
    name: {
        fontSize: 20,
        fontWeight: "700",
        color: "#4a235a",
        flex: 1,
        textAlign: 'left'
    },
    cnic: {
        fontSize: 16,
        fontWeight: "500",
        color: "#888",
        flex: 1,
        textAlign: "right",
    },
    infoSection: {
        width: "100%",
        alignItems: "flex-start",
    },
    label: {
        fontWeight: "600",
        color: "#555",
    },
    text: {
        fontSize: 16,
        color: "#333",
        marginBottom: 10,
    },
});
