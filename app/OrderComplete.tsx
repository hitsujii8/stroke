import React, { useEffect, useRef } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Animated, 
  Easing,
  Platform 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FadeInView } from "./FadeInView";

export default function OrderComplete({ onNavigate }: { onNavigate: (s: string) => void }) {
  const inkSpread = useRef(new Animated.Value(0)).current;
  const messageOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 墨が広がるアニメーション
    Animated.sequence([
      Animated.timing(inkSpread, {
        toValue: 1,
        duration: 1500, // 1.5秒かけて広がる
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      // メッセージがフェードインするアニメーション
      Animated.timing(messageOpacity, {
        toValue: 1,
        duration: 800, // 0.8秒かけてフェードイン
        delay: 300, // 墨が広がり終わる少し後に開始
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // 墨の広がりを表現するスタイル
  const inkStyle = {
    opacity: inkSpread.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.8, 0.4], // 広がるにつれて少し薄くなる
    }),
    transform: [
      {
        scale: inkSpread.interpolate({
          inputRange: [0, 1],
          outputRange: [0.1, 1.5], // 小さくから大きく広がる
        }),
      },
    ],
  };

  return (
    <FadeInView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* 墨のアニメーション部分 */}
        <Animated.View style={[styles.inkEffect, inkStyle]} />
        <Animated.View style={[styles.inkEffectSecondary, inkStyle]} />
        
        {/* メッセージコンテンツ */}
        <Animated.View style={[styles.contentWrapper, { opacity: messageOpacity }]}>
          <Ionicons name="checkmark-circle-outline" size={80} color="#000" />
          <Text style={styles.title}>ご注文ありがとうございます</Text>
          <Text style={styles.message}>
            あなただけの「書」の体験を、心ゆくまでお楽しみください。
          </Text>

          <TouchableOpacity style={styles.backToHomeBtn} onPress={() => onNavigate("membership")}>
            <Text style={styles.backToHomeBtnText}>ホームに戻る</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.viewOrderBtn} onPress={() => alert("注文履歴を表示（未実装）")}>
            <Text style={styles.viewOrderBtnText}>注文履歴を見る</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </FadeInView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    overflow: 'hidden', // 墨が画面外に広がってもOK
  },
  inkEffect: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100, // 円形
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // 濃い墨の色
  },
  inkEffectSecondary: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // 少し薄い墨の色
    left: '20%', // 位置を少しずらす
    top: '30%',
    transform: [{ rotate: '45deg' }], // 回転させてランダム感を出す
  },
  contentWrapper: {
    alignItems: "center",
    padding: 30,
    marginTop: -50, // 墨の広がりと重ならないように微調整
  },
  title: {
    fontSize: 28,
    fontFamily: "ZenKakuGothicNew_700Bold",
    color: "#000",
    marginTop: 20,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    fontFamily: "ZenKakuGothicNew_400Regular",
    color: "#4b5563",
    marginTop: 10,
    textAlign: "center",
    lineHeight: 24,
  },
  backToHomeBtn: {
    marginTop: 40,
    backgroundColor: "#000",
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 30,
    width: '80%',
    alignItems: 'center',
  },
  backToHomeBtnText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "ZenKakuGothicNew_700Bold",
  },
  viewOrderBtn: {
    marginTop: 15,
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#000",
    width: '80%',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  viewOrderBtnText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "ZenKakuGothicNew_700Bold",
  },
});