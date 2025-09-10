import React, { Component } from "react";
import {
    View,
    FlatList,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { BackButton } from "../components";
import { theme } from "../components/core/theme";
import { Divider } from "react-native-elements";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { chat, message } from "../handle_api";
import { ROUTES } from "../constants/routes";
import Logger from "../helpers/logger";
const { width } = Dimensions.get("window");

export default function ChatInformation({ route, navigation }) {
    const token = useSelector(state => state.authReducer.token);
    const { item } = route.params;
    Logger.log('ChatInformation route item', item);
    const onDeleteChat = async () => {
        try {
            const deleteChat = await chat.deleteChat(item._id, token);
            navigation.navigate(ROUTES.MainMessenger);
        } catch (err) {
            Logger.error('Delete chat failed', err);
        }
    };
    return (
        <View style={styles.wrapper}>
            <View style={styles.header}>
                <BackButton goBack={navigation.goBack} />
                <Text style={styles.title}>Tùy chọn</Text>
            </View>
            <TouchableOpacity onPress={onDeleteChat}>
                <View style={styles.container}>
                    <MaterialCommunityIcons
                        name="delete"
                        style={styles.icon}
                        color="red"
                    />
                    <View style={styles.info}>
                        <Text style={styles.name}>Xóa cuộc trò chuyện</Text>
                    </View>
                </View>
                <Divider style={{ margintop: 10, marginLeft: 45 }} />
            </TouchableOpacity>

            <TouchableOpacity>
                <View style={styles.container}>
                    <MaterialCommunityIcons
                        name="block-helper"
                        style={styles.icon}
                    // color="#B1AE57"
                    />
                    <View style={styles.info}>
                        <Text style={styles.name}>Block</Text>
                    </View>
                </View>
                <Divider style={{ margintop: 10, marginLeft: 45 }} />
            </TouchableOpacity>

            <TouchableOpacity>
                <View style={styles.container}>
                    <MaterialCommunityIcons
                        name="alert"
                        style={styles.icon}
                    // color="#B1AE57"
                    />
                    <View style={styles.info}>
                        <Text style={styles.name}>Report</Text>
                    </View>
                </View>
                <Divider style={{ margintop: 10, marginLeft: 45 }} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "white",
    },
    header: {
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: theme.colors.header,
    },
    search: {
        flex: 1,
        justifyContent: "flex-end",
        flexDirection: "row",
    },
    icon: {
        fontSize: 25,
        marginRight: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "black",
        padding: 20,
        alignContent: "center",
    },
    container: {
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop: 8,
    },
    bgAvatar: {
        flex: 2,
    },
    info: {
        flex: 8,
        flexDirection: "column",
        paddingLeft: 5,
        justifyContent: "center",
    },
    name: {
        fontWeight: "bold",
        color: "black",
        fontSize: 16,
        paddingBottom: 3,
    },
});