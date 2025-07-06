import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Home from "../../Screens/Client/Tabs/Home";
import Loans from "../../Screens/Client/Tabs/Loans";
import Profile from "../../Screens/Client/Tabs/Profile";
import Request from "../../Screens/Client/Tabs/Request";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function TabNavigation() {

    const Tab = createBottomTabNavigator();

    return (
        <>
            <Tab.Navigator initialRouteName="Main" screenOptions={{ tabBarActiveTintColor: "#4a235a", tabBarInactiveTintColor: "#bdc3c7", tabBarStyle: { borderTopWidth: 1, height: 60, backgroundColor: '#f4f6f6',paddingTop:5 } }}>
                <Tab.Screen name="Main" component={Home} options={{ headerShown: false, tabBarIcon: ({ focused }) => <MaterialIcons name="home" size={24} color={focused ? "#4a235a" : "#bdc3c7"} /> }} />
                <Tab.Screen name="Request" component={Request} options={{ headerShown: false, tabBarIcon: ({ focused }) => <MaterialIcons name="receipt" size={24} color={focused ? "#4a235a" : "#bdc3c7"} /> }} />
                <Tab.Screen name="Loans" component={Loans} options={{ headerShown: false, tabBarIcon: ({ focused }) => <MaterialIcons name="account-balance" size={24} color={focused ? "#4a235a" : "#bdc3c7"} /> }} />
                <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false, headerTitleAlign: 'center', tabBarIcon: ({ focused }) => <MaterialIcons name="person" size={24} color={focused ? "#4a235a" : "#bdc3c7"} /> }} />
            </Tab.Navigator>
        </>
    )
}
