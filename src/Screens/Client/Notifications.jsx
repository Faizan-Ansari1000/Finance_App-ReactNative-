// import { useNavigation } from "@react-navigation/native";
// import { useCallback, useEffect, useState } from "react";
// import { ActivityIndicator, FlatList, Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
// import ApiInstance from "../../config/Apis/ApiInstance";

// export default function Notifications() {

//     const [postData, setPostData] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const navigation = useNavigation();

//     const getNotifications = useCallback(async () => {
//         try {
//             setLoading(true);
//             const res = await ApiInstance.get('/userRoute/notify');
//             console.log(res.data);
//             setPostData(res.data.data);
//             setLoading(false);
//         } catch (error) {
//             console.log(error);
//             ToastAndroid.show(`${error.response?.data?.message}`, ToastAndroid.LONG);
//             setLoading(false);
//         }
//     }, []);

//     useEffect(() => { getNotifications() }, []);

//     return (
//         <View style={styles.container}>
//             {loading ? (
//                 <ActivityIndicator size="large" color="#4A235A" />
//             ) : postData.length === 0 ? (
//                 <View style={styles.emptyContainer}>
//                     <Text style={styles.emptyText}>No Updates Found</Text>
//                 </View>
//             ) : (
//                 <FlatList
//                     data={postData}
//                     showsVerticalScrollIndicator={false}
//                     keyExtractor={(_, index) => index.toString()}
//                     renderItem={({ item }) => (
//                         <TouchableOpacity style={styles.card}>
//                             <Image
//                                 source={{ uri: item?.imageURL || 'https://via.placeholder.com/150/cccccc/808080?Text=No+Image' }}
//                                 style={styles.image}
//                                 resizeMode="cover"
//                             />
//                             <View style={styles.content}>
//                                 <Text style={styles.title}>{item.title}</Text>
//                                 <Text style={styles.audience}>Audience: {item.target}</Text>
//                                 <Text style={styles.detail}>{item.detail}</Text>
//                             </View>
//                         </TouchableOpacity>
//                     )}
//                 />
//             )}
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#fff",
//         padding: 20,
//         paddingTop:30
//     },
//     emptyContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     emptyText: {
//         fontSize: 16,
//         color: "#999",
//         textAlign: "center",
//     },
//     card: {
//         backgroundColor: "#f9f9f9",
//         borderRadius: 16,
//         marginBottom: 16,
//         overflow: "hidden",
//         elevation: 3,
//         margin:5
//     },
//     image: {
//         width: "100%",
//         height: 180,
//     },
//     content: {
//         padding: 16,
//     },
//     title: {
//         fontSize: 18,
//         color: "#4A235A",
//         fontWeight: "bold",
//         marginBottom: 8,
//     },
//     audience: {
//         fontSize: 14,
//         color: "#7f8c8d",
//         marginBottom: 6,
//     },
//     detail: {
//         fontSize: 14,
//         color: "#555",
//     },
// });




import { useNavigation, useFocusEffect } from "@react-navigation/native";  // ⬅️ useFocusEffect add
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import ApiInstance from "../../config/Apis/ApiInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";  // ⬅️ AsyncStorage import

export default function Notifications() {
    const [postData, setPostData] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const getNotifications = useCallback(async () => {
        try {
            setLoading(true);
            const res = await ApiInstance.get('/userRoute/notify');
            console.log(res.data);
            setPostData(res.data.data);

            // ⬇️ agar nayi notification hai to dot ko true kar do
            if (res.data?.data?.length > 0) {
                await AsyncStorage.setItem('hasUnread', 'true');
            }

            setLoading(false);
        } catch (error) {
            console.log(error);
            ToastAndroid.show(`${error.response?.data?.message}`, ToastAndroid.LONG);
            setLoading(false);
        }
    }, []);

    useEffect(() => { getNotifications() }, []);

    useFocusEffect(
        useCallback(() => {
            const resetUnread = async () => {
                await AsyncStorage.setItem('hasUnread', 'false');
            };
            resetUnread();
        }, [])
    );

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#4A235A" />
            ) : postData.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No Updates Found</Text>
                </View>
            ) : (
                <FlatList
                    data={postData}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.card}>
                            <Image
                                source={{ uri: item?.imageURL || 'https://via.placeholder.com/150/cccccc/808080?Text=No+Image' }}
                                style={styles.image}
                                resizeMode="cover"
                            />
                            <View style={styles.content}>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.audience}>Audience: {item.target}</Text>
                                <Text style={styles.detail}>{item.detail}</Text>
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
        backgroundColor: "#fff",
        padding: 20,
        paddingTop: 30,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: "#999",
        textAlign: "center",
    },
    card: {
        backgroundColor: "#f9f9f9",
        borderRadius: 16,
        marginBottom: 16,
        overflow: "hidden",
        elevation: 3,
        margin: 5,
    },
    image: {
        width: "100%",
        height: 180,
    },
    content: {
        padding: 16,
    },
    title: {
        fontSize: 18,
        color: "#4A235A",
        fontWeight: "bold",
        marginBottom: 8,
    },
    audience: {
        fontSize: 14,
        color: "#7f8c8d",
        marginBottom: 6,
    },
    detail: {
        fontSize: 14,
        color: "#555",
    },
});
