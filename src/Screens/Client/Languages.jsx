import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View, StyleSheet, StatusBar } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function Languages() {
    const [selected, setSelected] = useState("English");

    const languages = [
        "English",
        "Urdu",
        "Arabic",
        "French",
        "Spanish",
        "Chinese",
        "Hindi",
        "Bengali",
        "German",
    ];

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <View style={styles.container}>
                <Text style={styles.heading}>Select Language</Text>

                <ScrollView showsVerticalScrollIndicator={false}>
                    {languages.map((lang, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.item,
                                selected === lang && styles.selectedItem,
                            ]}
                            onPress={() => setSelected(lang)}
                            activeOpacity={0.7}
                        >
                            <Text
                                style={[
                                    styles.itemText,
                                    selected === lang && styles.selectedText,
                                ]}
                            >
                                {lang}
                            </Text>
                            {selected === lang && (
                                <Icon name="check-circle" size={22} color="#4A235A" />
                            )}
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    heading: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#4A235A",
        marginBottom: 20,
        textAlign: "center",
        paddingTop:20
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#e0e0e0",
    },
    itemText: {
        fontSize: 16,
        color: "#333",
    },
    selectedItem: {
        backgroundColor: "#f5f2f8",
        borderRadius: 12,
        paddingHorizontal: 12,
    },
    selectedText: {
        fontWeight: "600",
        color: "#4A235A",
    },
});
