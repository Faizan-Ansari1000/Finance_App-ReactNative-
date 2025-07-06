import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { ActivityIndicator, ScrollView, Text, TextInput, TouchableOpacity, View, Image, StyleSheet, ToastAndroid } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/MaterialIcons";
import ApiInstance from "../../../config/Apis/ApiInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Request() {
    const [model, setModel] = useState({});
    const [loading, setLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigation = useNavigation();

    const handleSelectStatus = (status) => {
        setModel({ ...model, status });
        setShowDropdown(false);
    };


    const sentRequest = async () => {
        if (!model.name || !model.cnic || !model.phone || !model.amount || !model.address || !model.purpose || !model.period || !model.income || !model.status || !model.date) {
            return Toast.show({ type: 'error', text1: 'Validation error', text2: 'All Fields are required (except Additional Notes)' });
        }
        if (model.cnic.length < 13) {
            return ToastAndroid.show('Wrong CNIC', ToastAndroid.LONG)
        }
        if (model.phone.length < 11) {
            return ToastAndroid.show('Wrong Phone number')
        }
        try {
            setLoading(true);
            const profileId = await AsyncStorage.getItem('profileId');
            const loanData = { ...model, userId: profileId };
            await ApiInstance.post('/userRoute/loanRequest', loanData);
            console.log(loanData,'navigation to Verification Screen');
            Toast.show({ type: "success", text2: 'Your Request has been Successfully Sent' })
            setModel({});
            setLoading(false)
            navigation.navigate('Verification')
        } catch (error) {
            console.log(error);
            ToastAndroid.show(`${error.response?.data?.message}`, ToastAndroid.LONG);
            setLoading(false)
        }
    };


    return (
        <View style={styles.container}>
            <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput style={styles.input} placeholder="Enter your full name" placeholderTextColor="#7f8c8d"
                    onChangeText={(e) => setModel({ ...model, name: e })} value={model.name || ''} />

                <Text style={styles.label}>CNIC Number</Text>
                <TextInput style={styles.input} placeholder="42201-0000000-0" placeholderTextColor="#7f8c8d"
                    onChangeText={(e) => setModel({ ...model, cnic: e })} value={model.cnic || ''} keyboardType="number-pad" />

                <Text style={styles.label}>Contact Number</Text>
                <TextInput style={styles.input} placeholder="03XX-XXXXXXX" placeholderTextColor="#7f8c8d"
                    onChangeText={(e) => setModel({ ...model, phone: e })} value={model.phone || ''} keyboardType="phone-pad" />

                <Text style={styles.label}>Current Address</Text>
                <TextInput style={styles.input} placeholder="Enter your address" placeholderTextColor="#7f8c8d"
                    onChangeText={(e) => setModel({ ...model, address: e })} value={model.address || ''} />

                <Text style={styles.label}>Loan Amount</Text>
                <TextInput style={styles.input} placeholder="Enter amount" placeholderTextColor="#7f8c8d"
                    onChangeText={(e) => setModel({ ...model, amount: e })} value={model.amount || ''} keyboardType="number-pad" />

                <Text style={styles.label}>Loan Purpose</Text>
                <TextInput style={styles.input} placeholder="e.g. Business" placeholderTextColor="#7f8c8d"
                    onChangeText={(e) => setModel({ ...model, purpose: e })} value={model.purpose || ''} />

                <Text style={styles.label}>Repayment Period (Months)</Text>
                <TextInput style={styles.input} placeholder="e.g. 12" placeholderTextColor="#7f8c8d"
                    onChangeText={(e) => setModel({ ...model, period: e })} value={model.period || ''} keyboardType="number-pad" />

                <Text style={styles.label}>Monthly Income</Text>
                <TextInput style={styles.input} placeholder="e.g. 50000" placeholderTextColor="#7f8c8d"
                    onChangeText={(e) => setModel({ ...model, income: e })} value={model.income || ''} keyboardType="number-pad" />

                <Text style={styles.label}>Employment Status</Text>
                <TouchableOpacity style={styles.input} onPress={() => setShowDropdown(!showDropdown)}>
                    <Text style={{ color: model.status ? '#000' : '#7f8c8d' }}>{model.status || 'Select employment status'}</Text>
                </TouchableOpacity>
                {showDropdown && (
                    <View style={styles.dropdown}>
                        <TouchableOpacity onPress={() => handleSelectStatus("Employed")}><Text style={styles.option}>Employed</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => handleSelectStatus("Unemployed")}><Text style={styles.option}>Unemployed</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => handleSelectStatus("Self-employed")}><Text style={styles.option}>Self-employed</Text></TouchableOpacity>
                    </View>
                )}

                <Text style={styles.label}>Expected First Repayment Date</Text>
                <TextInput style={styles.input} placeholder="e.g. 25/07/2025" placeholderTextColor="#7f8c8d"
                    onChangeText={(e) => setModel({ ...model, date: e })} value={model.date || ''} />

                <Text style={styles.label}>Additional Notes (Optional)</Text>
                <TextInput style={[styles.input, { height: 100 }]} placeholder="Any additional info..." placeholderTextColor="#7f8c8d" multiline
                    onChangeText={(e) => setModel({ ...model, additionDetail: e })} value={model.additionDetail || ''} />

                <TouchableOpacity style={styles.button} disabled={loading} onPress={sentRequest}>
                    {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Send Request</Text>}
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 40
    },
    label: {
        fontSize: 14,
        color: "#000",
        marginBottom: 6,
        marginTop: 16
    },
    input: {
        borderWidth: 1,
        borderColor: "#7f8c8d",
        borderRadius: 6,
        paddingVertical: 16,
        paddingHorizontal: 10,
        fontSize: 15,
        color: "#000",
    },
    button: {
        backgroundColor: "#4a235a",
        alignItems: "center",
        paddingVertical: 16,
        borderRadius: 8,
        marginTop: 20,
        // marginBottom: 20
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    imageRow: {
        // flexDirection: "row",
        // gap: 10,
        marginBottom: 10,
        marginTop: 20,
        alignItems: "center"
    },
    cnicImg: {
        width: 330,
        height: 160,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ccc'
    },
    dropdown: {
        backgroundColor: "#eee",
        borderRadius: 6,
        paddingVertical: 8,
        marginTop: 4
    },
    option: {
        paddingVertical: 10,
        paddingHorizontal: 8,
        fontSize: 14,
        color: "#000"
    }
});
