import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity, StatusBar } from "react-native";

export default function OnBoarding() {
    const navigation = useNavigation();


    useEffect(() => {
        const checkProfileId = async () => {
            const profileId = await AsyncStorage.getItem('profileId');
            if (profileId) {
                navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
            } else {
                navigation.reset({ index: 0, routes: [{ name: 'OnBoarding2' }] });
            }
        }
        checkProfileId();
    }, []);


    return (
        <>
            <View style={styles.container}>
                <Image
                    source={{ uri: 'https://img.freepik.com/free-vector/abstract-background-gradient-modern-design_677411-3112.jpg?semt=ais_hybrid&w=740' }}
                    resizeMode="cover"
                    style={styles.backgroundImage}
                />
                <View style={styles.overlay}>
                    <TouchableOpacity onPress={() => navigation.navigate('OnBoarding1')}>
                        <Text style={styles.heading}>Welcome</Text>
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
        left: 0,
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    heading: {
        fontSize: 42,
        color: 'white',
        fontWeight: '600',
        textAlign: 'left',
        fontStyle: 'italic'
    },
});
