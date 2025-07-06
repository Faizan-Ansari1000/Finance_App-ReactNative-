import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, ToastAndroid, TouchableOpacity, View, StyleSheet, StatusBar } from "react-native";
import ApiInstance from "../../../config/Apis/ApiInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Loans() {
    const [postData, setPostData] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const getSpecificUser = useCallback(async () => {
        const userId = await AsyncStorage.getItem('profileId')
        try {
            setLoading(true);
            const res = await ApiInstance.get(`/userRoute/loanRequest/${userId}`);
            console.log(res.data);
            setPostData(res.data.data);
        } catch (error) {
            console.log(error);
            ToastAndroid.show(`${error.response?.data?.message}`, ToastAndroid.LONG);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getSpecificUser();
    }, [getSpecificUser]);

    return (
        <>
            <StatusBar translucent barStyle={'dark-content'} backgroundColor={'transparent'} />
            <View style={styles.container}>
                {loading ? (
                    <ActivityIndicator size="large" color="#6A1B9A" />
                ) : postData?.length === 0 ? (
                    <View style={styles.noDataContainer}>
                        <Text style={styles.noDataText}>No Data Found</Text>
                    </View>
                ) : (
                    <FlatList
                        data={postData}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.listContainer}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.rowCard}
                                activeOpacity={0.7}
                                onPress={() => navigation.navigate('DetailLoanRequest', { Request: item })}
                            >
                                <View style={styles.avatar}>
                                    <Text style={styles.avatarText}>
                                        {item.name?.charAt(0).toUpperCase() || '?'}
                                    </Text>
                                </View>

                                <View style={styles.textContainer}>
                                    <Text style={styles.name}>{item.name}</Text>
                                    <Text style={styles.info}>Repayment: {item.period} months</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                )}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: 60,
    },
    listContainer: {
        paddingBottom: 20,
    },
    rowCard: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#EDE7F6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    avatarText: {
        color: '#4A148C',
        fontSize: 20,
        fontWeight: 'bold',
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 4,
    },
    info: {
        fontSize: 13,
        color: '#555',
    },
    noDataContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noDataText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#999999',
    },
});
