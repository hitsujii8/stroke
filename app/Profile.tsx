import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, StatusBar, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomNav from "./BottomNav";
import { FadeInView } from "./FadeInView";

export default function Profile({ userName, onNavigate, onLogout }: any) {
  
  const handleItemPress = (title: string) => {
    Alert.alert("Coming Soon", `${title}機能は現在準備中です。`);
  };

  return (
    <FadeInView style={{ flex: 1 }}>
      <View style={styles.screenContainer}>
        <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Page</Text>
          <TouchableOpacity><Ionicons name="settings-outline" size={24} /></TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.profileSection}>
            <View style={styles.avatarWrapper}>
              <View style={styles.avatar}><Ionicons name="person" size={50} color="#D1D5DB" /></View>
              <TouchableOpacity style={styles.editBadge}><Ionicons name="pencil" size={14} color="#FFF" /></TouchableOpacity>
            </View>
            <Text style={styles.userNameText}>{userName}</Text>
            <Text style={styles.membershipBadge}>PREMIUM MEMBER</Text>
          </View>

          <View style={styles.menuCard}>
            {[
              { id: "edit", title: "会員情報の編集", icon: "person-outline", color: "#EFF6FF" },
              { id: "noti", title: "通知設定", icon: "notifications-outline", color: "#F5F3FF" },
              { id: "policy", title: "プライバシーポリシー", icon: "shield-checkmark-outline", color: "#ECFDF5" },
              { id: "help", title: "ヘルプ・お問い合わせ", icon: "help-circle-outline", color: "#FFF7ED" },
            ].map((item) => (
              <TouchableOpacity key={item.id} style={styles.menuItem} onPress={() => handleItemPress(item.title)}>
                <View style={styles.menuLeft}>
                  <View style={[styles.iconBg, { backgroundColor: item.color }]}><Ionicons name={item.icon as any} size={20} color="#666" /></View>
                  <Text style={styles.menuText}>{item.title}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.logoutBtn} onPress={onLogout}>
            <Ionicons name="log-out-outline" size={20} color="#E11D48" />
            <Text style={styles.logoutText}>ログアウト</Text>
          </TouchableOpacity>
          <View style={{ height: 120 }} />
        </ScrollView>
      </View>
    </FadeInView>
  );
}

const styles = StyleSheet.create({
  screenContainer: { flex: 1, backgroundColor: "#f0f0f0" },
  header: { paddingTop: 60, paddingHorizontal: 24, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  headerTitle: { fontSize: 18, fontWeight: "600" },
  scrollContent: { paddingHorizontal: 24 },
  profileSection: { alignItems: "center", marginTop: 32 },
  avatarWrapper: { position: "relative" },
  avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: "#FFF", justifyContent: "center", alignItems: "center", elevation: 5 },
  editBadge: { position: "absolute", bottom: 0, right: 0, width: 30, height: 30, borderRadius: 15, backgroundColor: "#000", justifyContent: "center", alignItems: "center", borderWidth: 2, borderColor: "#FFF" },
  userNameText: { fontSize: 22, fontWeight: "700", marginTop: 16 },
  membershipBadge: { fontSize: 10, fontWeight: "700", color: "#9CA3AF", marginTop: 4, letterSpacing: 2 },
  menuCard: { backgroundColor: "rgba(255, 255, 255, 0.6)", borderRadius: 32, marginTop: 40, overflow: 'hidden' },
  menuItem: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 20 },
  menuLeft: { flexDirection: "row", alignItems: "center", gap: 16 },
  iconBg: { width: 36, height: 36, borderRadius: 10, justifyContent: "center", alignItems: "center" },
  menuText: { fontSize: 15, fontWeight: "600" },
  logoutBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 32, padding: 20, borderRadius: 24, backgroundColor: "rgba(255,255,255,0.4)" },
  logoutText: { color: "#E11D48", fontWeight: "700" },
});