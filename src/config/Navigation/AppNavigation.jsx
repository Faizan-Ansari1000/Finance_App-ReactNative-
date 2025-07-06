import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoarding1 from '../../Screens/Random/OnBoarding1';
import OnBoarding from '../../Screens/Random/OnBoarding';
import OnBoarding2 from '../../Screens/Random/OnBoarding2';
import SignUp from '../../Auth/SignUp';
import Login from '../../Auth/Login';
import Toast from 'react-native-toast-message';
import CNIC from '../../Auth/CNIC';
import Account from '../../Auth/Account';
import ResetPassword from '../../Auth/ResetPassword';
import TabNavigation from './TabNavigation';
import Verification from '../../Screens/Client/Guarantor/Verification';
import DetailLoanRequest from '../../Screens/Client/DetailLoanRequest';
import MyProfile from '../../Screens/Client/MyProfile';
import EditProfile from '../../Screens/Client/EditProfile';
import Setting from '../../Screens/Client/Setting';
import Languages from '../../Screens/Client/Languages';
import ProfilePhoto from '../../Screens/Client/Tabs/ProfilePhoto';
import HelpSupport from '../../Screens/Client/HelpSupport';
import AdminTabNavigation from './AdminTabNavigation';
import LoanDetails from '../../Screens/Admin/Details/LoanDetails';
import GuarantorDetail from '../../Screens/Admin/Details/GuarantorDetail';
import Notifications from '../../Screens/Client/Notifications';
import Success from '../../Screens/Client/Success';
import HappyProfile from '../../Screens/Client/HappyProfile';
import RegUsers from '../../Screens/Admin/RegUsers';
import RegDetails from '../../Screens/Admin/Details/RegDetails';
import AdminSetting from '../../Screens/Admin/AdminSetting';
import AdminAbout from '../../Screens/Admin/AdminAbout';
import TwoFactor from '../../Screens/Client/TwoFactor';
import Developer from '../../Screens/Random/Developer';


export default function AppNavigation() {

    const Stack = createNativeStackNavigator();

    return (
        <>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='OnBoarding' screenOptions={{ headerShown: false, }} >


                    {/* Random */}
                    <Stack.Screen name='OnBoarding' component={OnBoarding} />
                    <Stack.Screen name='OnBoarding1' component={OnBoarding1} />
                    <Stack.Screen name='OnBoarding2' component={OnBoarding2} />
                    <Stack.Screen name='Developer' component={Developer} />

                    {/* Auth */}
                    <Stack.Screen name='SignUp' component={SignUp} />
                    <Stack.Screen name='Login' component={Login} />
                    <Stack.Screen name='CNIC' component={CNIC} />
                    <Stack.Screen name='Account' component={Account} />
                    <Stack.Screen name='ResetPassword' component={ResetPassword} />
                    <Stack.Screen name='MyProfile' options={{ headerTitleAlign: 'center', headerTitleStyle: { fontSize: 18, }, }} component={MyProfile} />
                    <Stack.Screen name='EditProfile' component={EditProfile} />


                    {/* DashBoard */}
                    <Stack.Screen name='Home' component={TabNavigation} />
                    <Stack.Screen name='Verification' component={Verification} />
                    <Stack.Screen name='DetailLoanRequest' component={DetailLoanRequest} />
                    <Stack.Screen name='Setting' component={Setting} />
                    <Stack.Screen name='Languages' component={Languages} />
                    <Stack.Screen name='ProfilePhoto' component={ProfilePhoto} />
                    <Stack.Screen name='HelpSupport' component={HelpSupport} />
                    <Stack.Screen name='Notifications' component={Notifications} />
                    <Stack.Screen name='Success' component={Success} />
                    <Stack.Screen name='HappyProfile' component={HappyProfile} />


                    {/* Admin */}
                    <Stack.Screen name='Admin' component={AdminTabNavigation} />
                    <Stack.Screen name='LoanDetails' component={LoanDetails} />
                    <Stack.Screen name='GuarantorDetail' component={GuarantorDetail} />
                    <Stack.Screen name='RegUsers' component={RegUsers} />
                    <Stack.Screen name='RegDetails' component={RegDetails} />
                    <Stack.Screen name='AdminSetting' component={AdminSetting} />
                    <Stack.Screen name='AdminAbout' component={AdminAbout} />
                    <Stack.Screen name='TwoFactor' component={TwoFactor} />


                </Stack.Navigator>
                <Toast />
            </NavigationContainer>
        </>
    )
}
