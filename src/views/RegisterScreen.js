// src/views/RegisterScreen.js
import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { AuthContext } from '../components/AuthContext';

export default function RegisterScreen({ navigation }) {
  const { register } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const onSubmit = async () => {
    setErr('');
    setBusy(true);
    try {
      await register(name.trim(), email.trim(), password);
      navigation.replace('Dashboard'); // Navigate to Dashboard after register
    } catch (e) {
      console.log('Register error:', e.response?.data || e.message);
      setErr(
        e?.response?.data?.message ||
          JSON.stringify(e?.response?.data?.errors) ||
          'Registration failed'
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: '#eef3ff' }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.wrap}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.card}>
            <Text style={styles.h1}>Create your account</Text>
            <Text style={styles.helper}>
              Join Orthogo and start tracking smarter
            </Text>

            <Text style={styles.label}>Full Name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              style={styles.input}
              keyboardType="default"
              autoCapitalize="words"
              editable={true}
            />

            <Text style={styles.label}>Email Address</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              editable={true}
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Create a password"
              secureTextEntry
              style={styles.input}
              autoCapitalize="none"
              editable={true}
            />

            {!!err && <Text style={styles.error}>{err}</Text>}

            <TouchableOpacity
              style={[styles.btn, busy && { opacity: 0.7 }]}
              onPress={onSubmit}
              disabled={busy}
            >
              <Text style={styles.btnText}>
                {busy ? 'Creating...' : 'Create Account'}
              </Text>
            </TouchableOpacity>

            <Text style={styles.footerText}>
              Already have an account?{' '}
              <Text
                style={styles.link}
                onPress={() => navigation.navigate('Login')}
              >
                Sign in
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 6,
  },
  h1: { fontSize: 20, fontWeight: '800' },
  helper: { color: '#6b7280', marginBottom: 12 },
  label: { marginTop: 12, marginBottom: 6, color: '#111', fontWeight: '600' },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 10,
    paddingHorizontal: 14,
    height: 46,
    backgroundColor: '#f9fafb',
  },
  btn: {
    marginTop: 16,
    backgroundColor: '#1d4ed8',
    height: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: { color: '#fff', fontWeight: '700' },
  footerText: { textAlign: 'center', marginTop: 14, color: '#6b7280' },
  link: { color: '#1d4ed8', fontWeight: '700' },
  error: { color: '#b91c1c', marginTop: 8 },
});
