import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FadeInView } from "./FadeInView";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function Cart({ cartItems, onNavigate, onUpdateQuantity, onRemoveItem, onCheckout }: any) {
  const subtotal = cartItems.reduce((acc: number, item: any) => {
    const price = parseInt(item.price.replace(",", ""));
    return acc + price * (item.quantity || 1);
  }, 0);

  const shipping = subtotal > 0 ? 500 : 0;

  return (
    <FadeInView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => onNavigate("goods")} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Cart</Text>
          <View style={{ width: 44 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {cartItems.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="cart-outline" size={80} color="#d1d5db" />
              <Text style={styles.emptyText}>カートは空です</Text>
              <TouchableOpacity style={styles.shopBtn} onPress={() => onNavigate("goods")}>
                <Text style={styles.shopBtnText}>買い物を続ける</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              {cartItems.map((item: any) => (
                <View key={item.id} style={styles.cartItem}>
                  <Image source={item.images[0]} style={styles.itemImage} />
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemPrice}>¥{item.price}</Text>
                    <View style={styles.quantityContainer}>
                      <TouchableOpacity onPress={() => onUpdateQuantity(item.id, -1)} style={styles.qBtn}>
                        <Ionicons name="remove" size={16} color="#000" />
                      </TouchableOpacity>
                      <Text style={styles.qText}>{item.quantity || 1}</Text>
                      <TouchableOpacity onPress={() => onUpdateQuantity(item.id, 1)} style={styles.qBtn}>
                        <Ionicons name="add" size={16} color="#000" />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => onRemoveItem(item.id)} style={styles.removeBtn}>
                        <Ionicons name="trash-outline" size={20} color="#ef4444" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}

              <View style={styles.summaryContainer}>
                <View style={styles.summaryRow}><Text>小計</Text><Text>¥{subtotal.toLocaleString()}</Text></View>
                <View style={styles.summaryRow}><Text>送料</Text><Text>¥{shipping.toLocaleString()}</Text></View>
                <View style={styles.divider} />
                <View style={styles.summaryRow}>
                  <Text style={styles.totalLabel}>合計</Text>
                  <Text style={styles.totalValue}>¥{(subtotal + shipping).toLocaleString()}</Text>
                </View>
              </View>
            </>
          )}
          <View style={{ height: 120 }} />
        </ScrollView>

        {cartItems.length > 0 && (
          <View style={styles.footer}>
            <TouchableOpacity style={styles.checkoutBtn} onPress={onCheckout}>
              <Text style={styles.checkoutBtnText}>注文を確定する</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </FadeInView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f0f0" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingTop: 60, paddingBottom: 20 },
  headerTitle: { fontSize: 24, fontFamily: "ZenKakuGothicNew_700Bold" },
  backBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: "#f3f4f6", justifyContent: "center", alignItems: "center" },
  scrollContent: { paddingHorizontal: 20 },
  emptyContainer: { alignItems: "center", marginTop: 100 },
  emptyText: { fontSize: 16, color: "#9ca3af", marginTop: 20 },
  shopBtn: { marginTop: 30, paddingHorizontal: 40, paddingVertical: 15, backgroundColor: "#000", borderRadius: 30 },
  shopBtnText: { color: "#fff", fontFamily: "ZenKakuGothicNew_700Bold" },
  cartItem: { flexDirection: "row", marginBottom: 20, backgroundColor: "#f9fafb", borderRadius: 24, padding: 15 },
  itemImage: { width: 80, height: 80, borderRadius: 16 },
  itemInfo: { flex: 1, marginLeft: 15, justifyContent: "center" },
  itemName: { fontSize: 16, fontFamily: "ZenKakuGothicNew_700Bold" },
  itemPrice: { fontSize: 14, color: "#6b7280" },
  quantityContainer: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  qBtn: { width: 30, height: 30, borderRadius: 15, backgroundColor: "#fff", justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "#e5e7eb" },
  qText: { marginHorizontal: 15, fontSize: 14, fontFamily: "ZenKakuGothicNew_700Bold" },
  removeBtn: { marginLeft: 'auto', padding: 5 },
  summaryContainer: { marginTop: 20, padding: 20, backgroundColor: "#f3f4f6", borderRadius: 24 },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  divider: { height: 1, backgroundColor: "#e5e7eb", marginVertical: 12 },
  totalLabel: { fontSize: 18, fontFamily: "ZenKakuGothicNew_700Bold" },
  totalValue: { fontSize: 22, fontFamily: "ZenKakuGothicNew_700Bold" },
  footer: { position: "absolute", bottom: 0, width: SCREEN_WIDTH, padding: 20, paddingBottom: Platform.OS === 'ios' ? 40 : 20, backgroundColor: "#fff" },
  checkoutBtn: { backgroundColor: "#000", height: 64, borderRadius: 32, justifyContent: "center", alignItems: "center" },
  checkoutBtnText: { color: "#fff", fontSize: 18, fontFamily: "ZenKakuGothicNew_700Bold" },
});