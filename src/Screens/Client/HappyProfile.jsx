import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, StatusBar } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function HappyProfile() {
    const navigation = useNavigation();

    return (
        <>
            <StatusBar translucent barStyle={'dark-content'} backgroundColor={'transparent'} />
            <View style={styles.container}>
                <Image
                    source={{ uri: "https://img.freepik.com/premium-vector/joyful-man-shows-gesture-cool-i-like-cartoon-style_165429-876.jpg?semt=ais_hybrid&w=740" }}
                    style={styles.image}
                    resizeMode="contain"
                />

                <Text style={styles.title}>Profile Ready!</Text>

                <Text style={styles.message}>
                    Your profile has been created successfully. You can now explore the app and enjoy all features.
                </Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Home' }] })}
                >
                    <Text style={styles.buttonText}>Go to Home</Text>
                    <MaterialIcons name="arrow-forward-ios" size={18} color="#fff" style={{ marginLeft: 6 }} />
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    image: {
        width: width * 0.6,
        height: width * 0.6,
        marginBottom: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#4a235a',
        marginBottom: 16,
        textAlign: 'center',
    },
    message: {
        fontSize: 16,
        color: '#7f8c8d',
        textAlign: 'center',
        marginBottom: 40,
        lineHeight: 24,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4a235a',
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
