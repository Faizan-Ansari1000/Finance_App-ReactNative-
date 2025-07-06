import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View, StyleSheet, StatusBar } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function Setting() {

    const navigation = useNavigation();

    return (
        <>
            <StatusBar barStyle={'dark-content'} translucent backgroundColor={'transparent'} />
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>

                    <Text style={styles.heading}>Settings</Text>

                    {/* Personal */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Personal</Text>
                        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('MyProfile')}>
                            <Icon name="person" size={22} color="black" />
                            <Text style={styles.itemText}>Account Information</Text>
                        </TouchableOpacity>
                        <View style={styles.divider} />
                        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('EditProfile')}>
                            <Icon name="edit" size={22} color="black" />
                            <Text style={styles.itemText}>Edit Profile</Text>
                        </TouchableOpacity>
                        <View style={styles.divider} />
                        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('ProfilePhoto')}>
                            <Icon name="photo-camera" size={22} color="black" />
                            <Text style={styles.itemText}>Profile Photo</Text>
                        </TouchableOpacity>
                    </View>

                    {/* App Preferences */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>App Preferences</Text>
                        <TouchableOpacity style={styles.item}>
                            <Icon name="notifications-active" size={22} color="black" />
                            <Text style={styles.itemText}>Push Notifications</Text>
                        </TouchableOpacity>
                        <View style={styles.divider} />
                        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Languages')}>
                            <Icon name="language" size={22} color="black" />
                            <Text style={styles.itemText}>Language</Text>
                        </TouchableOpacity>
                        <View style={styles.divider} />
                        <TouchableOpacity style={styles.item}>
                            <Icon name="color-lens" size={22} color="black" />
                            <Text style={styles.itemText}>Theme</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Security */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Security</Text>
                        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('ResetPassword')}>
                            <Icon name="lock" size={22} color="black" />
                            <Text style={styles.itemText}>Change Password</Text>
                        </TouchableOpacity>
                        <View style={styles.divider} />
                        <TouchableOpacity style={styles.item}>
                            <Icon name="fingerprint" size={22} color="black" />
                            <Text style={styles.itemText}>Fingerprint / Face ID</Text>
                        </TouchableOpacity>
                        <View style={styles.divider} />
                        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('TwoFactor')}>
                            <Icon name="security" size={22} color="black" />
                            <Text style={styles.itemText}>Two-Factor Authentication</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Support */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Support</Text>
                        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('HelpSupport')}>
                            <Icon name="help-outline" size={22} color="black" />
                            <Text style={styles.itemText}>Help Center</Text>
                        </TouchableOpacity>
                        <View style={styles.divider} />
                        <TouchableOpacity style={styles.item}>
                            <Icon name="forum" size={22} color="black" />
                            <Text style={styles.itemText}>Contact Support</Text>
                        </TouchableOpacity>
                        <View style={styles.divider} />
                        <TouchableOpacity style={styles.item}>
                            <Icon name="star-rate" size={22} color="black" />
                            <Text style={styles.itemText}>Rate the App</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Legal */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Legal</Text>
                        <TouchableOpacity style={styles.item}>
                            <Icon name="policy" size={22} color="black" />
                            <Text style={styles.itemText}>Privacy Policy</Text>
                        </TouchableOpacity>
                        <View style={styles.divider} />
                        <TouchableOpacity style={styles.item}>
                            <Icon name="gavel" size={22} color="black" />
                            <Text style={styles.itemText}>Terms of Service</Text>
                        </TouchableOpacity>
                        <View style={styles.divider} />
                        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Developer')}>
                            <Icon name="person" size={22} color="black" />
                            <Text style={styles.itemText}>Developer</Text>
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
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    heading: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#4A235A',
        marginBottom: 20,
        textAlign: 'start',
        marginTop:10
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 16,
        color: "#7f8c8d",
        marginBottom: 12,
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
    },
    itemText: {
        fontSize: 15,
        color: "#333",
        marginLeft: 12,
    },
    divider: {
        height: 1.5,
        backgroundColor: "#e0e0e0",
        marginVertical: 6,
    },
});
