import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import store from './redux/store';

import {
    LoginScreen,
    RegisterScreen,
    ForgetPasswordScreen,
    MainScreen,
    ChatMessengerScreen,
    AddFriendScreen,
    CommentScreen,
    SearchScreen,
    SettingScreen,
    MediaPicker,
    ChatInformation,
    EditPostScreen,
    MainMessengerScreen,
    DemoScreen,
    NewPostScreen,
    SharePostScreen,
    HelloScreen
} from './screen';
import { ROUTES } from './constants/routes';

const Stack = createStackNavigator();

// Screen configuration for better maintainability
const SCREENS = [
    { name: ROUTES.ChatMessenger, component: ChatMessengerScreen, headerShown: true },
    { name: ROUTES.Login, component: LoginScreen, headerShown: false },
    { name: ROUTES.ForgetPassword, component: ForgetPasswordScreen, headerShown: false },
    { name: ROUTES.Register, component: RegisterScreen, headerShown: false },
    { name: ROUTES.Main, component: MainScreen, headerShown: false },
    { name: ROUTES.NewPost, component: NewPostScreen, headerShown: false },
    { name: ROUTES.AddFriend, component: AddFriendScreen, headerShown: false },
    { name: ROUTES.Comment, component: CommentScreen, headerShown: false },
    { name: ROUTES.Search, component: SearchScreen, headerShown: false },
    { name: ROUTES.Setting, component: SettingScreen, headerShown: false },
    { name: ROUTES.MediaPicker, component: MediaPicker, headerShown: false },
    { name: ROUTES.ChatInformation, component: ChatInformation, headerShown: false },
    { name: ROUTES.EditPost, component: EditPostScreen, headerShown: false },
    { name: ROUTES.MainMessenger, component: MainMessengerScreen, headerShown: false },
    { name: ROUTES.Demo, component: DemoScreen, headerShown: false },
    { name: ROUTES.SharePost, component: SharePostScreen, headerShown: false },
    { name: ROUTES.Hello, component: HelloScreen, headerShown: true },
];

const App = () => {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName={ROUTES.Login}
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    {SCREENS.map(({ name, component, headerShown }) => (
                        <Stack.Screen
                            key={name}
                            name={name}
                            component={component}
                            options={{ headerShown }}
                        />
                    ))}
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
};

const AppWrapper = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

export default AppWrapper;
