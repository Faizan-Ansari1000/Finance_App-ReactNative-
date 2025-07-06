import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Button,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    ToastAndroid,
    TouchableOpacity,
    View,
} from "react-native";
import ApiInstance from "../../../config/Apis/ApiInstance";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Screen } from "react-native-screens";

export default function Home() {

    const [postData, setPostData] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const getProfile = async () => {
        const profileId = await AsyncStorage.getItem('profileId')
        try {
            setLoading(true);
            const res = await ApiInstance.get(`/profileRoute/profile/${profileId}`)
            setPostData(res.data.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            ToastAndroid.show(`${error.response?.data?.message}`, ToastAndroid.LONG);
            setLoading(false)
        }
    };

    useEffect(() => {
        getProfile();
    }, []);

    return (
        <>
            <StatusBar translucent barStyle={'dark-content'} backgroundColor={'transparent'} />
            <View style={styles.container}>
                <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

                    {/* Top Header */}
                    <View style={styles.headerRow}>
                        {loading ? <ActivityIndicator /> : (<>
                            <Image source={{ uri: postData?.imageUrl || 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg' }} style={styles.profileImg} />
                            <View>
                                <Text style={styles.welcome}>Welcome back</Text>
                                <Text style={styles.name}>{postData?.name || 'N/A'}</Text>
                            </View>
                        </>)}
                        <TouchableOpacity style={styles.notificationBtn} onPress={() => navigation.navigate('Notifications')}>
                            <Icon name="notifications" size={20} color="#4a235a" />
                        </TouchableOpacity>
                    </View>

                    {/* Horizontal Cards */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} keyboardShouldPersistTaps="handled" style={{ marginTop: 30 }}>
                        <TouchableOpacity style={styles.balanceCard}>
                            <View style={styles.balanceRow}>
                                <Text style={styles.balanceLabel}>Balance</Text>
                                <Text style={styles.highlight}>Active</Text>
                            </View>
                            <Text style={styles.balanceAmount}>Rs. 12,000</Text>
                            <Text style={styles.date}>12/04</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.balanceCard}>
                            <View style={styles.balanceRow}>
                                <Text style={styles.balanceLabel}>Savings</Text>
                                <Text style={styles.highlight}>New</Text>
                            </View>
                            <Text style={styles.balanceAmount}>Rs. 8,500</Text>
                            <Text style={styles.date}>15/04</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.balanceCard}>
                            <View style={styles.balanceRow}>
                                <Text style={styles.balanceLabel}>Investments</Text>
                                <Text style={styles.highlight}>Ongoing</Text>
                            </View>
                            <Text style={styles.balanceAmount}>Rs. 20,000</Text>
                            <Text style={styles.date}>18/04</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.balanceCard}>
                            <View style={styles.balanceRow}>
                                <Text style={styles.balanceLabel}>Expenses</Text>
                                <Text style={styles.highlight}>Last</Text>
                            </View>
                            <Text style={styles.balanceAmount}>Rs. 5,200</Text>
                            <Text style={styles.date}>21/04</Text>
                        </TouchableOpacity>
                    </ScrollView>

                    {/* Grid Cards (2 per row) */}
                    <View style={styles.gridWrap}>
                        <View style={styles.gridCardWrap}>
                            <TouchableOpacity style={styles.gridCard} onPress={() => navigation.navigate('Request')}>
                                <View style={styles.iconWrap}>
                                    <Icon name="request-page" size={24} color="#4a235a" />
                                </View>
                                <Text style={styles.gridTitle}>Loan Request</Text>
                                <Text style={styles.gridDesc}>Apply for a new loan</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.gridCardWrap}>
                            <TouchableOpacity style={styles.gridCard}>
                                <View style={styles.iconWrap}>
                                    <Icon name="credit-card" size={24} color="#4a235a" />
                                </View>
                                <Text style={styles.gridTitle}>Payments</Text>
                                <Text style={styles.gridDesc}>Check payment history</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.gridCardWrap}>
                            <TouchableOpacity style={styles.gridCard} >
                                <View style={styles.iconWrap}>
                                    <Icon name="account-balance-wallet" size={24} color="#4a235a" />
                                </View>
                                <Text style={styles.gridTitle}>Testing</Text>
                                <Text style={styles.gridDesc}>View your transactions</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.gridCardWrap}>
                            <TouchableOpacity style={styles.gridCard} onPress={() => navigation.navigate('Setting')}>
                                <View style={styles.iconWrap}>
                                    <Icon name="settings" size={24} color="#4a235a" />
                                </View>
                                <Text style={styles.gridTitle}>Settings</Text>
                                <Text style={styles.gridDesc}>Manage your account</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </ScrollView>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 60,
        paddingHorizontal: 20,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    profileImg: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderColor: '#7f8c8d',
    },
    welcome: {
        fontSize: 14,
        color: '#7f8c8d',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    notificationBtn: {
        marginLeft: 'auto',
        backgroundColor: '#fff',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#7f8c8d',
        padding: 6,
    },
    balanceCard: {
        backgroundColor: '#4a235a',
        padding: 16,
        borderRadius: 18,
        width: 200,
        height: 260,
        marginRight: 16,
        justifyContent: 'space-between',
    },
    balanceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    balanceLabel: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    highlight: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '500',
    },
    balanceAmount: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 6,
    },
    date: {
        color: '#fff',
        fontSize: 12,
        textAlign: 'right',
    },
    gridWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 30,
    },
    gridCardWrap: {
        width: '48%',
        marginBottom: 20,
    },
    gridCard: {
        borderWidth: 1,
        borderColor: '#e5e5e5',
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        gap: 10,
    },
    iconWrap: {
        backgroundColor: '#f2f2f2',
        borderRadius: 30,
        padding: 10,
    },
    gridTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
    },
    gridDesc: {
        fontSize: 12,
        color: '#7f8c8d',
        textAlign: 'center',
    },
});



