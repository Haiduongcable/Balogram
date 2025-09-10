import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import {
  BackButton,
  ItemComment
} from "../components";
import { theme } from "../components/core/theme";
import { comment } from "../handle_api";

export default function CommentScreen({ route, navigation }) {
  const { postId: postID, userID } = route.params;
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [content, setContent] = useState("");
  const token = useSelector(state => state.authReducer.token);

  const loadComments = useCallback(async () => {
    try {
      setLoading(true);
      const response = await comment.listComment(token, postID);
      setComments(response.data.data || []);
    } catch (error) {
      console.error('Error loading comments:', error);
      Toast.show({
        type: 'error',
        text1: 'Không thể tải bình luận'
      });
    } finally {
      setLoading(false);
    }
  }, [token, postID]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  const onSend = async () => {
    if (!content.trim()) return;

    const commentData = {
      token,
      content: content.trim(),
      userID,
      postID
    };

    try {
      setSending(true);
      await comment.createComment(commentData);
      setContent("");
      await loadComments();
      Toast.show({
        type: 'success',
        text1: 'Đã thêm bình luận'
      });
    } catch (error) {
      console.error('Error creating comment:', error);
      Toast.show({
        type: 'error',
        text1: 'Không thể thêm bình luận'
      });
    } finally {
      setSending(false);
    }
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyTitle}>Chưa có bình luận</Text>
      <Text style={styles.emptySubtitle}>Hãy là người đầu tiên bình luận</Text>
    </View>
  );

  const renderComment = ({ item }) => <ItemComment item={item} />;

  return (
    <KeyboardAvoidingView 
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Toast />
      <View style={styles.header}>
        <BackButton goBack={navigation.goBack} />
        <Text style={styles.title}>Bình luận</Text>
      </View>
      
      <View style={styles.body}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
          </View>
        ) : (
          <FlatList
            data={comments}
            renderItem={renderComment}
            keyExtractor={(item) => item._id}
            ListEmptyComponent={renderEmptyState}
            refreshing={loading}
            onRefresh={loadComments}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
      
      <View style={styles.inputForm}>
        <TextInput
          style={styles.input}
          placeholder="Viết bình luận..."
          value={content}
          onChangeText={setContent}
          multiline
          maxLength={500}
          editable={!sending}
        />
        <TouchableOpacity 
          onPress={onSend}
          disabled={!content.trim() || sending}
          style={[styles.sendButton, (!content.trim() || sending) && styles.sendButtonDisabled]}
        >
          {sending ? (
            <ActivityIndicator size="small" color={theme.colors.primary} />
          ) : (
            <MaterialCommunityIcons 
              name="send" 
              size={24} 
              color={content.trim() ? theme.colors.primary : '#ccc'} 
            />
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text || '#000',
    marginLeft: 16,
  },
  body: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  inputForm: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
    maxHeight: 100,
    marginRight: 8,
    backgroundColor: '#f8f8f8',
  },
  sendButton: {
    padding: 8,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});
