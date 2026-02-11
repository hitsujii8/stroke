import React, { useState, useRef } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions, 
  Animated, 
  Modal, 
  Pressable 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomNav from "./BottomNav";
import { FadeInView } from "./FadeInView";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const COUPON_DATA = [
  {
    id: "1",
    title: "ウェルカム特典",
    description: "お好きなドリンクが1杯 20%OFF",
    longDescription: "新規会員登録いただいた方限定の特典です。すべてのドリンクメニューにご利用いただけます。他の割引券との併用はできません。",
    expiry: "2026.03.31 まで",
    color: "#FF4B8B",
    icon: "cafe-outline"
  },
  {
    id: "2",
    title: "雨の日クーポン",
    description: "雨の日限定！全品ポイント2倍還元",
    longDescription: "外はあいにくの雨ですが、心は晴れやかに。本日ご来店いただいたすべてのお客様に、お買い物ポイントを通常の2倍付与いたします。",
    expiry: "本日中のみ有効",
    color: "#00A3E1",
    icon: "rainy-outline"
  },
  {
    id: "3",
    title: "グッズ割引",
    description: "お好きなグッズ200円引き",
    longDescription: "100pt記念クーポン！選んだグッズ１点200円引き。",
    expiry: "2026.02.28 まで",
    color: "#FF9F2E",
    icon: "bag-outline"
  },
  {
    id: "4",
    title: "モーニング特典",
    description: "AM 11:00まで ドリンクサイズ変更",
    longDescription: "朝の時間帯にご来店いただいたお客様へ、無料でサイズアップいたします。一日の始まりにどうぞ。",
    expiry: "2026.03.15 まで",
    color: "#FACC15",
    icon: "sunny-outline"
  },
  {
    id: "5",
    title: "マイボトル割引",
    description: "タンブラー持参で 50円引き",
    longDescription: "環境にやさしいマイタンブラーやボトルをお持ち込みいただくと、お会計から50円割引いたします。地球に少しだけいいことを。",
    expiry: "常時開催中",
    color: "#4ADE80",
    icon: "leaf-outline"
  },
  {
    id: "6",
    title: "バースデークーポン",
    description: "お好きなデザート 1品プレゼント",
    longDescription: "お誕生日おめでとうございます！特別な日のお祝いに、当店自慢のデザートからお好きなものを1点プレゼントいたします。",
    expiry: "誕生月末日まで有効",
    color: "#A855F7",
    icon: "gift-outline"
  }
];

