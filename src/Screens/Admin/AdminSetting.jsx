import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function AdminSetting() {
    const navigation = useNavigation();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.profileSection}>
                <Image
                    source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg' }}
                    style={styles.profileImg}
                    resizeMode="cover"
                />
                <Text style={styles.name}>Admin Panel</Text>
                <Text style={styles.email}>admin@example.com</Text>
            </View>

            <Text style={styles.sectionTitle}>Management</Text>
            <SettingButton
                icon="people"
                label="Manage Users"
                onPress={() => navigation.navigate('RegUsers')}
            />
            <SettingButton
                icon="notifications-active"
                label="Send Notifications"
                // onPress={() => navigation.navigate('PostNotify')}
            />
            <SettingButton
                icon="analytics"
                label="View Reports"
                // onPress={() => navigation.navigate('Reports')}
            />
            <SettingButton
                icon="post-add"
                label="Post Announcements"
                // onPress={() => navigation.navigate('Announcements')}
            />

            <Text style={styles.sectionTitle}>System</Text>
            <SettingButton
                icon="security"
                label="Security Settings"
                onPress={() => {}}
            />
            <SettingButton
                icon="storage"
                label="Database Status"
                onPress={() => {}}
            />
            <SettingButton
                icon="update"
                label="Check for Updates"
                onPress={() => {}}
            />

            <Text style={styles.sectionTitle}>Support</Text>
            <SettingButton
                icon="help-outline"
                label="Help & Support"
                onPress={() => {}}
            />
            <SettingButton
                icon="info-outline"
                label="About"
                onPress={() => {navigation.navigate('AdminAbout')}}
            />
            <SettingButton
                icon="logout"
                label="Logout"
                onPress={() => {}}
            />
        </ScrollView>
    );
}

const SettingButton = ({ icon, label, onPress }) => (
    <TouchableOpacity style={styles.cardBtn} activeOpacity={0.7} onPress={onPress}>
        <View style={styles.iconWrap}>
            <Icon name={icon} size={22} color="#4A235A" />
        </View>
        <Text style={styles.optionLabel}>{label}</Text>
        <Icon name="chevron-right" size={22} color="#bbb" style={{ marginLeft: 'auto' }} />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 20,
        flexGrow: 1,
        paddingTop:40
    },
    profileSection: {
        alignItems: 'center',
        marginBottom: 30,
    },
    profileImg: {
        width: 90,
        height: 90,
        borderRadius: 45,
        marginBottom: 12,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4A235A',
    },
    email: {
        fontSize: 14,
        color: '#7f8c8d',
        marginTop: 4,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#4A235A',
        marginBottom: 12,
        marginTop: 16,
    },
    cardBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        borderRadius: 14,
        padding: 16,
        marginBottom: 14,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    iconWrap: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f1e6f8',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    optionLabel: {
        fontSize: 15,
        color: '#333',
        flexShrink: 1,
    },
});
