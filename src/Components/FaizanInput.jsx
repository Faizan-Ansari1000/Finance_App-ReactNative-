import { StyleSheet, TextInput } from "react-native";

export function FaizanInput(props) {
    const { placeholder, onChangeText, value,  } = props;

    return (
        <TextInput
            placeholder={placeholder}
            onChangeText={onChangeText}
            value={value}
            style={styles.input}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: "#7f8c8d",
        borderRadius: 6,
        paddingVertical: 16,
        paddingHorizontal: 10,
        fontSize: 15,
        color: "#000",
    },
});
