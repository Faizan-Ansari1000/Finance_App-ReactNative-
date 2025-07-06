import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
    ActivityIndicator, ScrollView, StatusBar, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View,
} from "react-native";
import Toast from "react-native-toast-message";
import ApiInstance from "../config/Apis/ApiInstance";

export default function Login() {
    const [model, setModel] = useState({});
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const loginAccount = async () => {
        if (!model.email || !model.password) {
            return Toast.show({ type: 'error', text2: 'Email & Password are required' })
        }
        try {
            setLoading(true);
            const res = await ApiInstance.post('/authRoute/login', model);
            setModel({});
            setLoading(false)
            navigation.navigate('CNIC')
        } catch (error) {
            console.log(error);
            ToastAndroid.show(`${error.response?.data?.message}`, ToastAndroid.LONG);
            setLoading(false)
        }
    };

    return (
        <>
            <StatusBar translucent barStyle={'dark-content'} backgroundColor={'transparent'} />
            <View style={styles.container}>
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {/* heading */}
                    <Text style={styles.heading}>Hi, Welcome Back</Text>

                    {/* subheading line */}
                    <Text style={styles.subheading}>
                        Please fill the form below to Login account
                    </Text>

                    <View style={styles.form}>
                        <Text style={styles.label}>Email Address</Text>
                        <TextInput
                            placeholder="Enter your email address"
                            placeholderTextColor="#7f8c8d"
                            style={styles.input}
                            onChangeText={(e) => setModel({ ...model, email: e })}
                            value={model.email || ""}
                            keyboardType="email-address"
                        />

                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            placeholder="Enter your password"
                            placeholderTextColor="#7f8c8d"
                            style={styles.input}
                            maxLength={15}
                            secureTextEntry={true}
                            // textContentType="oneTimeCode"
                            onChangeText={(e) => setModel({ ...model, password: e })}
                            value={model.password || ""}
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        disabled={loading}
                        onPress={loginAccount}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>Sign In</Text>
                        )}
                    </TouchableOpacity>
                    <View style={styles.btnSection}>
                        <Text style={styles.btnText}>Dont have an account? <TouchableOpacity onPress={() => navigation.navigate('SignUp')}><Text style={styles.signUpLink}>SignUp</Text></TouchableOpacity> </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
                            <Text style={styles.btnText}>Forgot Password?</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative'
        // backgroundColor: "#fff",
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
        marginTop: 50
    },
    heading: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#000",
    },
    subheading: {
        fontSize: 14,
        color: "#7f8c8d",
        marginBottom: 30,
    },
    form: {
        gap: 20,
    },
    label: {
        fontSize: 14,
        color: "#000",
    },
    input: {
        borderWidth: 1,
        borderColor: "#7f8c8d",
        borderRadius: 10,
        fontSize: 16,
        color: "#000",
        paddingVertical: 16,
    },

    button: {
        backgroundColor: "#4a235a",
        alignItems: "center",
        paddingVertical: 16,
        borderRadius: 8,
        marginTop: 40,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    btnSection: {
        flexDirection: 'row',
        marginTop: 5,
        justifyContent: 'space-between'
    },
    btnText: {
        color: '#7f8c8d',
    },
    signUpLink: {
        color: '#0e6655'
    }
});
