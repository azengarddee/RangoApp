import React, { useState, useEffect, useCallback } from "react";
import { View, ActivityIndicator } from "react-native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import * as SplashScreen from "expo-splash-screen";
import { Asset } from "expo-asset";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Contexto de autenticação
import { AuthProvider, useAuth } from "./src/contexts/AuthContext";

// Screens
import TelaAbertura from "./src/components/TelaAbertura";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import ReceitasScreen from "./src/screens/ReceitasScreen";

// Dados de ingredientes (para pré-carregamento)
import { categorias } from "./src/data/ingredients";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

// ---- Navegação para usuários NÃO logados ----
function PublicStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Cadastro" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

// ---- Navegação para usuários logados ----
function PrivateStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Perfil" component={ProfileScreen} />
      <Stack.Screen name="Receitas" component={ReceitasScreen} />
    </Stack.Navigator>
  );
}

// ---- Roteador principal (decide Public ou Private) ----
function RootNavigator({ mostrarSplash }) {
  const { usuario, carregando } = useAuth();

  if (mostrarSplash || carregando) {
    return (
      <View style={{ flex: 1, backgroundColor: "#1a1a2e", justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#e05c3e" />
      </View>
    );
  }

  return usuario ? <PrivateStack /> : <PublicStack />;
}

// ---- App raiz ----
export default function App() {
  const [appPronto, setAppPronto] = useState(false);
  const [mostrarSplash, setMostrarSplash] = useState(true);

  const [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  useEffect(() => {
    async function prepararApp() {
      try {
        const imagensParaCarregar = [];
        categorias.forEach((cat) => {
          cat.data.forEach((item) => {
            if (item.imagem) imagensParaCarregar.push(item.imagem);
          });
        });

        const promessasImagens = imagensParaCarregar.map((imagem) => {
          if (typeof imagem === "number") {
            return Asset.fromModule(imagem).downloadAsync();
          }
          return Promise.resolve();
        });

        await Promise.all(promessasImagens);
      } catch (e) {
        console.warn("Erro ao carregar assets:", e);
      } finally {
        setAppPronto(true);
      }
    }
    prepararApp();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appPronto && (fontsLoaded || fontError)) {
      setTimeout(async () => {
        await SplashScreen.hideAsync();
        setMostrarSplash(false);
      }, 500);
    }
  }, [appPronto, fontsLoaded, fontError]);

  if (!appPronto || (!fontsLoaded && !fontError)) {
    return null;
  }

  return (
    <AuthProvider>
      <NavigationContainer>
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
          {mostrarSplash ? (
            <TelaAbertura />
          ) : (
            <RootNavigator mostrarSplash={false} />
          )}
        </View>
      </NavigationContainer>
    </AuthProvider>
  );
}
