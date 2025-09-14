import React, { useContext, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../components/AuthContext';
import API from '../plugins/Axios';

export default function AddExpenseScreen({ navigation }) {
  const { token } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  const handleAddExpense = async () => {
    try {
      await API.post('/expenses', 
        { name, amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigation.navigate('Dashboard');
    } catch (e) {
      console.log("Add expense error:", e.response?.data);
      alert('Failed to add expense!');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Expense Name" value={name} onChangeText={setName} style={styles.input}/>
      <TextInput placeholder="Amount" value={amount} onChangeText={setAmount} keyboardType="numeric" style={styles.input}/>
      <TouchableOpacity onPress={handleAddExpense} style={styles.button}>
        <Text style={styles.btnText}>Add Expense</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,justifyContent:'center',padding:20},
  input:{borderWidth:1,borderColor:'#ccc',padding:10,marginBottom:10,borderRadius:5},
  button:{backgroundColor:'blue',padding:15,alignItems:'center',borderRadius:5},
  btnText:{color:'#fff',fontWeight:'bold'}
});
