import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

export default function SettingsScreen() {
  const [dark, setDark] = React.useState(false);
  return (
    <View style={styles.wrap}>
      <Text style={styles.h1}>Settings</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Dark Mode</Text>
        <Switch value={dark} onValueChange={setDark}/>
      </View>
    </View>
  );
}
const styles=StyleSheet.create({
  wrap:{flex:1,padding:16,backgroundColor:'#fff'},
  h1:{fontSize:20,fontWeight:'800',marginBottom:12},
  row:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingVertical:12},
  label:{fontSize:16}
});
