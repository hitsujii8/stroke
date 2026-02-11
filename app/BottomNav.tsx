import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface BottomNavProps {
  activeScreen: "membership" | "coupons" | "profile" | "goods";
  onNavigate: (target: string) => void;
}

export default function BottomNav({ activeScreen, onNavigate }: BottomNavProps) {
  
  const renderIcon = (type: string, activeIon: any, inactiveIon: any, isActive: boolean) => {
    let source = null;
    if (type === 'home') source = require("./assets/icon_home.png");
    if (type === 'cart') source = require("./assets/icon_cart.png");
    
    if (source) {
      return <Image source={source} style={[styles.icon, !isActive && styles.iconInactive]} />;
    }
    return <Ionicons name={isActive ? activeIon : inactiveIon} size={26} color={isActive ? "#000" : "#9ca3af"} />;
  };

  return (
    <View style={styles.navWrapper}>
      <View style={styles.navContainer}>
        {/* ホーム */}
        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate("membership")}>
          {renderIcon('home', 'home', 'home-outline', activeScreen === "membership")}
        </TouchableOpacity>
        
        {/* ショップ(Goods) */}
        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate("goods")}>
          {renderIcon('cart', 'cart', 'cart-outline', activeScreen === "goods")}
        </TouchableOpacity>
        
        {/* 中央ボタン (Membershipへ) */}
        <View style={styles.centerBtnPlaceholder}>
          <TouchableOpacity style={styles.navCenterBtn} onPress={() => onNavigate("membership")}>
            <Ionicons name="card" size={28} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* クーポン */}
        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate("coupons")}>
          {renderIcon('list', 'list', 'list-outline', activeScreen === "coupons")}
        </TouchableOpacity>
        
        {/* プロフィール */}
        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate("profile")}>
          {renderIcon('person', 'person', 'person-outline', activeScreen === "profile")}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navWrapper: { position: "absolute", bottom: -60, width: "100%", backgroundColor: "#ffffff", borderTopLeftRadius: 40, borderTopRightRadius: 40, paddingBottom: 34 },
  navContainer: { height: 70, flexDirection: "row", justifyContent: "space-around", alignItems: "center" },
  navItem: { flex: 1, alignItems: "center", justifyContent: "center" },
  icon: { width: 26, height: 26, resizeMode: "contain" },
  iconInactive: { opacity: 0.3 },
  centerBtnPlaceholder: { flex: 1, alignItems: "center", justifyContent: "center" },
  navCenterBtn: { position: "absolute", top: -45, width: 64, height: 64, backgroundColor: "#000", borderRadius: 32, justifyContent: "center", alignItems: "center", borderWidth: 6, borderColor: "#ffffff", elevation: 5 },
});