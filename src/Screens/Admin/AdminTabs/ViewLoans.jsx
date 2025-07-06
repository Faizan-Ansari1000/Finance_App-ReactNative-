import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View,
    StyleSheet,
} from "react-native";
import ApiInstance from "../../../config/Apis/ApiInstance";

export default function ViewLoans() {
    const [postData, setPostData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchCnic, setSearchCnic] = useState("");
    const navigation = useNavigation();

    // get data
    const getLoansData = useCallback(async () => {
        try {
            setLoading(true);
            const res = await ApiInstance.get('/userRoute/loanRequest');
            console.log(res.data);
            setPostData(res.data.data);
        } catch (error) {
            console.log(error);
            ToastAndroid.show(`${error.response?.data?.message}`, ToastAndroid.LONG);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { getLoansData(); }, [getLoansData]);

    // search functionality
    const filteredData = searchCnic
        ? postData.filter((item) =>
            item.cnic.toLowerCase().includes(searchCnic.toLowerCase())
        )
        : postData;

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Search by CNIC"
                style={styles.input}
                onChangeText={(e) => setSearchCnic(e)}
                value={searchCnic || ''}
            />

            {loading ? (
                <ActivityIndicator size="large" color="#4A235A" style={{ marginTop: 40 }} />
            ) : (
                <FlatList
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    data={filteredData}
                    contentContainerStyle={{ padding: 16 }}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('LoanDetails', { detailLoan: item })}
                            style={styles.card}
                            activeOpacity={0.8}
                        >
                            <View style={styles.row}>
                                <View style={styles.iconWrap}>
                                    <Text style={styles.initial}>{item.name?.charAt(0) || 'U'}</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.name}>{item.name || 'Unknown'}</Text>
                                    <Text style={styles.cnic}>{item.cnic}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    input: {
        marginHorizontal: 16,
        marginTop: 20,
        paddingVertical: 16,
        paddingHorizontal: 20,
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
        fontSize: 16,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconWrap: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#4a235a22',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    initial: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4A235A',
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
    cnic: {
        fontSize: 14,
        color: '#555',
        marginTop: 4,
    },
});
