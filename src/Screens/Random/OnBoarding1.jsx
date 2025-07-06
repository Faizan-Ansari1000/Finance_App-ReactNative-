import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity, StatusBar } from "react-native";

export default function OnBoarding1() {

    const navigation = useNavigation();
    return (
        <>
            <View style={styles.container}>
                {/* Background Image */}
                <Image
                    source={{ uri: 'https://img.freepik.com/free-vector/abstract-background-gradient-modern-design_677411-3112.jpg?semt=ais_hybrid&w=740' }}
                    resizeMode="cover"
                    style={styles.backgroundImage}
                />

                {/* Overlay content on image */}
                <View style={styles.overlay}>
                    <Text style={styles.heading}>
                        The best app for {"\n"}manage your {"\n"}finance
                    </Text>

                    <Text style={styles.paragraph}>
                        Take control of your money, track your expenses,{"\n"}
                        and plan your financial future with ease.{"\n"}
                        Start your journey to financial freedom today.
                    </Text>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('OnBoarding2')}>
                        <Text style={styles.buttonText}>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    overlay: {
        flex: 1,
        marginTop: 90,
        alignItems: 'flex-start',
        paddingHorizontal: 20,
    },
    heading: {
        fontSize: 42,
        color: 'white',
        fontWeight: '600',
        textAlign: 'left',
        marginBottom: 20,
        lineHeight: 45
    },
    paragraph: {
        fontSize: 16,
        color: 'white',
        textAlign: 'justify',
        lineHeight: 34,
    },
    button: {
        alignSelf: 'flex-end',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
    },

});
