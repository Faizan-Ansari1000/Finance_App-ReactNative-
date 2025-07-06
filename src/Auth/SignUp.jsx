import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
    ActivityIndicator, ScrollView, StatusBar, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View,
} from "react-native";
import Toast from "react-native-toast-message";
import ApiInstance from "../config/Apis/ApiInstance";
import Icon from "react-native-vector-icons/MaterialIcons";


export default function SignUp() {
    const [model, setModel] = useState({});
    const [loading, setLoading] = useState(false);
    const [agree, setAgree] = useState(false);
    const navigation = useNavigation();

    const createAccount = async () => {
        if (!model.cnic || !model.email || !model.password) {
            return Toast.show({ type: 'error', text2: 'SOme Fields are missing' })
        }
        if (model.password.length < 4) {
            return ToastAndroid.show('Password is to short', ToastAndroid.LONG)
        }
        if (!model.email.includes('@')) {
            return ToastAndroid.show('@ is missing in email', ToastAndroid.LONG)
        };
        if (agree !== true) {
            return ToastAndroid.show('Please Mark the Check & continue using this App', ToastAndroid.LONG)
        }
        if (model.cnic.length < 13) {
            return ToastAndroid.show('Wrong Cnic', ToastAndroid.LONG)
        }
        try {
            setLoading(true);
            const res = await ApiInstance.post('/authRoute/signUp', model);
            console.log(res.data)
            Toast.show({ type: 'success', text2: 'Successfully Account Registered' })
            navigation.navigate('Account')
            setModel({});
            setLoading(false);
        } catch (error) {
            console.log(error.message);
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
                    <Text style={styles.heading}>Create Account</Text>

                    {/* subheading  */}
                    <Text style={styles.subheading}>
                        Please fill the form below to create a new account
                    </Text>

                    <View style={styles.form}>
                        <Text style={styles.label}>CNIC</Text>
                        <TextInput
                            placeholder="Enter your Cnic number"
                            placeholderTextColor="#7f8c8d"
                            style={styles.input}
                            keyboardType="number-pad"
                            maxLength={15}
                            onChangeText={(e) => setModel({ ...model, cnic: e })}
                            value={model.cnic || ""}
                            secureTextEntry
                        />
                        <Text style={styles.label}>Email Address</Text>
                        <TextInput
                            placeholder="Enter your email address"
                            placeholderTextColor="#7f8c8d"
                            style={styles.input}
                            onChangeText={(e) => setModel({ ...model, email: e })}
                            value={model.email || ""}
                            autoCapitalize="none"
                        />

                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            placeholder="Enter your password"
                            placeholderTextColor="#7f8c8d"
                            style={styles.input}
                            maxLength={15}
                            secureTextEntry
                            onChangeText={(e) => setModel({ ...model, password: e })}
                            value={model.password || ""}
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        disabled={loading}
                        onPress={createAccount}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>Create An Account</Text>
                        )}
                    </TouchableOpacity>
                    <View>
                        <Text style={{ textAlign: 'center', marginTop: 5, color: '#7f8c8d' }}>Already have an Account?
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <Text style={{ color: '#0e6655', fontWeight: '600' }}> Login</Text>
                            </TouchableOpacity> </Text>
                    </View>

                    <View>
                        <Text style={styles.bottomText}>
                            By signing up you agree to our  <Text style={styles.termsText}>Terms {"\n"} and Conditions of use  <TouchableOpacity onPress={() => setAgree(!agree)}>
                                <Icon
                                    name={agree ? "check-box" : "check-box-outline-blank"}
                                    size={20}
                                    color="#4a235a"
                                />
                            </TouchableOpacity> </Text>
                        </Text>
                    </View>
                </ScrollView>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "#fff",
        position: 'relative'
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
    bottomText: {
        color: "#7f8c8d",
        fontSize: 14,
        textAlign: "center",
        marginTop: 60,
    },
    termsText: {
        color: "#000",
        fontWeight: "400",
    },
});
