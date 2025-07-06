import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View, StyleSheet, ToastAndroid, ActivityIndicator, Modal, StatusBar } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import ApiInstance from "../../../config/Apis/ApiInstance";

export default function Profile() {


    const [postData, setPostData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const navigation = useNavigation();

    const getProfile = async () => {
        const profileId = await AsyncStorage.getItem('profileId')
        try {
            setLoading(true);
            const res = await ApiInstance.get(`/profileRoute/profile/${profileId}`)
            console.log(res.data);
            setPostData(res.data.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            ToastAndroid.show(`${error.response?.data?.message}`, ToastAndroid.LONG);
            setLoading(false)
        }
    }

    useEffect(() => { getProfile(); }, [])

    const logOut = async () => {
        await AsyncStorage.removeItem('profileId');
        navigation.reset({ index: 0, routes: [{ name: 'OnBoarding' }] })
    }

    useEffect(() => {
        if (isOpen) {
            StatusBar.setBackgroundColor('rgba(0,0,0,0.1)');
        } else {
            StatusBar.setBackgroundColor('#ffffff');
        }
    }, [isOpen]);
    return (
        <>

            <View style={[styles.container, { backgroundColor: isOpen ? '#f2f4f4' : '#fff' }]}>
                {/* Modal */}
                <Modal
                    transparent
                    visible={isOpen}
                    animationType="fade"
                    onRequestClose={() => setIsOpen(false)}
                >
                    <View style={styles.overlay}>
                        <View style={styles.modalContainer}>
                            {/* Cancel Icon */}
                            <TouchableOpacity
                                style={styles.closeIcon}
                                onPress={() => setIsOpen(false)}
                            >
                                <Icon name="close" size={24} color="#333" />
                            </TouchableOpacity>

                            <Text style={styles.title}>Are you sure you want to{"\n"}log out?</Text>

                            <TouchableOpacity style={styles.cancelBtn} onPress={() => setIsOpen(false)}>
                                <Text style={styles.cancelText}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.logoutBtnn} onPress={logOut}>
                                <Text style={styles.logoutTextt}>Log Out</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                    <View style={styles.profileHeader}>
                        {loading ? <ActivityIndicator style={{ paddingTop: 20 }} size={24} color={'#4a235a'} /> : <>
                            <Image
                                style={styles.avatar}
                                source={{
                                    uri: postData?.imageUrl || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                                }}
                                resizeMode="cover"
                            />
                            <Text style={styles.name}>{postData?.name || 'Guest User'}</Text>
                            <Text style={styles.email}>{postData?.email || 'guest@example.com'}</Text>
                        </>}
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Personal Info</Text>
                        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('MyProfile')}>
                            <Icon name="person" size={22} color="black" />
                            <Text style={styles.itemText}>Your Profile</Text>
                        </TouchableOpacity>
                        <View style={styles.divider} />
                        <TouchableOpacity style={styles.item}>
                            <Icon name="history" size={22} color="black" />
                            <Text style={styles.itemText}>Transaction History</Text>
                        </TouchableOpacity>
                        <View style={styles.divider} />
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Security</Text>
                        <TouchableOpacity style={styles.item}>
                            <Icon name="face" size={22} color="black" />
                            <Text style={styles.itemText}>Face ID</Text>
                        </TouchableOpacity>
                        <View style={styles.divider} />
                        <TouchableOpacity style={styles.item}>
                            <Icon name="lock" size={22} color="black" />
                            <Text style={styles.itemText}>Change Password</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>General</Text>
                        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Notifications')}>
                            <Icon name="notifications" size={22} color="black" />
                            <Text style={styles.itemText}>Notification</Text>
                        </TouchableOpacity>
                        <View style={styles.divider} />
                        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Languages')}>
                            <Icon name="language" size={22} color="black" />
                            <Text style={styles.itemText}>Languages</Text>
                        </TouchableOpacity>
                        <View style={styles.divider} />
                        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('HelpSupport')}>
                            <Icon name="help-outline" size={22} color="black" />
                            <Text style={styles.itemText}>Help & Support</Text>
                        </TouchableOpacity>
                        <View style={styles.divider} />
                    </View>

                    <TouchableOpacity style={styles.logoutBtn} onPress={() => setIsOpen(true)}>
                        <Text style={styles.logoutText}>Log Out</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </>
    );
}

const styles = StyleSheet.create({

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
        position: "absolute",
        top: 12,
        right: 12,
        zIndex: 10,
    },
    title: {
        fontSize: 18,
        textAlign: "center",
        marginBottom: 28,
        color: "#333",
        fontWeight: "500",
        marginTop: 20
    },
    cancelBtn: {
        width: "70%",
        paddingVertical: 24,
        borderRadius: 8,
        backgroundColor: "#4a235a",
        marginBottom: 6,
        alignItems: "center",
    },
    cancelText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    logoutBtnn: {
        alignItems: "center",
        paddingVertical: 14,
    },
    logoutTextt: {
        color: "#E53935", // red color
        fontSize: 16,
        fontWeight: "600",
    },


    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 10
    },
    profileHeader: {
        alignItems: "center",
        paddingVertical: 30,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: "#4A148C",
    },
    name: {
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
        marginTop: 12,
    },
    email: {
        fontSize: 14,
        color: "#555",
        marginTop: 4,
    },
    section: {
        paddingHorizontal: 20,
        marginTop: 30,
    },
    sectionTitle: {
        fontSize: 16,
        color: "#7f8c8d",
        marginBottom: 12,
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,

    },
    itemText: {
        fontSize: 15,
        color: "#333",
        marginLeft: 12,
    },
    divider: {
        height: 1,
        backgroundColor: "#e0e0e0",
        marginVertical: 8,
    },
    logoutBtn: {
        alignItems: "center",
        marginTop: 40,
        marginBottom: 30,
    },
    logoutText: {
        fontSize: 16,
        color: "#e53935",
        fontWeight: "600",
    },
});
