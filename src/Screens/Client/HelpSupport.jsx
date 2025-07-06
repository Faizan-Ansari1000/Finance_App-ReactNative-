import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Linking } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function HelpSupport() {

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Text style={styles.header}>Help & Support</Text>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
                <TouchableOpacity style={styles.item}>
                    <Text style={styles.question}>How to reset my password?</Text>
                    <Icon name="keyboard-arrow-right" size={22} color="#888" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}>
                    <Text style={styles.question}>How to update my profile?</Text>
                    <Icon name="keyboard-arrow-right" size={22} color="#888" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}>
                    <Text style={styles.question}>How to request a loan?</Text>
                    <Icon name="keyboard-arrow-right" size={22} color="#888" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}>
                    <Text style={styles.question}>What is the repayment process?</Text>
                    <Icon name="keyboard-arrow-right" size={22} color="#888" />
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Contact Us</Text>
                <TouchableOpacity style={styles.contactItem}>
                    <Icon name="phone" size={20} color="#4A235A" />
                    <Text style={styles.contactText}>+1 (234) 567-890</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.contactItem}>
                    <Icon name="email" size={20} color="#4A235A" />
                    <Text style={styles.contactText}>support@yourapp.com</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Other Resources</Text>
                <TouchableOpacity style={styles.item}>
                    <Icon name="policy" size={20} color="#4A235A" />
                    <Text style={styles.resourceText}>Privacy Policy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}>
                    <Icon name="description" size={20} color="#4A235A" />
                    <Text style={styles.resourceText}>Terms of Service</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#4A235A",
        marginBottom: 30,
        textAlign: "center",
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#4A235A",
        marginBottom: 16,
    },
    item: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    question: {
        fontSize: 15,
        color: "#333",
        flex: 1,
    },
    contactItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    contactText: {
        marginLeft: 12,
        fontSize: 15,
        color: "#333",
    },
    resourceText: {
        marginLeft: 12,
        fontSize: 15,
        color: "#333",
    },
});