export default function Coupons({ onNavigate }: { onNavigate: (s: string) => void }) {
  const [selectedCoupon, setSelectedCoupon] = useState<typeof COUPON_DATA[0] | null>(null);
  const scaleAnim = useRef(new Animated.Value(0)).current;

  const openDetail = (coupon: typeof COUPON_DATA[0]) => {
    setSelectedCoupon(coupon);
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 50,
      friction: 7
    }).start();
  };

  const closeDetail = () => {
    Animated.timing(scaleAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true
    }).start(() => setSelectedCoupon(null));
  };

  return (
    <FadeInView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Coupons</Text>
            <Text style={styles.headerSub}>お得な特典をご利用いただけます</Text>
          </View>

          {COUPON_DATA.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.couponCard} 
              onPress={() => openDetail(item)}
              activeOpacity={0.8}
            >
              <View style={[styles.couponLeft, { backgroundColor: item.color }]}>
                <Ionicons name={item.icon as any} size={32} color="#fff" />
              </View>
              
              <View style={styles.couponRight}>
                <View>
                  <Text style={styles.couponTitle}>{item.title}</Text>
                  <Text style={styles.couponDesc}>{item.description}</Text>
                </View>
                <Text style={styles.expiryText}>{item.expiry}</Text>
              </View>
              
              <View style={styles.circleTop} />
              <View style={styles.circleBottom} />
            </TouchableOpacity>
          ))}
          
          <View style={{ height: 100 }} />
        </ScrollView>

        {/* 詳細モーダル */}
        <Modal transparent visible={!!selectedCoupon} animationType="none">
          <Pressable style={styles.modalOverlay} onPress={closeDetail}>
            {selectedCoupon && (
              <Animated.View 
                style={[
                  styles.detailCard, 
                  { transform: [{ scale: scaleAnim }] }
                ]}
              >
                <View style={[styles.detailHeader, { backgroundColor: selectedCoupon.color }]}>
                  <Ionicons name={selectedCoupon.icon as any} size={48} color="#fff" />
                  <Text style={styles.detailTitle}>{selectedCoupon.title}</Text>
                </View>

                <View style={styles.detailBody}>
                  <Text style={styles.detailDescLabel}>クーポン内容</Text>
                  <Text style={styles.detailMainDesc}>{selectedCoupon.description}</Text>
                  <Text style={styles.detailLongDesc}>{selectedCoupon.longDescription}</Text>
                  
                  <View style={styles.detailDivider} />
                  
                  <Text style={styles.detailExpiry}>有効期限: {selectedCoupon.expiry}</Text>
                  
                  <View style={styles.mockBarcode}>
                    <View style={styles.barcodeLine} />
                    <Text style={styles.barcodeText}>CODE: {selectedCoupon.id}09283746</Text>
                  </View>

                  <TouchableOpacity style={styles.closeBtn} onPress={closeDetail}>
                    <Text style={styles.closeBtnText}>閉じる</Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            )}
          </Pressable>
        </Modal>

      </View>
    </FadeInView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f0f0" },
  scrollContent: { paddingTop: 60, paddingHorizontal: 20 },
  header: { marginBottom: 30 },
  headerTitle: { 
    fontSize: 32, 
    fontFamily: "ZenKakuGothicNew_700Bold", 
    color: "#1f2937",
    letterSpacing: -0.5
  },
  headerSub: { 
    fontSize: 14, 
    fontFamily: "ZenKakuGothicNew_400Regular", 
    color: "#6b7280",
    marginTop: 4
  },
  couponCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    height: 110,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    position: "relative"
  },
  couponLeft: { width: 80, justifyContent: "center", alignItems: "center" },
  couponRight: { flex: 1, padding: 16, justifyContent: "space-between" },
  couponTitle: { fontSize: 18, fontFamily: "ZenKakuGothicNew_700Bold", color: "#1f2937" },
  couponDesc: { fontSize: 13, fontFamily: "ZenKakuGothicNew_400Regular", color: "#4b5563", marginTop: 2 },
  expiryText: { fontSize: 11, fontFamily: "ZenKakuGothicNew_400Regular", color: "#9ca3af" },
  circleTop: { position: "absolute", left: 70, top: -10, width: 20, height: 20, borderRadius: 10, backgroundColor: "#f0f0f0" },
  circleBottom: { position: "absolute", left: 70, bottom: -10, width: 20, height: 20, borderRadius: 10, backgroundColor: "#f0f0f0" },

  // モーダルスタイル
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "center", alignItems: "center", padding: 20 },
  detailCard: { width: "100%", backgroundColor: "#fff", borderRadius: 32, overflow: "hidden" },
  detailHeader: { height: 160, justifyContent: "center", alignItems: "center", gap: 12 },
  detailTitle: { color: "#fff", fontSize: 24, fontFamily: "ZenKakuGothicNew_700Bold" },
  detailBody: { padding: 24 },
  detailDescLabel: { fontSize: 12, color: "#9ca3af", fontFamily: "ZenKakuGothicNew_400Regular", marginBottom: 4 },
  detailMainDesc: { fontSize: 20, fontFamily: "ZenKakuGothicNew_700Bold", color: "#1f2937", marginBottom: 12 },
  detailLongDesc: { fontSize: 14, fontFamily: "ZenKakuGothicNew_400Regular", color: "#6b7280", lineHeight: 22 },
  detailDivider: { height: 1, backgroundColor: "#f3f4f6", marginVertical: 20 },
  detailExpiry: { fontSize: 13, fontFamily: "ZenKakuGothicNew_700Bold", color: "#ef4444", textAlign: "center" },
  mockBarcode: { marginTop: 20, alignItems: "center", backgroundColor: "#f9fafb", padding: 16, borderRadius: 16 },
  barcodeLine: { width: "100%", height: 40, backgroundColor: "#374151", borderRadius: 4 },
  barcodeText: { marginTop: 8, fontSize: 12, letterSpacing: 2, color: "#9ca3af" },
  closeBtn: { marginTop: 24, backgroundColor: "#1f2937", paddingVertical: 14, borderRadius: 16, alignItems: "center" },
  closeBtnText: { color: "#fff", fontSize: 16, fontFamily: "ZenKakuGothicNew_700Bold" }
});