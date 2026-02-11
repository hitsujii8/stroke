import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, ScrollView, Platform, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FadeInView } from "./FadeInView";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function ProductDetail({ product, onBack, onAddToCart, onGoToCart, cartCount }: any) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [toastAnim] = useState(new Animated.Value(0));

  const handleAdd = () => {
    onAddToCart(product);
    Animated.sequence([
      Animated.timing(toastAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.delay(1200),
      Animated.timing(toastAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start();
  };

  return (
    <FadeInView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.circleBtn}>
            <Ionicons name="close" size={26} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onGoToCart} style={styles.circleBtn}>
            {cartCount > 0 && <View style={styles.badge}><Text style={styles.badgeText}>{cartCount}</Text></View>}
            <Ionicons name="cart" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* 🌟 Web/Native 両対応カルーセル */}
          <View style={styles.carouselContainer}>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={(e) => {
                const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
                setActiveIndex(index);
              }}
              // 🌟 Webでのスクロール挙動を強制適用
              contentContainerStyle={Platform.OS === 'web' ? {
                display: 'flex',
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
              } : {}}
            >
              {product.images.map((img: any, index: number) => (
                <View key={index} style={{ width: SCREEN_WIDTH, height: SCREEN_WIDTH, scrollSnapAlign: 'start' }}>
                  <Image source={img} style={{ width: '100%', height: '100%' }} />
                </View>
              ))}
            </ScrollView>
            {product.images.length > 1 && (
              <View style={styles.indicatorContainer}>
                {product.images.map((_: any, i: number) => (
                  <View key={i} style={[styles.dot, i === activeIndex && styles.activeDot]} />
                ))}
              </View>
            )}
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.price}>¥{product.price.toLocaleString()}</Text>
            <View style={styles.divider} />
            <Text style={styles.descTitle}>商品詳細 / DETAILS</Text>
            <Text style={styles.descText}>{product.description}</Text>
          </View>
          <View style={{ height: 120 }} />
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.addBtn} onPress={handleAdd} activeOpacity={0.8}>
            <Text style={styles.addBtnText}>カートに追加する</Text>
          </TouchableOpacity>
        </View>

        <Animated.View style={[styles.toast, { opacity: toastAnim, pointerEvents: 'none' }]}>
          <Ionicons name="checkmark-circle" size={18} color="#fff" style={{marginRight: 8}} />
          <Text style={styles.toastText}>カートに追加しました</Text>
        </Animated.View>
      </View>
    </FadeInView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { position: 'absolute', top: Platform.OS === 'ios' ? 50 : 30, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, zIndex: 100 },
  circleBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: "rgba(255,255,255,0.9)", justifyContent: "center", alignItems: "center" },
  badge: { position: 'absolute', top: -5, right: -5, backgroundColor: '#000', borderRadius: 10, width: 20, height: 20, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#fff' },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  carouselContainer: { width: SCREEN_WIDTH, height: SCREEN_WIDTH },
  indicatorContainer: { flexDirection: 'row', position: 'absolute', bottom: 20, width: '100%', justifyContent: 'center' },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(0,0,0,0.2)', marginHorizontal: 4 },
  activeDot: { backgroundColor: '#000', width: 14 },
  infoSection: { padding: 30 },
  name: { fontSize: 26, color: "#000", fontWeight: 'bold' },
  price: { fontSize: 20, color: "#6b7280", marginTop: 4, fontWeight: 'bold' },
  divider: { height: 1, backgroundColor: "#f3f4f6", marginVertical: 24 },
  descTitle: { fontSize: 14, color: "#000", marginBottom: 12, fontWeight: 'bold' },
  descText: { fontSize: 15, lineHeight: 24, color: "#4b5563" },
  footer: { position: 'absolute', bottom: 0, width: '100%', padding: 20, paddingBottom: Platform.OS === "ios" ? 40 : 20, backgroundColor: 'rgba(255,255,255,0.9)' },
  addBtn: { backgroundColor: "#000", height: 64, borderRadius: 32, justifyContent: "center", alignItems: "center" },
  addBtnText: { color: "#fff", fontSize: 18, fontWeight: 'bold' },
  toast: { position: 'absolute', top: 110, alignSelf: 'center', backgroundColor: 'rgba(0,0,0,0.85)', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 30, zIndex: 200 },
  toastText: { color: '#fff', fontSize: 14, fontWeight: 'bold' }
});