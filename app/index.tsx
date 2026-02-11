import { Ionicons } from "@expo/vector-icons"; // 🌟 追加
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Platform, StyleSheet, View } from "react-native";

// Google Fonts
import {
  Outfit_400Regular,
  Outfit_700Bold,
  useFonts,
} from "@expo-google-fonts/outfit";
import {
  ZenKakuGothicNew_400Regular,
  ZenKakuGothicNew_700Bold,
} from "@expo-google-fonts/zen-kaku-gothic-new";

// コンポーネント
import BottomNav from "./BottomNav";
import Cart from "./Cart";
import Coupons from "./Coupons";
import Goods from "./Goods";
import Membership from "./Membership";
import NameEntry from "./NameEntry";
import Onboarding from "./Onboarding";
import OrderComplete from "./OrderComplete";
import ProductDetail from "./ProductDetail";
import Profile from "./Profile";

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    ...Ionicons.font, // 🌟 アイコンフォントをビルドに含める
    Outfit: Outfit_400Regular,
    "Outfit-Bold": Outfit_700Bold,
    ZenKaku: ZenKakuGothicNew_400Regular,
    "ZenKaku-Bold": ZenKakuGothicNew_700Bold,
  });

  const [isAssetReady, setIsAssetReady] = useState(false);
  const [screen, setScreen] = useState("onboarding");
  const [userName, setUserName] = useState("Guest");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    async function prepare() {
      try {
        await Asset.loadAsync([
          require("./assets/card_bg.png"),
          require("./assets/hero_shodo.png"),
        ]);
        if (Platform.OS === "web") {
          const savedName = localStorage.getItem("stroke_user_name");
          if (savedName) setUserName(savedName);
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setIsAssetReady(true);
      }
    }
    prepare();
  }, []);

  useEffect(() => {
    if ((fontsLoaded || fontError) && isAssetReady) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded, fontError, isAssetReady]);

  const navigateTo = (target: string, data?: any) => {
    if (target === "productDetail") setSelectedProduct(data);
    setScreen(target);
  };

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
        {screen === "onboarding" && (
          <Onboarding onStart={() => setScreen("nameEntry")} />
        )}
        {screen === "nameEntry" && (
          <NameEntry
            onNext={(name) => {
              setUserName(name || "Guest");
              if (Platform.OS === "web")
                localStorage.setItem("stroke_user_name", name);
              setScreen("membership");
            }}
            onBack={() => setScreen("onboarding")}
          />
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
              if (Platform.OS === "web")
                localStorage.removeItem("stroke_user_name");
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
            onCheckout={() => {
              setCartItems([]);
              setScreen("orderComplete");
            }}
          />
        )}
        {screen === "orderComplete" && (
          <OrderComplete onNavigate={navigateTo} />
        )}
      </View>

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
  },
  mainContent: { flex: 1 },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  bottomNavWrapper: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 40 : 25,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
});
