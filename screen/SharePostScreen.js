import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    TextInput,
    Alert,
    ActivityIndicator,
    Dimensions
} from 'react-native';
import { useSelector } from 'react-redux';
import { BackButton } from '../components';
import { theme } from '../components/core/theme';
import { post } from '../handle_api';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

const { width } = Dimensions.get('window');

const SharePostScreen = ({ route, navigation }) => {
    const token = useSelector(state => state.authReducer.token);
    const { postData } = route.params; // Post data to be shared
    
    const [friends, setFriends] = useState([]);
    const [selectedFriends, setSelectedFriends] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingFriends, setLoadingFriends] = useState(true);

    useEffect(() => {
        loadFriends();
    }, []);

    const loadFriends = async () => {
        try {
            setLoadingFriends(true);
            const friendsData = await post.getFriendsList(token);
            setFriends(friendsData.data || []);
        } catch (error) {
            console.error('Error loading friends:', error);
            Alert.alert('Error', 'Failed to load friends list');
        } finally {
            setLoadingFriends(false);
        }
    };

    const toggleFriendSelection = (friendId) => {
        setSelectedFriends(prev => {
            if (prev.includes(friendId)) {
                return prev.filter(id => id !== friendId);
            } else {
                return [...prev, friendId];
            }
        });
    };

    const handleSharePost = async () => {
        if (selectedFriends.length === 0) {
            Alert.alert('Warning', 'Please select at least one friend to share with');
            return;
        }

        try {
            setLoading(true);
            const shareData = {
                token,
                postId: postData._id,
                friendIds: selectedFriends,
                message: message.trim()
            };

            const result = await post.sharePost(shareData);
            
            if (result.success) {
                Alert.alert(
                    'Success', 
                    `Post shared with ${selectedFriends.length} friend(s)`,
                    [
                        {
                            text: 'OK',
                            onPress: () => navigation.goBack()
                        }
                    ]
                );
            } else {
                Alert.alert('Error', result.message || 'Failed to share post');
            }
        } catch (error) {
            console.error('Error sharing post:', error);
            Alert.alert('Error', 'Failed to share post');
        } finally {
            setLoading(false);
        }
    };

    const renderFriendItem = ({ item }) => {
        const isSelected = selectedFriends.includes(item._id);
        
        return (
            <TouchableOpacity
                style={[styles.friendItem, isSelected && styles.selectedFriend]}
                onPress={() => toggleFriendSelection(item._id)}
            >
                <View style={styles.friendInfo}>
                    <Text style={styles.friendName}>{item.username || item.phonenumber}</Text>
                    {item.phonenumber && (
                        <Text style={styles.friendPhone}>{item.phonenumber}</Text>
                    )}
                </View>
                <MaterialCommunityIcons
                    name={isSelected ? "checkbox-marked" : "checkbox-blank-outline"}
                    size={24}
                    color={isSelected ? theme.colors.primary : "#ccc"}
                />
            </TouchableOpacity>
        );
    };

    if (loadingFriends) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
                <Text style={styles.loadingText}>Loading friends...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <BackButton goBack={navigation.goBack} />
                <Text style={styles.title}>Share Post</Text>
            </View>

            <View style={styles.postPreview}>
                <Text style={styles.previewTitle}>Post Preview:</Text>
                <Text style={styles.postContent} numberOfLines={3}>
                    {postData.described || 'No description'}
                </Text>
            </View>

            <View style={styles.messageSection}>
                <Text style={styles.sectionTitle}>Add a message (optional):</Text>
                <TextInput
                    style={styles.messageInput}
                    placeholder="Write a message to your friends..."
                    value={message}
                    onChangeText={setMessage}
                    multiline
                    maxLength={200}
                />
            </View>

            <View style={styles.friendsSection}>
                <Text style={styles.sectionTitle}>
                    Select friends to share with ({selectedFriends.length} selected):
                </Text>
                <FlatList
                    data={friends}
                    renderItem={renderFriendItem}
                    keyExtractor={(item) => item._id}
                    showsVerticalScrollIndicator={false}
                    style={styles.friendsList}
                />
            </View>

            <TouchableOpacity
                style={[
                    styles.shareButton,
                    (loading || selectedFriends.length === 0) && styles.shareButtonDisabled
                ]}
                onPress={handleSharePost}
                disabled={loading || selectedFriends.length === 0}
            >
                {loading ? (
                    <ActivityIndicator color="white" size="small" />
                ) : (
                    <Text style={styles.shareButtonText}>
                        Share with {selectedFriends.length} friend(s)
                    </Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.header,
        paddingVertical: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginLeft: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
    },
    postPreview: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    previewTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    postContent: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    messageSection: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    messageInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 14,
        minHeight: 80,
        textAlignVertical: 'top',
    },
    friendsSection: {
        flex: 1,
        padding: 15,
    },
    friendsList: {
        flex: 1,
    },
    friendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    selectedFriend: {
        backgroundColor: '#f8f9fa',
    },
    friendInfo: {
        flex: 1,
    },
    friendName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginBottom: 2,
    },
    friendPhone: {
        fontSize: 14,
        color: '#666',
    },
    shareButton: {
        backgroundColor: theme.colors.primary || '#007AFF',
        margin: 15,
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    shareButtonDisabled: {
        backgroundColor: '#ccc',
    },
    shareButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default SharePostScreen;
