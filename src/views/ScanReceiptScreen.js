import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function ScanReceiptScreen() {
  return (
    <View style={styles.wrap}>
      <Text style={styles.h1}>Scan Receipt (OCR)</Text>
      <Text style={styles.sub}>Upload or take a photo, parse items & total, then confirm.</Text>
      <TouchableOpacity style={styles.btn}><Text style={styles.btnText}>Choose Image</Text></TouchableOpacity>
    </View>
  );
}
const styles=StyleSheet.create({
  wrap:{flex:1,padding:16,backgroundColor:'#fff'},
  h1:{fontSize:20,fontWeight:'800',marginBottom:6},
  sub:{color:'#6b7280',marginBottom:12},
  btn:{backgroundColor:'#1d4ed8',height:46,borderRadius:10,alignItems:'center',justifyContent:'center'},
  btnText:{color:'#fff',fontWeight:'700'}
});
