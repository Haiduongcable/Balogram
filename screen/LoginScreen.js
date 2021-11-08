
import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from '../components/core/theme'
import Toast from 'react-native-toast-message';
import {
  Background,
  Title,
  TextInput,
  Button,
}
  from '../components'
import axios from 'axios'

export default function LoginScreen({ navigation }) {
  const [phonenumber, setPhonenumber] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const onLoginPressed = () => {
    const data = {
      phonenumber : phonenumber.value,
      password : password.value
    }
    axios.post ('http://localhost:8000/api/v1/users/login',data , {headers:{"Content-Type" : "application/json"}})
      .then (res => {
        console.log(res);
        if (res.statusText == 'OK' ) {
          navigation.reset({
            index: 0,
            routes: [{ name: 'MainScreen' }],
          })
          Toast.show({
            type: 'sucess',
            text1: 'Đăng Nhập thành công'
          });
        }
      })
      .catch (error => {
        Toast.show({
          type: 'error',
          text1: 'Tài khoản hoặc mật khẩu không chính xác'
        });
        console.log(error)
        setPassword({value: '',error : ''})
      })
  }

  return (
    <Background>
      <Title>BaloGram</Title>
      <TextInput
        label="Phone number"
        returnKeyType="next"
        value={phonenumber.value}
        onChangeText={(text) => setPhonenumber({ value: text, error: '' })}
        error={!!phonenumber.error}
        errorText={phonenumber.error}
        autoCapitalize="none"
        autoCompleteType="phonenumber"
        textContentType="phonenumber"
        keyboardType="phonenumber-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgetPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed} style={styles.button}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account?  </Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.link,
  },
  button: {
    backgroundColor: theme.colors.button
  }
})