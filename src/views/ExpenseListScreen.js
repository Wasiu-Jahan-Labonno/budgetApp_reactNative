import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const data = [
  { id:'1', title:'Groceries',  amount:45, date:'2025-08-17', cat:'Food' },
  { id:'2', title:'Electricity',amount:120,date:'2025-08-16', cat:'Bills' },
];

export default function ExpenseListScreen() {
  return (
    <View style={styles.wrap}>
      <Text style={styles.h1}>All Expenses</Text>
      <FlatList
        data={data}
        keyExtractor={(i)=>i.id}
        renderItem={({item})=>(
          <View style={styles.row}>
            <View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.meta}>{item.date} · {item.cat}</Text>
            </View>
            <Text style={styles.amount}>-${item.amount}</Text>
          </View>
        )}
      />
    </View>
  );
}
const styles=StyleSheet.create({
  wrap:{flex:1,padding:16,backgroundColor:'#fff'},
  h1:{fontSize:20,fontWeight:'800',marginBottom:12},
  row:{flexDirection:'row',justifyContent:'space-between',backgroundColor:'#f9fafb',padding:12,borderRadius:10,marginBottom:8},
  title:{fontWeight:'700'},
  meta:{color:'#6b7280'},
  amount:{fontWeight:'800',color:'#dc2626'}
});
