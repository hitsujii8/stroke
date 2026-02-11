import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FadeInView } from "./FadeInView";

export default function NameEntry({ 
  onNext, 
  onBack 
}: { 
  onNext: (name: string) => void; 
  onBack: () => void; 
}) {
  const [name, setName] = useState("");

  const handleNext = () => {
    if (name.trim().length > 0) {
      onNext(name);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <FadeInView style={{ flex: 1 }}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          {/* 戻るボタン */}
          <TouchableOpacity style={styles.backBtn} onPress={onBack}>
            <Ionicons name="arrow-back" size={24} color="#1f2937" />
          </TouchableOpacity>

          <View style={styles.inner}>
            <View style={styles.header}>
              <Text style={styles.title}>はじめる準備。</Text>
              <Text style={styles.subtitle}>
                あなたの、お名前を教えてください。
              </Text>
            </View>

            <View style={styles.inputSection}>
              <Text style={styles.label}>お名前（ニックネーム可）</Text>
              <TextInput
                style={styles.input}
                placeholder="例：山田 太郎"
                placeholderTextColor="#9ca3af"
                value={name}
                onChangeText={setName}
                autoFocus={false} // 🌟 ここをfalseにすることで自動表示を防ぎます
                selectionColor="#000"
              />
              <Text style={styles.hint}>
                アプリ内での表示に使用されます。
              </Text>
            </View>

            <View style={styles.footer}>
              <TouchableOpacity 
                style={[
                  styles.nextBtn, 
                  { opacity: name.trim().length > 0 ? 1 : 0.3 }
                ]} 
                onPress={handleNext}
                disabled={name.trim().length === 0}
                activeOpacity={0.8}
              >
                <Text style={styles.nextBtnText}>次へ</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </FadeInView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backBtn: {
    position: "absolute",
    top: 60,
    left: 24,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#f9fafb",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  inner: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: "center",
  },
  header: {
    marginBottom: 48,
  },
  title: {
    fontSize: 28,
    fontFamily: "ZenKakuGothicNew_700Bold",
    color: "#000",
    letterSpacing: 2,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "ZenKakuGothicNew_400Regular",
    color: "#4b5563",
    letterSpacing: 1,
    lineHeight: 24,
  },
  inputSection: {
    marginBottom: 40,
  },
  label: {
    fontSize: 13,
    fontFamily: "ZenKakuGothicNew_700Bold",
    color: "#9ca3af",
    marginBottom: 12,
    marginLeft: 4,
  },
  input: {
    backgroundColor: "#f9fafb",
    height: 64,
    borderRadius: 20,
    paddingHorizontal: 24,
    fontSize: 18,
    fontFamily: "ZenKakuGothicNew_400Regular",
    color: "#000",
    borderWidth: 1,
    borderColor: "#f3f4f6",
  },
  hint: {
    fontSize: 12,
    fontFamily: "ZenKakuGothicNew_400Regular",
    color: "#9ca3af",
    marginTop: 12,
    marginLeft: 4,
  },
  footer: {
    marginTop: 20,
  },
  nextBtn: {
    backgroundColor: "#000",
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  nextBtnText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "ZenKakuGothicNew_700Bold",
    letterSpacing: 4,
  },
});