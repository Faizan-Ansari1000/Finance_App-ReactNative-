import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { ActivityIndicator, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View, StyleSheet, ToastAndroid } from "react-native";
import Toast from "react-native-toast-message";
import ApiInstance from "../../../config/Apis/ApiInstance";


export default function Verification() {

    const [model, setModel] = useState({});
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const saveGuarantor = async () => {
        if (!model.name || !model.cnic || !model.phone || !model.relation || !model.address || !model.income || !model.occupation || !model.consent) {
            return Toast.show({ type: 'error', text1: 'Validation error', text2: 'All Fields are required' })
        }
        if (model.cnic.length < 13) {
            return ToastAndroid.show('Wrong CNIC', ToastAndroid.LONG)
        }
        if (model.phone.length < 11) {
            return ToastAndroid.show('Wrong Phone Number', ToastAndroid.LONG)
        }
        try {
            setLoading(true);
            const res = await ApiInstance.post('/userRoute/guarantor', model)
            Toast.show({ type: 'success', text2: 'Successfully Guarantor Saved' })
            setModel({});
            setLoading(false);
            navigation.navigate('Success')
        } catch (error) {
            console.log(error);
            ToastAndroid.show(`${error.response?.data?.message}`, ToastAndroid.LONG);
            setLoading(false)
        }

    }

    return (
        <>
            <StatusBar translucent barStyle="dark-content" backgroundColor="transparent" />
            <View style={styles.container}>
                <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Professional informational paragraph */}
                    <Text style={styles.infoText}>
                        To proceed with your loan application, it is mandatory to provide complete and accurate guarantor details. Applications submitted without guarantor information will not be considered for approval. The guarantor acts as a security for your loan repayment, and ensures the lender of your credibility. Kindly fill in the following fields carefully.
                    </Text>

                    <View style={styles.form}>
                        <Text style={styles.label}>Guarantor Full Name</Text>
                        <TextInput style={styles.input} placeholder="Guarantor full name" placeholderTextColor="#7f8c8d" onChangeText={(e) => setModel({ ...model, name: e })} value={model.name || ''} />

                        <Text style={styles.label}>Guarantor CNIC Number</Text>
                        <TextInput style={styles.input} placeholder="Guarantor CNIC number" keyboardType="number-pad" placeholderTextColor="#7f8c8d" maxLength={15} onChangeText={(e) => setModel({ ...model, cnic: e })} value={model.cnic || ''} />

                        <Text style={styles.label}>Guarantor Contact Number</Text>
                        <TextInput style={styles.input} placeholder="Guarantor contact number" keyboardType="number-pad" placeholderTextColor="#7f8c8d" maxLength={12} onChangeText={(e) => setModel({ ...model, phone: e })} value={model.phone || ''} />

                        <Text style={styles.label}>Relationship with Applicant</Text>
                        <TextInput style={styles.input} placeholder="Relationship with applicant" placeholderTextColor="#7f8c8d" onChangeText={(e) => setModel({ ...model, relation: e })} value={model.relation || ''} />

                        <Text style={styles.label}>Guarantor Address</Text>
                        <TextInput style={styles.input} placeholder="Guarantor full address" placeholderTextColor="#7f8c8d" onChangeText={(e) => setModel({ ...model, address: e })} value={model.address || ''} />

                        <Text style={styles.label}>Guarantor Monthly Income</Text>
                        <TextInput style={styles.input} placeholder="Guarantor monthly income" keyboardType="number-pad" placeholderTextColor="#7f8c8d" onChangeText={(e) => setModel({ ...model, income: e })} value={model.income || ''} />

                        <Text style={styles.label}>Guarantor Occupation</Text>
                        <TextInput style={styles.input} placeholder="Guarantor occupation" placeholderTextColor="#7f8c8d" onChangeText={(e) => setModel({ ...model, occupation: e })} value={model.occupation || ''} />

                        <Text style={styles.label}>Guarantor Consent</Text>
                        <TextInput style={styles.input} placeholder="Guarantor consent Yes/no" placeholderTextColor="#7f8c8d" onChangeText={(e) => setModel({ ...model, consent: e })} value={model.consent || ''} />

                        <TouchableOpacity style={styles.button} disabled={loading} onPress={saveGuarantor}>
                            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Save</Text>}
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
    },
    infoText: {
        fontSize: 14,
        color: "#7f8c8d",
        textAlign: "justify",
        marginBottom: 30,
        lineHeight: 22,
        borderBottomWidth: 1,
        borderColor: '#7f8c8d',
        paddingBottom: 10,
        fontStyle: 'italic',
        letterSpacing: 1
    },
    form: {
        gap: 20,
    },
    label: {
        fontSize: 14,
        color: "#000",
        marginBottom: 6,
    },
    input: {
        borderWidth: 1,
        borderColor: "#7f8c8d",
        borderRadius: 8,
        fontSize: 16,
        color: "#000",
        paddingVertical: 16,
        paddingHorizontal: 12,
    },
    button: {
        backgroundColor: "#4a235a",
        alignItems: "center",
        paddingVertical: 16,
        borderRadius: 8,
        marginTop: 30,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
