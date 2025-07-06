import { ScrollView, View, Text, StyleSheet, Image } from "react-native";

export default function AdminAbout() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.section}>
                <Text style={styles.title}>About This App</Text>
                <Text style={styles.text}>
                    PayNex Admin Panel allows you to manage user profiles, monitor loan applications, send notifications, and keep track of important updates. Designed to give admins full control with a user-friendly interface.
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.title}>Features</Text>
                <Text style={styles.text}>• User Management</Text>
                <Text style={styles.text}>• Notification Broadcast</Text>
                <Text style={styles.text}>• Loan Requests Monitoring</Text>
                <Text style={styles.text}>• Detailed Reports</Text>
                <Text style={styles.text}>• Settings and Security</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.title}>Developer Info</Text>
                <Text style={styles.text}>Developed by PayNex Tech Team</Text>
                <Text style={styles.text}>Contact: support@paynex.com</Text>
                <Text style={styles.text}>Website: www.paynex.com</Text>
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>© {new Date().getFullYear()} PayNex. All rights reserved.</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#fff",
        flexGrow: 1,
        paddingTop: 35,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#4A235A',
        marginBottom: 10,
    },
    text: {
        fontSize: 14,
        color: '#555',
        marginBottom: 6,
    },
    footer: {
        marginTop: 40,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 12,
        color: '#999',
        textAlign: 'center',
    },
});
