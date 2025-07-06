import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Modal, ScrollView, StatusBar, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/MaterialIcons";
import ApiInstance from "../../../config/Apis/ApiInstance";

export default function PostNotify() {

    const [model, setModel] = useState({});
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const navigation = useNavigation();

    const openGallery = async () => {
        const result = await launchImageLibrary({ mediaType: 'photo', saveToPhotos: true, includeBase64: true });
        if (!result.didCancel && result.assets && result.assets.length > 0) {
            const imageUri = result.assets[0].uri;
            setModel({ ...model, imageURL: imageUri });
        }
    };

    const postUpdate = async () => {
        if (!model.title || !model.target || !model.detail) {
            return Toast.show({ type: 'error', text2: 'All fields are required without image' });
        }
        try {
            setLoading(true);
            await ApiInstance.post('/userRoute/notify', model);
            setModel({});
            setLoading(false);
            setIsOpen(true);
        } catch (error) {
            console.log(error);
            ToastAndroid.show(`${error.response?.data?.message}`, ToastAndroid.LONG);
            setLoading(false);
        }
    };

    const backToHome = () => {
        navigation.reset({ index: 0, routes: [{ name: 'Admin' }] });
    };

    useEffect(() => {
        if (isOpen) {
            StatusBar.setBackgroundColor('rgba(0,0,0,0.5)');
        } else {
            StatusBar.setBackgroundColor('#fff');
        }
    }, [isOpen])


    return (
        <>
            {/* Modal center */}
            <Modal transparent visible={isOpen} onRequestClose={() => setIsOpen(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalCard}>
                        {/* Cancel icon */}
                        <TouchableOpacity onPress={() => setIsOpen(false)} style={styles.modalCloseIcon}>
                            <Icon name="close" size={28} color="#4A235A" />
                        </TouchableOpacity>
                        <Image
                            source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/007/938/803/small_2x/concept-illustration-successful-young-business-man-with-high-self-esteem-and-confidence-dressed-in-stylish-suit-pointing-himself-with-fingers-proud-and-happy-flat-cartoon-style-free-vector.jpg' }}
                            style={styles.modalImage}
                            resizeMode="center"
                        />
                        <Text style={styles.modalTitle}>Your Update is Successfully Posted!</Text>
                        <TouchableOpacity style={styles.modalBtn} onPress={backToHome}>
                            <Text style={styles.modalBtnText}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <View style={styles.container}>
                <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                    {/* Image Picker */}
                    <TouchableOpacity style={styles.imagePicker} onPress={openGallery}>
                        {model.imageURL ? (
                            <Image source={{ uri: model.imageURL }} style={styles.selectedImage} resizeMode="cover" />
                        ) : (
                            <View style={styles.imagePlaceholder}>
                                <Icon name="photo-library" size={40} color="#7f8c8d" />
                            </View>
                        )}
                    </TouchableOpacity>

                    {/* Input Fields */}
                    <View style={styles.inputSection}>
                        <Text style={styles.label}>Title</Text>
                        <TextInput
                            placeholder="Enter the title for users"
                            style={styles.input}
                            placeholderTextColor="#999"
                            onChangeText={(e) => setModel({ ...model, title: e })}
                            value={model.title || ''}
                        />

                        <Text style={styles.label}>Audience</Text>
                        <TextInput
                            placeholder="All / Specific"
                            style={styles.input}
                            placeholderTextColor="#999"
                            onChangeText={(e) => setModel({ ...model, target: e })}
                            value={model.target || ''}
                        />

                        <Text style={styles.label}>Detail</Text>
                        <TextInput
                            placeholder="Enter the detail for users"
                            style={[styles.input, styles.multiInput]}
                            placeholderTextColor="#999"
                            multiline
                            numberOfLines={4}
                            onChangeText={(e) => setModel({ ...model, detail: e })}
                            value={model.detail || ''}
                        />

                        {/* Post Button */}
                        <TouchableOpacity style={styles.submitBtn} disabled={loading} onPress={postUpdate}>
                            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitBtnText}>Post Update</Text>}
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
        backgroundColor: "#fff",
        padding: 20,
    },
    imagePicker: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#f0f0f0",
        overflow: 'hidden',
        marginBottom: 30,
        alignSelf: 'center'
    },
    selectedImage: {
        width: '100%',
        height: '100%',
    },
    imagePlaceholder: {
        justifyContent: 'center',
        alignItems: 'center',
        top: 20
    },
    imagePlaceholderText: {
        fontSize: 14,
        color: "#7f8c8d",
        marginTop: 8,
    },
    label: {
        fontSize: 14,
        color: "#7f8c8d",
        marginBottom: 6,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 12,
        padding: 12,
        paddingVertical: 16,
        fontSize: 14,
        color: "#000",
        marginBottom: 20,
    },
    multiInput: {
        height: 100,
        textAlignVertical: "top",
    },
    submitBtn: {
        backgroundColor: "#4A235A",
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: "center",
    },
    submitBtnText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: "center",
        alignItems: "center",
    },
    modalCard: {
        width: "85%",
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        elevation: 5,
    },
    modalCloseIcon: {
        alignSelf: "flex-end",
    },
    modalImage: {
        width: 200,
        height: 200,
    },
    modalTitle: {
        fontSize: 18,
        // fontWeight: "bold",
        color: "#4A235A",
        marginTop: 20,
        textAlign: "center",
    },
    modalBtn: {
        marginTop: 30,
        backgroundColor: "#4A235A",
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderRadius: 12,
    },
    modalBtnText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
