import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, Platform } from "react-native";
import { Asset } from "expo-asset";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';

// 🌟 コンポーネントのインポート（パスが ./ で正しいか確認してください）
import Onboarding from "./Onboarding";
import NameEntry from "./NameEntry";
import Membership from "./Membership";
import Goods from "./Goods";
import Profile from "./Profile";
import Coupons from "./Coupons";
import ProductDetail from "./ProductDetail";
import Cart from "./Cart";
import OrderComplete from "./OrderComplete";
import BottomNav from "./BottomNav";

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
  // 🌟 フォント読み込み（相対パスを ./assets/... に修正）
  const [fontsLoaded, fontError] = useFonts({
    'Outfit': require('./assets/fonts/Outfit-Regular.ttf'),
    'Outfit-Bold': require('./assets/fonts/Outfit-Bold.ttf'),
    'ZenKaku': require('./assets/fonts/ZenKakuGothicNew-Regular.ttf'),
    'ZenKaku-Bold': require('./assets/fonts/ZenKakuGothicNew-Bold.ttf'),
  });

  const [isAssetReady, setIsAssetReady] = useState(false);
  const [screen, setScreen] = useState("onboarding");
  const [userName, setUserName] = useState("Guest");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  // 初期化：アセットのロードと名前の復元
  useEffect(() => {
    async function prepare() {
      try {
        await Asset.loadAsync([
          require("./assets/card_bg.png"),
          require("./assets/hero_shodo.png"),
        ]);

        if (Platform.OS === 'web') {
          // localStorageからの読み込みをtry-catchで安全に行う
          try {
            const savedName = localStorage.getItem('stroke_user_name');
            if (savedName) setUserName(savedName);
          } catch (e) {
            console.error("localStorage access error:", e);
          }
        }
      } catch (e) {
        console.warn("Asset preparation error:", e);
      } finally {
        setIsAssetReady(true);
      }
    }
    prepare();
  }, []);

  // 準備ができたらスプラッシュ画面を隠す
  useEffect(() => {
    if ((fontsLoaded || fontError) && isAssetReady) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded, fontError, isAssetReady]);

  // 🌟 名前を決定して次に進む処理（ここが真っ白の原因になりやすい）
  const handleSetName = (name: string) => {
    try {
      setUserName(name || "Guest");
      if (Platform.OS === 'web') {
        localStorage.setItem('stroke_user_name', name);
      }
      setScreen("membership");
    } catch (e) {
      console.error("HandleSetName error:", e);
      setScreen("membership"); // エラーが起きても強引に進める
    }
  };

  const navigateTo = (target: string, data?: any) => {
    if (target === "productDetail") setSelectedProduct(data);
    setScreen(target);
  };

  // 💡 安全策：ロード中はインジケーターを表示
  if (!isAssetReady || (!fontsLoaded && !fontError)) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        {/* 画面遷移ロジック */}
        {screen === "onboarding" && <Onboarding onStart={() => setScreen("nameEntry")} />}
        
        {screen === "nameEntry" && (
          <NameEntry onNext={handleSetName} onBack={() => setScreen("onboarding")} />
        )}
        
        {screen === "membership" && (
          <Membership userName={userName} onNavigate={navigateTo} />
        )}
        
        {screen === "goods" && (
          <Goods onNavigate={navigateTo} cartCount={cartItems.length} />
        )}

        {screen === "profile" && (
          <Profile 
            userName={userName} 
            onNavigate={navigateTo} 
            onLogout={() => {
              if (Platform.OS === 'web') localStorage.removeItem('stroke_user_name');
              setUserName("Guest");
              setScreen("onboarding");
            }} 
          />
        )}

        {screen === "coupons" && <Coupons onNavigate={navigateTo} />}

        {screen === "productDetail" && selectedProduct && (
          <ProductDetail 
            product={selectedProduct} 
            onBack={() => setScreen("goods")} 
            onAddToCart={(p: any) => setCartItems([...cartItems, p])}
            onGoToCart={() => setScreen("cart")}
            cartCount={cartItems.length}
          />
        )}

        {screen === "cart" && (
          <Cart 
            cartItems={cartItems} 
            onNavigate={navigateTo} 
            onCheckout={() => { setCartItems([]); setScreen("orderComplete"); }} 
          />
        )}

        {screen === "orderComplete" && <OrderComplete onNavigate={navigateTo} />}
      </View>

      {/* 🌟 ボトムナビゲーションの表示判定 */}
      {["membership", "coupons", "profile", "goods"].includes(screen) && (
        <View style={styles.bottomNavWrapper}>
          <BottomNav activeScreen={screen as any} onNavigate={navigateTo} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff",
    // 🌟 Web向けのフォントスタック
    ...Platform.select({
      web: { fontFamily: 'Outfit, ZenKaku, sans-serif' }
    })
  },
  mainContent: { flex: 1 },
  loading: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  bottomNavWrapper: { 
    position: "absolute", 
    bottom: Platform.OS === "ios" ? 40 : 25, 
    left: 0, 
    right: 0, 
    zIndex: 1000 
  }
});