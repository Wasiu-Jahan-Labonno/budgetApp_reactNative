// src/views/LoginScreen.js
import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { AuthContext } from '../components/AuthContext';

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const onSubmit = async () => {
    setErr('');
    setBusy(true);
    try {
      await login(email.trim(), password);
      navigation.replace('Dashboard'); // Navigate after login
    } catch (e) {
      setErr(
        e?.response?.data?.message ||
          JSON.stringify(e?.response?.data?.errors) ||
          'Login failed'
      );
    } finally {
      setBusy(false);
    }
  };

  const tryDemo = async () => {
    setEmail('df@gmail.com');
    setPassword('123456789');
    await onSubmit();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: '#eef3ff' }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.wrap} keyboardShouldPersistTaps="handled">
          <View style={styles.card}>
            <View style={{ alignItems: 'center', marginBottom: 16 }}>
              <Image
                source={require('../assets/image/logo.png')}
                style={{ width: 100, height: 100, borderRadius: 12 }}
              />
              <Text style={styles.title}>Orthogo</Text>
              <Text style={styles.subtitle}>
                Your intelligent budget tracking companion
              </Text>
            </View>

            <Text style={styles.h1}>Welcome back!</Text>
            <Text style={styles.helper}>Sign in to continue tracking your expenses</Text>

            <Text style={styles.label}>Email Address</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              autoCapitalize="none"
              keyboardType="email-address"
              style={styles.input}
              autoCorrect={false}
              editable={true}
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
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
              <Text style={styles.btnText}>{busy ? 'Signing in...' : '🔒  Sign In'}</Text>
            </TouchableOpacity>

            <View style={styles.orRow}>
              <View style={styles.divider} />
              <Text style={styles.or}>or</Text>
              <View style={styles.divider} />
            </View>

            <TouchableOpacity style={[styles.btn, styles.btnGhost]} onPress={tryDemo}>
              <Text style={[styles.btnText, { color: '#111' }]}>🚀 Try Demo Account</Text>
            </TouchableOpacity>

            <Text style={styles.footerText}>
              Don&apos;t have an account?{' '}
              <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
                Create one
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  wrap: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
  card: { width: '100%', maxWidth: 420, backgroundColor: '#fff', borderRadius: 16, padding: 20, elevation: 6 },
  title: { fontSize: 24, fontWeight: '800' },
  subtitle: { color: '#6b7280', marginTop: 4 },
  h1: { fontSize: 20, fontWeight: '700', marginTop: 8 },
  helper: { color: '#6b7280', marginBottom: 12 },
  label: { marginTop: 12, marginBottom: 6, color: '#111', fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 10, paddingHorizontal: 14, height: 46, backgroundColor: '#f9fafb' },
  btn: { marginTop: 16, backgroundColor: '#1d4ed8', height: 48, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  btnGhost: { backgroundColor: '#e5e7eb' },
  btnText: { color: '#fff', fontWeight: '700' },
  orRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 16 },
  divider: { flex: 1, height: 1, backgroundColor: '#e5e7eb' },
  or: { color: '#6b7280' },
  footerText: { textAlign: 'center', marginTop: 14, color: '#6b7280' },
  link: { color: '#1d4ed8', fontWeight: '700' },
  error: { color: '#b91c1c', marginTop: 8 },
});
