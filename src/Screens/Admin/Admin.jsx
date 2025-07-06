import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function Admin() {

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{ paddingRight: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('AdminSetting')}>
                        <Icon name="settings" size={24} />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation])

    return (
        <>
            <StatusBar translucent barStyle={'dark-content'} backgroundColor={'transparent'} />
            <View style={styles.container}>
                <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                    <Text style={styles.heading}>Admin Dashboard</Text>

                    {/* Feature Publishing Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Feature Management</Text>
                        <TouchableOpacity style={styles.adminCard}>
                            <Icon name="new-releases" size={28} color="#4a235a" />
                            <View style={styles.cardContent}>
                                <Text style={styles.cardTitle}>Publish New Feature</Text>
                                <Text style={styles.cardDesc}>Announce or update features for users.</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.adminCard}>
                            <Icon name="edit" size={28} color="#4a235a" />
                            <View style={styles.cardContent}>
                                <Text style={styles.cardTitle}>Edit Features</Text>
                                <Text style={styles.cardDesc}>Modify or remove existing feature posts.</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* User Management */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>User Management</Text>
                        <TouchableOpacity style={styles.adminCard} onPress={() => navigation.navigate('RegUsers')}>
                            <Icon name="people" size={28} color="#4a235a" />
                            <View style={styles.cardContent}>
                                <Text style={styles.cardTitle}>View All Users</Text>
                                <Text style={styles.cardDesc}>See registered users & their profiles.</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.adminCard}>
                            <Icon name="block" size={28} color="#4a235a" />
                            <View style={styles.cardContent}>
                                <Text style={styles.cardTitle}>Block User</Text>
                                <Text style={styles.cardDesc}>Restrict user access or suspend accounts.</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* Analytics */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Analytics & Reports</Text>
                        <TouchableOpacity style={styles.adminCard}>
                            <Icon name="bar-chart" size={28} color="#4a235a" />
                            <View style={styles.cardContent}>
                                <Text style={styles.cardTitle}>User Analytics</Text>
                                <Text style={styles.cardDesc}>See user activity & engagement metrics.</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.adminCard}>
                            <Icon name="show-chart" size={28} color="#4a235a" />
                            <View style={styles.cardContent}>
                                <Text style={styles.cardTitle}>Revenue Reports</Text>
                                <Text style={styles.cardDesc}>Track app revenue & payment stats.</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* App Settings */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Application Settings</Text>
                        <TouchableOpacity style={styles.adminCard}>
                            <Icon name="settings-applications" size={28} color="#4a235a" />
                            <View style={styles.cardContent}>
                                <Text style={styles.cardTitle}>Manage App Settings</Text>
                                <Text style={styles.cardDesc}>Update app configuration & preferences.</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.adminCard}>
                            <Icon name="security" size={28} color="#4a235a" />
                            <View style={styles.cardContent}>
                                <Text style={styles.cardTitle}>Security Settings</Text>
                                <Text style={styles.cardDesc}>Adjust security options & permissions.</Text>
                            </View>
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
        backgroundColor: '#fff',
        paddingTop: 10,
        paddingHorizontal: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4a235a',
        marginBottom: 30,
    },
    section: {
        marginBottom: 40,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#7f8c8d',
        marginBottom: 20,
    },
    adminCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        padding: 16,
        borderRadius: 16,
        marginBottom: 16,
    },
    cardContent: {
        marginLeft: 16,
        flex: 1,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 4,
    },
    cardDesc: {
        fontSize: 13,
        color: '#555',
    },
});
