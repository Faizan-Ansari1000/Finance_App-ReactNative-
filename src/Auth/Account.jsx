import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View,
    Image,
} from "react-native";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/MaterialIcons";
import ApiInstance from "../config/Apis/ApiInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

export default function Account() {
    const [model, setModel] = useState({});
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();


    const openCamera = async () => {
        const result = await launchImageLibrary({
            mediaType: "photo",
            saveToPhotos: true,
            includeBase64: true,
        });
        if (!result.didCancel && result.assets && result.assets.length > 0) {
            const imgageUri = result.assets[0].uri;
            setModel({ ...model, imageUrl: imgageUri });
        }
    };


    const createProfile = async () => {
        if (!model.name || !model.email || !model.cnic || !model.phone || !model.location || !model.country) {
            return Toast.show({ type: "error", text2: "All Fields are required, Image is optional" });
        }
        if (model.phone.length < 11) {
            return ToastAndroid.show("Phone number is too short", ToastAndroid.SHORT);
        }
        try {
            setLoading(true);
            const res = await ApiInstance.post("/profileRoute/profile", model);
            await AsyncStorage.setItem("profileId", res.data.data._id);
            Toast.show({ type: "success", text2: "Successfully Profile Created" });
            setModel({});
            setLoading(false);
            navigation.navigate('HappyProfile');
        } catch (error) {
            console.log(error);
            ToastAndroid.show(`${error.response?.data?.message}`, ToastAndroid.LONG);
            setLoading(false);
        }
    };


    return (
        <>
            <StatusBar translucent barStyle={"dark-content"} backgroundColor={"transparent"} />
            <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.container}>
                    {/* profile image picker */}
                    <TouchableOpacity style={styles.imagePicker} onPress={openCamera}>
                        {model.imageUrl ? (
                            <Image source={{ uri: model.imageUrl }} style={styles.profileImage} />
                        ) : (
                            <>
                                <Icon name="photo-camera" size={40} color="#7f8c8d" />
                            </>
                        )}
                    </TouchableOpacity>

                    {/* form fields */}
                    <View style={styles.form}>
                        <Text style={styles.label}>Full Name</Text>
                        <TextInput
                            placeholder="Full Name"
                            placeholderTextColor="#7f8c8d"
                            style={styles.input}
                            onChangeText={(e) => setModel({ ...model, name: e })}
                            value={model.name || ""}
                        />

                        <Text style={styles.label}>Email Address</Text>
                        <TextInput
                            placeholder="Enter your registration email address"
                            placeholderTextColor="#7f8c8d"
                            style={styles.input}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            onChangeText={(e) => setModel({ ...model, email: e })}
                            value={model.email || ""}
                        />

                        <Text style={styles.label}>Correct CNIC</Text>
                        <TextInput
                            placeholder="Enter your registration CNIC 42201-0000000-0"
                            placeholderTextColor="#7f8c8d"
                            style={styles.input}
                            maxLength={15}
                            keyboardType="number-pad"
                            onChangeText={(e) => setModel({ ...model, cnic: e })}
                            value={model.cnic || ""}
                            secureTextEntry
                        />

                        <Text style={styles.label}>Phone Number</Text>
                        <TextInput
                            placeholder="Enter your phone number 0300-0000000"
                            placeholderTextColor="#7f8c8d"
                            style={styles.input}
                            keyboardType="phone-pad"
                            maxLength={12}
                            onChangeText={(e) => setModel({ ...model, phone: e })}
                            value={model.phone || ""}
                        />

                        <Text style={styles.label}>Country</Text>
                        <TextInput
                            placeholder="Enter your country"
                            placeholderTextColor="#7f8c8d"
                            style={styles.input}
                            onChangeText={(e) => setModel({ ...model, country: e })}
                            value={model.country || ""}
                        />

                        <Text style={styles.label}>Location</Text>
                        <TextInput
                            placeholder="Enter your location"
                            placeholderTextColor="#7f8c8d"
                            style={[styles.input, { height: 80 }]}
                            multiline
                            numberOfLines={4}
                            onChangeText={(e) => setModel({ ...model, location: e })}
                            value={model.location || ""}
                        />
                    </View>

                    {/* submit button */}
                    <TouchableOpacity style={styles.button} disabled={loading} onPress={createProfile}>
                        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Create Profile</Text>}
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 10,
    },
    container: {
        flex: 1,
        // backgroundColor: "#fff",
    },
    imagePicker: {
        width: 90,
        height: 90,
        borderRadius: 60,
        backgroundColor: '#d5d8dc',
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 40,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
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
        paddingHorizontal: 10,
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
});
