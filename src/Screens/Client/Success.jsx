import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, StatusBar } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export default function Success() {
    const navigation = useNavigation();

    // Replace this with your actual image URI (online or local file URI)
    const successImageUri = "https://winder.ai/submission/form-submission/success.png";

    return (
        <>
            <StatusBar translucent barStyle={'dark-content'} backgroundColor={'transparent'} />
            <View style={styles.container}>
                <Image
                    source={{ uri: successImageUri }}
                    style={styles.image}
                    resizeMode="contain"
                />
                <MaterialIcons name="check-circle" size={80} color="#4a235a" style={{ marginBottom: 20 }} />
                <Text style={styles.title}>Success!</Text>
                <Text style={styles.message}>
                    Your application has been successfully submitted. We will review your information and
                    get back to you shortly.
                </Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.reset({ index: 0, routes: [{ name: "Home" }] })}
                >
                    <Text style={styles.buttonText}>Go to Home</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: width * 0.6,
        height: width * 0.6,
        marginBottom: 30,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#4a235a",
        marginBottom: 10,
        textAlign: "center",
    },
    message: {
        fontSize: 16,
        color: "#7f8c8d",
        textAlign: "center",
        lineHeight: 22,
        marginBottom: 40,
    },
    button: {
        backgroundColor: "#4a235a",
        paddingVertical: 16,
        paddingHorizontal: 60,
        borderRadius: 30,
        elevation: 3,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },
});
