import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import { AuthContext } from '../components/AuthContext';
import { LineChart, PieChart } from 'react-native-chart-kit';
import axios from 'axios';

export default function HomeScreen() {
  const { user, logout, token } = useContext(AuthContext);

  const [stats, setStats] = useState([]);
  const [activities, setActivities] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [lineData, setLineData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);

  const width = Dimensions.get('window').width - 40;

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:8000/api/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Assuming API returns { stats, activities, pieData, lineData }
      setStats(res.data.stats || []);
      setActivities(res.data.activities || []);
      setPieData(res.data.pieData || []);
      setLineData(res.data.lineData || { labels: [], datasets: [] });
    } catch (error) {
      console.log('Dashboard fetch error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#1d4ed8" />
      </View>
    );
  }

  return (
    <FlatList
      style={styles.wrap}
      contentContainerStyle={styles.content}
      data={activities}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.activityItem}>
          <Text style={styles.activityTitle}>{item.title}</Text>
          <Text style={item.amount.startsWith('+') ? styles.plus : styles.minus}>{item.amount}</Text>
        </View>
      )}
      ListHeaderComponent={
        <>
          {/* Header */}
          <Text style={styles.h1}>Welcome, {user?.name || 'User'} 👋</Text>
          <Text style={styles.sub}>Here’s your financial overview.</Text>

          {/* Stats */}
          <View style={styles.statsRow}>
            {stats.map((s) => (
              <View key={s.id} style={styles.card}>
                <Text style={styles.cardLabel}>{s.label}</Text>
                <Text style={styles.cardValue}>{s.value}</Text>
              </View>
            ))}
          </View>

          {/* Line Chart */}
          {lineData.datasets && lineData.datasets.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Monthly Spending</Text>
              <LineChart
                data={lineData}
                width={width}
                height={200}
                yAxisLabel="$"
                chartConfig={{
                  backgroundColor: '#fff',
                  backgroundGradientFrom: '#fff',
                  backgroundGradientTo: '#fff',
                  color: (opacity = 1) => `rgba(59,130,246,${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
                }}
                bezier
                style={styles.chart}
              />
            </>
          )}

          {/* Pie Chart */}
          {pieData.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Expense Breakdown</Text>
              <PieChart
                data={pieData}
                width={width}
                height={220}
                chartConfig={{ color: (opacity = 1) => `rgba(0,0,0,${opacity})` }}
                accessor="amount"
                backgroundColor="transparent"
                paddingLeft="15"
              />
            </>
          )}

          {/* Recent Activity title */}
          <Text style={styles.sectionTitle}>Recent Activity</Text>
        </>
      }
      ListFooterComponent={
        <TouchableOpacity style={styles.btn} onPress={logout}>
          <Text style={styles.btnText}>Logout</Text>
        </TouchableOpacity>
      }
    />
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: '#f9fafb' },
  content: { padding: 20, paddingBottom: 40 },

  h1: { fontSize: 22, fontWeight: '800' },
  sub: { color: '#6b7280', marginTop: 4, marginBottom: 20 },

  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  card: { flex: 1, backgroundColor: '#fff', marginHorizontal: 4, padding: 16, borderRadius: 12, elevation: 2 },
  cardLabel: { color: '#6b7280', fontSize: 13 },
  cardValue: { fontSize: 18, fontWeight: '700', marginTop: 6 },

  sectionTitle: { fontSize: 18, fontWeight: '700', marginVertical: 12 },
  chart: { borderRadius: 12, marginBottom: 20 },

  activityItem: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff', padding: 14, borderRadius: 10, marginBottom: 8, elevation: 1 },
  activityTitle: { fontSize: 15, fontWeight: '500' },
  plus: { color: '#16a34a', fontWeight: '700' },
  minus: { color: '#dc2626', fontWeight: '700' },

  btn: { backgroundColor: '#ef4444', height: 46, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 16 },
  btnText: { color: '#fff', fontWeight: '700' },
});
