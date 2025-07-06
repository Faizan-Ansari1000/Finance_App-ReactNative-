import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import ViewLoans from "../../Screens/Admin/AdminTabs/ViewLoans";
import Admin from "../../Screens/Admin/Admin";
import Guarantors from "../../Screens/Admin/AdminTabs/Guarantors";
import PostNotify from "../../Screens/Admin/AdminTabs/PostNotify";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";


export default function AdminTabNavigation() {

    const Tab = createBottomTabNavigator();

    return (
        <>
            <Tab.Navigator screenOptions={{ tabBarActiveTintColor: "#4a235a", tabBarInactiveTintColor: "#bdc3c7", tabBarStyle: { borderTopWidth: 1, height: 60, backgroundColor: '#f4f6f6', paddingTop: 5 },headerTitleAlign:'center' }}>
                <Tab.Screen name="Main" component={Admin} options={{ tabBarIcon: ({ focused, color, size }) => <MaterialIcon name="admin-panel-settings" size={size} color={color} /> }} />
                <Tab.Screen name="Loans" component={ViewLoans} options={{ tabBarIcon: ({ focused, color, size }) => <MaterialIcon name="attach-money" size={size} color={color} /> }} />
                <Tab.Screen name="Guarantor" component={Guarantors} options={{ tabBarIcon: ({ focused, color, size }) => <MaterialIcon name="verified-user" size={size} color={color} /> }} />
                <Tab.Screen name="Upload" component={PostNotify} options={{ tabBarIcon: ({ focused, color, size }) => <MaterialIcon name="upload-file" size={size} color={color} /> }} />
            </Tab.Navigator>
        </>
    )
}