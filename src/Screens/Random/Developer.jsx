import { ScrollView, View, Text, Image, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Developer() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Developer Photo & Name */}
            <Image
                source={{
                    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU',
                }}
                style={styles.profileImg}
            />
            <Text style={styles.name}>Faizan Ansari</Text>
            <Text style={styles.role}>Full Stack Developer</Text>

            {/* Bio */}
            <Text style={styles.bio}>
                Passionate developer with expertise in React Native, Node.js & MongoDB.
                Building modern mobile apps with beautiful UIs and solid backends.
            </Text>

            {/* Contact Info */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Contact</Text>
                <TouchableOpacity style={styles.contactRow}>
                    <Icon name="email" size={22} color="#4a235a" />
                    <Text style={styles.contactText}>your.email@example.com</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.contactRow}>
                    <Icon name="public" size={22} color="#4a235a" />
                    <Text style={styles.contactText}>linkedin.com/in/yourprofile</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.contactRow}>
                    <Icon name="account-circle" size={22} color="#4a235a" />
                    <Text style={styles.contactText}>github.com/yourusername</Text>
                </TouchableOpacity>

            </View>

            {/* Tech Stack */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Tech Stack</Text>
                <View style={styles.techList}>
                    <Text style={styles.techBadge}>React Native</Text>
                    <Text style={styles.techBadge}>Node.js</Text>
                    <Text style={styles.techBadge}>Express</Text>
                    <Text style={styles.techBadge}>MongoDB</Text>
                    <Text style={styles.techBadge}>Firebase</Text>
                </View>
            </View>

            {/* App Info */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>About This App</Text>
                <Text style={styles.appInfo}>
                    This app is a microfinance management system developed as a personal
                    project for learning, building, and showcasing advanced mobile app
                    development skills. All features are built using dummy data and do not
                    process real transactions.
                </Text>
                <Text style={styles.version}>Version 1.0.0 © 2025</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: '#fff',
        paddingTop: 35
    },
    profileImg: {
        width: 120,
        height: 120,
        borderRadius: 60,
        alignSelf: 'center',
        marginBottom: 16,
    },
    name: {
        fontSize: 22,
        fontWeight: '700',
        color: '#4a235a',
        textAlign: 'center',
    },
    role: {
        fontSize: 16,
        color: '#7f8c8d',
        textAlign: 'center',
        marginBottom: 16,
    },
    bio: {
        fontSize: 14,
        color: '#333',
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 22,
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#4a235a',
        marginBottom: 12,
    },
    contactRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        gap: 10,
    },
    contactText: {
        fontSize: 14,
        color: '#4a235a',
    },
    techList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    techBadge: {
        fontSize: 12,
        color: '#fff',
        backgroundColor: '#4a235a',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
    },
    appInfo: {
        fontSize: 14,
        color: '#333',
        lineHeight: 22,
    },
    version: {
        marginTop: 10,
        fontSize: 12,
        color: '#7f8c8d',
        textAlign: 'center',
    },
});
