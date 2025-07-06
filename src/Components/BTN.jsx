import { Text, TouchableOpacity } from "react-native";

export const BTN = (props) => {
    const { onPress, style, label, loading } = props;
    return (
        <TouchableOpacity onPress={onPress} style={style} disabled={loading}>
            <Text>{label}</Text>
        </TouchableOpacity>
    );
};
