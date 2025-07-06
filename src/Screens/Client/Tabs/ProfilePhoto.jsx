import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, StatusBar, ToastAndroid, View, StyleSheet } from "react-native";
import ApiInstance from "../../../config/Apis/ApiInstance";

export default function ProfilePhoto() {
    const [postData, setPostData] = useState({});
    const [loading, setLoading] = useState(false);

    const getProfilePhoto = async () => {
        const profileId = await AsyncStorage.getItem('profileId');
        try {
            setLoading(true);
            const res = await ApiInstance.get(`/profileRoute/profile/${profileId}`);
            console.log(res.data);
            setPostData(res.data.data);
        } catch (error) {
            console.log(error);
            ToastAndroid.show(`${error.response?.data?.message}`, ToastAndroid.LONG);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { getProfilePhoto(); }, []);

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" />
            <View style={styles.container}>
                {loading ? (
                    <ActivityIndicator size="large" color="#4A235A" />
                ) : (
                    <Image
                        style={styles.image}
                        source={{
                            uri: postData?.imageUrl || 'https://lightwidget.com/wp-content/uploads/localhost-file-not-found.jpg'
                        }}
                        resizeMode="cover"
                    />
                )}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        marginTop: -(StatusBar.currentHeight || 0),
    },
});
