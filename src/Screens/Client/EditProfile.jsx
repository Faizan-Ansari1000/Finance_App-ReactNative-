import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { ActivityIndicator, Image, Text, TextInput, ToastAndroid, TouchableOpacity, View, StyleSheet, ScrollView } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import ApiInstance from "../../config/Apis/ApiInstance";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function EditProfile() {
  const [model, setModel] = useState({});
  const [loading, setLoading] = useState(false);
  const message = 'Profile Not Updated';

  const openGallery = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo', includeBase64: true, saveToPhotos: true });
    if (!result.didCancel && result.assets && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;
      setModel({ ...model, imageUrl: imageUri });
    }
  };

  const updateProfile = async () => {
    if(!model){
        return Toast.show({type:'error',text2:'Error'})
    }
    const profileId = await AsyncStorage.getItem('profileId');
    try {
      setLoading(true);
      await ApiInstance.put(`/profileRoute/profile/${profileId}`, model);
      Toast.show({ type: 'success', text2: 'Successfully Profile Updated' });
      setModel({});
    } catch (error) {
      console.log(error);
      ToastAndroid.show(`${error.response?.data?.message} ${message} `, ToastAndroid.LONG);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={openGallery} style={styles.imageWrapper}>
          {model.imageUrl ? (
            <Image source={{ uri: model.imageUrl }} style={styles.avatar} />
          ) : (
            <View style={styles.placeholder}>
              <Icon name="photo-camera" size={36} color="#999" />
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>New Name</Text>
        <TextInput
          placeholder="Enter your new name"
          style={styles.input}
          onChangeText={(e) => setModel({ ...model, name: e })}
          value={model.name || ''}
          placeholderTextColor="#abb2b9"
        />

        <Text style={styles.label}>New Phone</Text>
        <TextInput
          placeholder="Enter your new phone number"
          maxLength={12}
          keyboardType="number-pad"
          style={styles.input}
          onChangeText={(e) => setModel({ ...model, phone: e })}
          value={model.phone || ''}
          placeholderTextColor="#abb2b9"
        />

        <Text style={styles.label}>Country Name</Text>
        <TextInput
          placeholder="Enter your country name"
          style={styles.input}
          onChangeText={(e) => setModel({ ...model, country: e })}
          value={model.country || ''}
          placeholderTextColor="#abb2b9"
        />

        <Text style={styles.label}>Updated Location</Text>
        <TextInput
          placeholder="Enter your updated address"
          maxLength={30}
          multiline
          numberOfLines={4}
          style={[styles.input, styles.multiline]}
          onChangeText={(e) => setModel({ ...model, location: e })}
          value={model.location || ''}
          placeholderTextColor="#abb2b9"
        />

        <TouchableOpacity
          style={[styles.saveButton, loading && { opacity: 0.6 }]}
          disabled={loading}
          onPress={updateProfile}
        >
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveButtonText}>Save Changes</Text>}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  imageWrapper: {
    borderRadius: 80,
    overflow: 'hidden',
    width: 120,
    height: 120,
    borderWidth: 0,
    // borderColor: '#7f8c8d',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#f2f2f2',
  },
  formContainer: {
    marginBottom: 40,
  },
  label: {
    fontSize: 14,
    color: '#808b96',
    marginBottom: 6,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#7f8c8d',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 12,
    fontSize: 15,
    color: '#000',
  },
  multiline: {
    height: 100,
  },
  saveButton: {
    backgroundColor: '#4a235a',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
