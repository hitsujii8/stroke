import React, { useEffect, useRef, useState, memo } from "react";
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  StatusBar, 
  Animated, 
  ImageBackground,
  Dimensions,
  Pressable,
  Image
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomNav from "./BottomNav";
import { FadeInView } from "./FadeInView";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_BG_SOURCE = require("./assets/card_bg.png");

const NUMBER_IMAGES: { [key: string]: any } = {
  '0': require("./assets/font/number-0.png"), '1': require("./assets/font/number-1.png"),
  '2': require("./assets/font/number-2.png"), '3': require("./assets/font/number-3.png"),
  '4': require("./assets/font/number-4.png"), '5': require("./assets/font/number-5.png"),
  '6': require("./assets/font/number-6.png"), '7': require("./assets/font/number-7.png"),
  '8': require("./assets/font/number-8.png"), '9': require("./assets/font/number-9.png"),
  'pt': require("./assets/font/number-pt.png"),
};

const PointImageDisplay = ({ points }: { points: number }) => {
  const digits = points.toString().split(""); 
  return (
    <View style={styles.pointsImageRow}>
      {digits.map((digit, index) => (
        <Image key={index} source={NUMBER_IMAGES[digit]} style={styles.digitImage} resizeMode="contain" />
      ))}
      <Image source={NUMBER_IMAGES['pt']} style={styles.ptImage} resizeMode="contain" />
    </View>
  );
};

const BarcodeVisual = memo(({ dark = true }: { dark?: boolean }) => {
  const bars = Array.from({ length: 45 }, (_, i) => ({ width: i % 3 === 0 ? 3.5 : i % 5 === 0 ? 2 : 1.2 }));
  return (
    <View style={styles.barcodeContainer}>
      {bars.map((bar, i) => <View key={i} style={[styles.barcodeBar, { width: bar.width, backgroundColor: dark ? "#000" : "#fff" }]} />)}
    </View>
  );
});

export default function Membership({ 
  userName, onNavigate, autoZoom, onZoomProcessed 
}: { 
  userName: string, onNavigate: (s: string) => void, autoZoom?: boolean, onZoomProcessed?: () => void 
}) {
  const [isZoomed, setIsZoomed] = useState(false);
  const floatAnim = useRef(new Animated.Value(0)).current;
  const zoomAnim = useRef(new Animated.Value(0)).current;

  // 🌟 マウント時にautoZoomがtrueなら一度だけ実行し、すぐに親へ報告する
  useEffect(() => {
    if (autoZoom) {
      toggleZoom();
      if (onZoomProcessed) onZoomProcessed();
    }
  }, []); // 🌟 初回描画時のみ判定

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, { toValue: 1, duration: 3000, useNativeDriver: true }),
        Animated.timing(floatAnim, { toValue: 0, duration: 3000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const toggleZoom = () => {
    const toValue = isZoomed ? 0 : 1;
    if (!isZoomed) setIsZoomed(true);
    Animated.timing(zoomAnim, { toValue, duration: 500, useNativeDriver: true }).start(() => {
      if (isZoomed) setIsZoomed(false);
    });
  };

  return (
    <FadeInView style={{ flex: 1 }}>
      <View style={styles.screenContainer}>
        <StatusBar barStyle={isZoomed ? "light-content" : "dark-content"} translucent backgroundColor="transparent" />
        <ScrollView contentContainerStyle={styles.scrollContent} scrollEnabled={!isZoomed}>
          <View style={styles.header}>
            <View><Text style={styles.greeting}>Hello,</Text><Text style={styles.userNameText}>{userName} !</Text></View>
            <TouchableOpacity style={styles.iconBtn}><Ionicons name="notifications-outline" size={24} color="#000" /></TouchableOpacity>
          </View>

          <Animated.View style={[styles.cardContainer, { transform: [{ translateY: floatAnim.interpolate({ inputRange: [0, 1], outputRange: [0, -10] }) }] }]}>
            <Pressable onPress={toggleZoom} style={{ flex: 1 }}>
              <ImageBackground source={CARD_BG_SOURCE} style={styles.cardBgImage} resizeMode="cover" fadeDuration={0}>
                <View style={styles.cardOverlay}>
                  <View style={styles.barcodeWrapper}><BarcodeVisual /></View>
                  <Text style={styles.memberNumber}>1234 5678 9101 1</Text>
                </View>
              </ImageBackground>
            </Pressable>
          </Animated.View>

          <View style={styles.pointsContainer}>
            <Text style={styles.rankLabel}>現在のランク : レギュラー</Text>
            <PointImageDisplay points={156} />
          </View>

          <View style={styles.historySection}>
            <Text style={styles.historyHeader}>Point History</Text>
            {[
              { id: "1", icon: "book-outline", color: "#FF4B8B", title: "Shodo lab", sub: "¥700", points: 70 },
              { id: "2", icon: "coffee-outline", color: "#FF9F2E", title: "Cafe", sub: "¥560", points: 56 },
              { id: "3", icon: "heart-outline", color: "#00A3E1", title: "Present", sub: "30 point", points: 30 },
            ].map((item) => (
              <View key={item.id} style={styles.historyItem}>
                <View style={styles.historyItemLeft}>
                  <View style={[styles.historyIcon, { backgroundColor: item.color }]}><Ionicons name={item.icon as any} size={22} color="#fff" /></View>
                  <View><Text style={styles.historyItemTitle}>{item.title}</Text><Text style={styles.historyItemSub}>{item.sub}</Text></View>
                </View>
                <Text style={styles.historyItemPoints}>{item.points}pt</Text>
              </View>
            ))}
          </View>
          <View style={{ height: 160 }} />
        </ScrollView>

        <Animated.View style={[styles.fullOverlay, { opacity: zoomAnim, zIndex: isZoomed ? 999 : -1 }]} pointerEvents={isZoomed ? "auto" : "none"}>
          <Pressable style={styles.absFill} onPress={toggleZoom}>
            <View style={styles.centered}>
              <Animated.View style={[styles.zoomedCard, { transform: [{ scale: zoomAnim.interpolate({ inputRange: [0, 1], outputRange: [0.85, 1.25] }) }, { rotate: zoomAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '90deg'] }) }] }]}>
                <ImageBackground source={CARD_BG_SOURCE} style={styles.cardBgImage} imageStyle={{ borderRadius: 24 }} fadeDuration={0}>
                  <View style={styles.cardOverlay}>
                    <View style={styles.largeBarcodeBox}><BarcodeVisual /><Text style={styles.largeNumber}>1234 5678 9101 1</Text></View>
                  </View>
                </ImageBackground>
              </Animated.View>
            </View>
          </Pressable>
        </Animated.View>
      </View>
    </FadeInView>
  );
}

