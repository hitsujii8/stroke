import React from "react";
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FadeInView } from "./FadeInView";
import { GOODS_MASTER } from "./config/goods-master";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function Goods({ onNavigate, cartCount }: { onNavigate: (s: string, data?: any) => void, cartCount: number }) {
  return (
    <FadeInView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* ヘッダー */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => onNavigate("membership")} style={styles.iconBtn}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>Goods</Text>
          
          {/* 🌟 右上のカートボタン：押すとカート一覧(cart)へ */}
          <TouchableOpacity onPress={() => onNavigate("cart")} style={styles.iconBtn}>
            {cartCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cartCount}</Text>
              </View>
            )}
            <Ionicons name="cart" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.grid}>
            {GOODS_MASTER.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.card} 
                onPress={() => onNavigate("productDetail", item)}
                activeOpacity={0.8}
              >
                <View style={styles.imageWrapper}>
                  {item.images && item.images.length > 0 ? (
                    <Image source={item.images[0]} style={styles.thumbnail} resizeMode="cover" />
                  ) : (
                    <View style={styles.placeholder}><Ionicons name="image-outline" size={32} color="#d1d5db" /></View>
                  )}
                  {item.tag && (
                    <View style={[styles.tag, item.tag === "LIMITED" ? styles.tagBlack : styles.tagWhite]}>
                      <Text style={[styles.tagText, item.tag === "LIMITED" ? {color: "#fff"} : {color: "#000"}]}>{item.tag}</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.productPrice}>¥{item.price}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={{ height: 160 }} />
        </ScrollView>
      </View>
    </FadeInView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f0f0" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingTop: 60, paddingBottom: 20 },
  headerTitle: { fontSize: 22, fontFamily: "ZenKakuGothicNew_700Bold", color: "#000" },
  iconBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: "#f3f4f6", justifyContent: "center", alignItems: "center" },
  badge: { position: 'absolute', top: -5, right: -5, backgroundColor: '#000', borderRadius: 10, width: 20, height: 20, justifyContent: 'center', alignItems: 'center', zIndex: 10, borderWidth: 2, borderColor: '#fff' },
  badgeText: { color: '#fff', fontSize: 10, fontFamily: 'ZenKakuGothicNew_700Bold' },
  scrollContent: { paddingHorizontal: 20 },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  card: { width: (SCREEN_WIDTH - 54) / 2, marginBottom: 24 },
  imageWrapper: { aspectRatio: 1, backgroundColor: "#f9fafb", borderRadius: 36, overflow: "hidden", borderWidth: 1, borderColor: "#f3f4f6" },
  thumbnail: { width: "100%", height: "100%" },
  placeholder: { flex: 1, justifyContent: "center", alignItems: "center" },
  tag: { position: "absolute", left: 12, bottom: 12, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  tagWhite: { backgroundColor: "#fff" },
  tagBlack: { backgroundColor: "#000", top: 12, right: 12, left: 'auto', bottom: 'auto' },
  tagText: { fontSize: 10, fontFamily: "ZenKakuGothicNew_700Bold" },
  productName: { fontSize: 14, color: "#374151", marginTop: 8, fontFamily: "ZenKakuGothicNew_400Regular" },
  productPrice: { fontSize: 17, fontFamily: "ZenKakuGothicNew_700Bold", marginTop: 2 },
});