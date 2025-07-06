import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { Image, ScrollView, Text, View, StyleSheet, ActivityIndicator, ToastAndroid, TouchableOpacity, Modal, StatusBar } from "react-native";
import ApiInstance from "../../config/Apis/ApiInstance";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


export default function MyProfile() {


    const [postData, setPostData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        if (isOpen) {
            StatusBar.setBackgroundColor('rgba(0,0,0,0.1)');
        } else {
            StatusBar.setBackgroundColor('#ffffff');
        }
    }, [isOpen]);

    const getMyProfile = async () => {
        const profileId = await AsyncStorage.getItem('profileId');
        try {
            setLoading(true);
            const res = await ApiInstance.get(`/profileRoute/profile/${profileId}`)
            console.log(res.data);
            setPostData(res.data.data);
            setLoading(false)
        } catch (error) {
            console.log(error);
            ToastAndroid.show(`${error.response?.data?.message}`, ToastAndroid.LONG);
            setLoading(false)
        }
    }

    useEffect(() => { getMyProfile() }, []);

    // delete profile;
    const deleteProfile = useCallback(async () => {
        const profileId = await AsyncStorage.getItem(`profileId`);
        try {
            setLoading(true);
            const res = await ApiInstance.delete(`/profileRoute/profile/${profileId}`)
            console.log(res.data);
            setPostData(res.data.data)
            setLoading(false)
            setIsOpen(false);
            navigation.reset({ index: 0, routes: [{ name: 'OnBoarding' }] })
        } catch (error) {
            console.log(error.message);
            ToastAndroid.show(`${error.response?.data?.message}`, ToastAndroid.LONG);
            setLoading(false)
        }
    }, [])

    return (
        <>
            {/* Modal */}
            <View>
                <Modal
                    transparent
                    visible={isOpen}
                    onRequestClose={() => setIsOpen(false)}
                    animationType="fade"
                >
                    <View style={styles.overlay}>
                        <View style={styles.modalContainer}>

                            {/* Top-right close icon */}
                            <TouchableOpacity style={styles.closeIcon} onPress={() => setIsOpen(false)}>
                                <MaterialIcons name="close" size={24} color="#555" />
                            </TouchableOpacity>

                            {/* Centered text */}
                            <Text style={styles.title}>Are you sure?</Text>
                            <Text style={styles.subtitle}>
                                Do you really want to delete your profile? This action cannot be undone.
                            </Text>

                            {/* Proceed button */}
                            <TouchableOpacity style={styles.proceedButton} onPress={deleteProfile}>
                                <Text style={styles.proceedText}>Proceed</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>

            <View style={styles.container}>
                <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                    {loading ? <ActivityIndicator style={{ paddingTop: 20 }} size={24} color={'#4a235a'} /> : (<>

                        <View style={styles.header}>
                            <Image
                                style={styles.avatar}
                                source={{
                                    uri: postData?.imageUrl || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                                }}
                                resizeMode="cover"
                            />
                            <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
                                <Text style={{ paddingTop: 15, color: 'green', fontWeight: '500' }}>Edit</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.label}>Full Name</Text>
                            <Text style={styles.value}>{postData?.name || 'N/A'}</Text>
                            <View style={styles.line} />

                            <Text style={styles.label}>Email</Text>
                            <Text style={styles.value}>{postData?.email || 'N/A'}</Text>
                            <View style={styles.line} />

                            <Text style={styles.label}>CNIC</Text>
                            <Text style={styles.value}>{postData?.cnic || 'N/A'}</Text>
                            <View style={styles.line} />

                            <Text style={styles.label}>Phone</Text>
                            <Text style={styles.value}>{postData?.phone || 'N/A'}</Text>
                            <View style={styles.line} />

                            <Text style={styles.label}>Location</Text>
                            <Text style={styles.value}>{postData?.location || 'N/A'}</Text>
                            <View style={styles.line} />

                            <Text style={styles.label}>Country</Text>
                            <Text style={styles.value}>{postData?.country || 'N/A'}</Text>
                            <View style={styles.line} />
                            <View>
                                <TouchableOpacity style={{ paddingVertical: 20 }} onPress={() => setIsOpen(true)}>
                                    <Text style={{ color: 'red', fontWeight: '500' }}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </>)}
                </ScrollView>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    // Modal
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.1)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: "80%",
        backgroundColor: "#f2f4f4",
        borderRadius: 26,
        padding: 24,
        alignItems: "center",
        elevation: 3,
        position: "relative",
        height: '40%',
        justifyContent: 'center'
    },
    closeIcon: {
        position: 'absolute',
        top: 12,
        right: 12,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4a235a',
        textAlign: 'center',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 14,
        color: '#555',
        textAlign: 'center',
        marginBottom: 24,
    },
    proceedButton: {
        backgroundColor: '#4a235a',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 8,
        // marginTop:40,
    },
    proceedText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 20
    },
    header: {
        alignItems: "center",
        paddingVertical: 40,
        borderBottomWidth: 1,
        borderBottomColor: "#e0e0e0",
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    section: {
        paddingHorizontal: 20,
        paddingTop: 30,
    },
    label: {
        fontSize: 14,
        color: "#888",
        marginBottom: 4,
    },
    value: {
        fontSize: 16,
        color: "#000",
        marginBottom: 8,
    },
    line: {
        height: 1.5,
        backgroundColor: "#e0e0e0",
        marginBottom: 20,
    },
});