const styles = StyleSheet.create({
  screenContainer: { flex: 1, backgroundColor: "#f0f0f0" },
  scrollContent: { paddingTop: 60, paddingBottom: 20 },
  header: { paddingHorizontal: 24, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  greeting: { fontSize: 14, color: "#6b7280" }, userNameText: { fontSize: 24, fontWeight: "700" },
  iconBtn: { width: 44, height: 44, backgroundColor: "#fff", borderRadius: 22, justifyContent: "center", alignItems: "center" },
  cardContainer: { marginHorizontal: 24, aspectRatio: 1.6, borderRadius: 32, overflow: "hidden", elevation: 12 },
  cardBgImage: { width: '100%', height: '100%' },
  cardOverlay: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.15)" },
  barcodeWrapper: { backgroundColor: "#fff", padding: 10, borderRadius: 8 },
  barcodeContainer: { flexDirection: "row", alignItems: "flex-end", height: 35 },
  barcodeBar: { height: "100%", marginRight: 1.2 },
  memberNumber: { color: "#fff", marginTop: 8, fontSize: 10, letterSpacing: 2, fontWeight: "600" },
  pointsContainer: { alignItems: "center", marginTop: 30 },
  rankLabel: { fontSize: 12, color: "#6b7280", marginBottom: 15 },
  pointsImageRow: { flexDirection: "row", alignItems: "flex-end", height: 75, justifyContent: 'center' },
  digitImage: { height: "100%", width: 38, marginHorizontal: 2 },
  ptImage: { height: 38, width: 38, marginLeft: 8, marginBottom: 8 },
  historySection: { paddingHorizontal: 24, marginTop: 40 },
  historyHeader: { fontSize: 18, fontWeight: "700", marginBottom: 16 },
  historyItem: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "rgba(255,255,255,0.7)", padding: 14, borderRadius: 24, marginBottom: 12 },
  historyItemLeft: { flexDirection: "row", alignItems: "center", gap: 16 },
  historyIcon: { width: 48, height: 48, borderRadius: 14, justifyContent: "center", alignItems: "center" },
  historyItemTitle: { fontSize: 15, fontWeight: "600" },
  historyItemSub: { fontSize: 12, color: "#9ca3af" },
  historyItemPoints: { fontSize: 15, fontWeight: "700" },
  fullOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.96)' },
  absFill: { ...StyleSheet.absoluteFillObject },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  zoomedCard: { width: SCREEN_WIDTH * 0.85, aspectRatio: 1.6 },
  largeBarcodeBox: { backgroundColor: '#fff', padding: 25, borderRadius: 16, alignItems: 'center', width: '80%' },
  largeNumber: { color: '#000', marginTop: 15, fontSize: 14, fontWeight: '700', letterSpacing: 3 },
});