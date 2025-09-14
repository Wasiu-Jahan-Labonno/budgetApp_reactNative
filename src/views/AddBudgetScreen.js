// src/views/AddBudgetScreen.js
import React, { useState, useContext, useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView, Platform 
} from 'react-native';
import { AuthContext } from '../components/AuthContext';
import axios from 'axios';

export default function AddBudgetScreen({ navigation }) {
  const { token } = useContext(AuthContext);
  const [amount, setAmount] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  // Fetch current budget when screen loads
  useEffect(() => {
    fetchBudget();
  }, []);

  const fetchBudget = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/budget', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAmount(res.data.budget.toString());
    } catch (e) {
      console.log('Fetch budget error:', e.message);
    }
  };

  const onSubmit = async () => {
    if (!amount || isNaN(amount)) {
      setErr('Please enter a valid number');
      return;
    }
    setErr('');
    setBusy(true);
    try {
      await axios.post(
        'http://localhost:8000/api/budget',
        { amount: parseFloat(amount) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigation.goBack(); // go back to Dashboard
    } catch (e) {
      console.log('Add budget error:', e.response?.data || e.message);
      setErr('Failed to set budget');
    } finally {
      setBusy(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#eef3ff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.wrap} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <Text style={styles.h1}>Set Your Monthly Budget</Text>
          <Text style={styles.helper}>Enter the total amount you plan to spend this month</Text>

          <Text style={styles.label}>Budget Amount</Text>
          <TextInput
            value={amount}
            onChangeText={setAmount}
            placeholder="Enter amount"
            keyboardType="numeric"
            style={styles.input}
          />

          {!!err && <Text style={styles.error}>{err}</Text>}

          <TouchableOpacity
            style={[styles.btn, busy && { opacity: 0.7 }]}
            onPress={onSubmit}
            disabled={busy}
          >
            <Text style={styles.btnText}>{busy ? 'Saving...' : 'Save Budget'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrap: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
  card: { width: '100%', maxWidth: 420, backgroundColor: '#fff', borderRadius: 16, padding: 20, elevation: 6 },
  h1: { fontSize: 20, fontWeight: '800', marginBottom: 8 },
  helper: { color: '#6b7280', marginBottom: 12 },
  label: { marginTop: 12, marginBottom: 6, color: '#111', fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 10, paddingHorizontal: 14, height: 46, backgroundColor: '#f9fafb' },
  btn: { marginTop: 16, backgroundColor: '#1d4ed8', height: 48, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  btnText: { color: '#fff', fontWeight: '700' },
  error: { color: '#b91c1c', marginTop: 8 },
});
