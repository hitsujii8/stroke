import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  Dimensions, 
  StatusBar 
} from "react-native";
import { FadeInView } from "./FadeInView";

// 画面の横幅と高さを取得
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function Onboarding({ onStart }: { onStart: () => void }) {
  return (
    <FadeInView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        
        {/* ─── 垂れ幕画像セクション ─── */}
        <View style={styles.imageContainer}>
          <Image 
            source={require("./assets/hero_shodo.png")} 
            style={styles.heroImage}
            // 🌟 左右に隙間を作らず、領域を完全に覆う設定
            resizeMode="cover" 
          />
        </View>

        {/* ─── コンテンツセクション ─── */}
        <View style={styles.contentContainer}>
          <View style={styles.textGroup}>
            <Text style={styles.welcomeText}>ようこそ、</Text>
            <Text style={styles.brandText}>STROKEへ</Text>
          </View>

          <View style={styles.buttonGroup}>
            <TouchableOpacity 
              style={styles.mainBtn} 
              onPress={onStart}
              activeOpacity={0.8}
            >
              <Text style={styles.mainBtnText}>はじめる</Text>
            </TouchableOpacity>
            
            <Text style={styles.subHint}>
              筆跡でつながる、新しい体験。
            </Text>
          </View>
        </View>
      </View>
    </FadeInView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff" 
  },
  imageContainer: {
    // 🌟 画面の横幅（SCREEN_WIDTH）をそのまま使用することで左右の余白を消去
    width: SCREEN_WIDTH, 
    height: SCREEN_HEIGHT * 0.55, 
    overflow: 'hidden',
  },
  heroImage: {
    // 🌟 親要素（SCREEN_WIDTH）に対して100%の幅で描画
    width: '100%', 
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 40,
    justifyContent: 'space-between', 
    paddingTop: 30, 
    paddingBottom: 60, 
  },
  textGroup: {
    alignItems: 'center',
    marginTop: 10,
  },
  welcomeText: {
    fontSize: 24,
    fontFamily: "ZenKakuGothicNew_700Bold",
    color: "#1f2937",
    letterSpacing: 2,
    marginBottom: 4,
  },
  brandText: {
    fontSize: 32,
    fontFamily: "ZenKakuGothicNew_700Bold",
    color: "#000",
    letterSpacing: 6,
  },
  buttonGroup: {
    alignItems: 'center',
  },
  mainBtn: {
    backgroundColor: "#000",
    width: '100%',
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  mainBtnText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "ZenKakuGothicNew_700Bold",
    letterSpacing: 4,
  },
  subHint: {
    marginTop: 20,
    fontSize: 12,
    color: "#9ca3af",
    fontFamily: "ZenKakuGothicNew_400Regular",
    letterSpacing: 1,
  }
});