import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react"
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";
import ApiInstance from "../../config/Apis/ApiInstance";

export default function RegUsers() {

    const [postData, setPostData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchCnic, setSearchCnic] = useState("");
    const navigation = useNavigation();

    const getUsers = useCallback(async () => {
        try {
            setLoading(true);
            const res = await ApiInstance.get('/profileRoute/profile');
            console.log(res.data);
            setPostData(res.data.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            ToastAndroid.show(`${error.response?.data?.message}`, ToastAndroid.LONG);
            setLoading(false)
        }
    }, [])

    useEffect(() => { getUsers() }, [])

    const filteredData = searchCnic
        ? postData.filter((item) => item.cnic.toLowerCase().includes(searchCnic.toLowerCase()))
        : postData

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Search by CNIC"
                placeholderTextColor="#aaa"
                style={styles.searchInput}
                onChangeText={(e) => setSearchCnic(e)}
                value={searchCnic || ""}
            />

            {loading ? (
                <ActivityIndicator size="large" color="#4A235A" style={{ marginTop: 20 }} />
            ) : (
                <FlatList
                    data={filteredData}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item }) => {
                        const firstLetter = item.name?.charAt(0)?.toUpperCase() || "?";
                        return (
                            <TouchableOpacity
                                style={styles.card}
                                onPress={() => navigation.navigate('RegDetails',{users:item})}
                                activeOpacity={0.7}
                            >
                                <View style={styles.avatar}>
                                    <Text style={styles.avatarText}>{firstLetter}</Text>
                                </View>
                                <View style={styles.content}>
                                    <Text style={styles.name}>{item.name}</Text>
                                    <Text style={styles.cnic}>CNIC: {item.cnic}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        paddingTop: 60,
    },
    searchInput: {
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 16,
        fontSize: 16,
        color: '#333',
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 20,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#eee',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#ede7f6', // light purple
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    avatarText: {
        color: '#4A235A', // main app color
        fontSize: 20,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 4,
    },
    cnic: {
        fontSize: 14,
        color: '#555',
    },
});
