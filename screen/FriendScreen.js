import React, { Component } from "react";
import { View, FlatList, Text, StyleSheet, Dimensions } from "react-native";
import { data } from "../log_data/data.js";
import {
    FriendActive,
    LinePartition
} from "../components";
import { theme } from "../components/core/theme";
import { MaterialCommunityIcons, Ionicons } from "react-native-vector-icons";
const { width } = Dimensions.get("window");

export default function FriendScreen({ navigation }) {
    const onSearchPress = () => {
        navigation.navigate("SearchScreen")
    }
    return (
        <View style={styles.wrapper}>
            {/* <View style={styles.header}>
                <Text style={styles.title}>List Friend</Text>
                <View style={styles.addFriend}>
                    <MaterialCommunityIcons
                        name="account-plus-outline"
                        style={styles.icon}
                        onPress={() => navigation.navigate('AddFriendScreen')}
                    />
                </View>
            </View> */}
            <View style={styles.headerBar}>
                <View style={styles.headerLeft}>
                    <Text style={styles.title}>BaloGram</Text>
                </View>
                <View style={styles.headerRight}>
                    <Ionicons name="md-search-outline" style={styles.icon} onPress={onSearchPress} />
                    <Ionicons name="person-add-outline" style={styles.icon} onPress={() => navigation.navigate('AddFriendScreen')} />
                </View>
            </View>
            <LinePartition color={theme.colors.silver} />
            <FlatList
                data={data}
                renderItem={({ item }) => <FriendActive item={item} />}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    headerBar: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.white,
    },

    headerLeft: {
        flex: 1,
    },
    headerRight: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row',
    },
    wrapper: {
        flex: 1,
        backgroundColor: "white",
    },
    header: {
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: theme.colors.header,
    },
    addFriend: {
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
        color: theme.colors.logo,
        padding: 20,
    },
});
