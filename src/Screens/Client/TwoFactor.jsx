import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function TwoFactor() {
    const [expandedSection, setExpandedSection] = useState(null);

    const toggleSection = (section) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    const sections = [
        {
            id: "signup",
            title: "Step 1: Account Signup",
            content: `- Open the app and select Create Account.\n
- Enter a valid, unique email address and a secure password (minimum 8 characters).\n
- Submit to verify email and password.\n
- On success, proceed to Profile Creation.`,
        },
        {
            id: "profile",
            title: "Step 2: Profile Creation",
            content: `- Provide full name, CNIC (valid format), and phone number.\n
- CNIC must be unique and linked to your email.\n
- Upload a profile picture (optional).\n
- Submit details for validation.\n
- Proceed to Two-Factor Authentication setup on success.`,
        },
        {
            id: "twofa",
            title: "Step 3: Two-Factor Authentication (2FA) Setup",
            content: `- Receive a 6-digit verification code on your registered phone.\n
- Enter the code in the app.\n
- Code is validated with the server.\n
- If valid, 2FA is enabled.\n
- Optionally setup backup options:\n  • Email verification\n  • Security questions\n  • Recovery codes (save securely)`,
        },
        {
            id: "access",
            title: "Step 4: Account Access",
            content: `- After 2FA verification, you will be logged in.\n
- Access app features like profile management, transactions, etc.`,
        },
        {
            id: "notes",
            title: "Important Notes",
            content: `- Email and CNIC must be unique per user.\n
- Use a strong password.\n
- Keep your phone active to receive 2FA codes.\n
- Save recovery codes securely.\n
- Contact support at support@yourapp.com for help.`,
        },
    ];

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Text style={styles.screenTitle}>Two-Factor Authentication Help & Support</Text>
            <Text style={styles.introText}>
                This guide will help you understand how to create an account and enable Two-Factor Authentication (2FA) in our app for enhanced security.
            </Text>

            {sections.map(({ id, title, content }) => (
                <View key={id} style={styles.section}>
                    <TouchableOpacity
                        onPress={() => toggleSection(id)}
                        style={styles.sectionHeader}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.sectionTitle}>{title}</Text>
                        <Text style={styles.toggleIcon}>{expandedSection === id ? "−" : "+"}</Text>
                    </TouchableOpacity>
                    {expandedSection === id && (
                        <View style={styles.sectionContent}>
                            {content.split("\n").map((line, idx) => (
                                <Text key={idx} style={styles.sectionText}>
                                    {line.trim()}
                                </Text>
                            ))}
                        </View>
                    )}
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop:35
    },
    contentContainer: {
        padding: 20,
        paddingBottom: 40,
    },
    screenTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#4a235a",
        marginBottom: 12,
    },
    introText: {
        fontSize: 16,
        color: "#555",
        marginBottom: 20,
        lineHeight: 22,
    },
    section: {
        marginBottom: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#ddd",
        backgroundColor: "#fafafa",
        overflow: "hidden",
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 14,
        paddingHorizontal: 16,
        backgroundColor: "#f0e6fa",
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#4a235a",
    },
    toggleIcon: {
        fontSize: 22,
        fontWeight: "600",
        color: "#4a235a",
    },
    sectionContent: {
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    sectionText: {
        fontSize: 15,
        color: "#333",
        marginBottom: 8,
        lineHeight: 20,
    },
});
