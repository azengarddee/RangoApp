// src/screens/LoginScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
  ScrollView,
  StatusBar,
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [verSenha, setVerSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);

  async function handleLogin() {
    if (!email.trim() || !senha.trim()) {
      Alert.alert('Atenção', 'Preencha e-mail e senha.');
      return;
    }
    setCarregando(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), senha);
    } catch (e) {
      const mensagens = {
        'auth/user-not-found': 'Usuário não encontrado.',
        'auth/wrong-password': 'Senha incorreta.',
        'auth/invalid-email': 'E-mail inválido.',
        'auth/invalid-credential': 'E-mail ou senha incorretos.',
        'auth/too-many-requests': 'Muitas tentativas. Tente novamente mais tarde.',
      };
      Alert.alert('Erro', mensagens[e.code] || 'Erro ao fazer login.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        {/* Logo / Header */}
        <View style={styles.header}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoEmoji}>🍽️</Text>
          </View>
          <Text style={styles.titulo}>RangoApp</Text>
          <Text style={styles.subtitulo}>Receitas com Inteligência Artificial</Text>
        </View>

        {/* Card de login */}
        <View style={styles.card}>
          <Text style={styles.cardTitulo}>Entrar na conta</Text>

          <View style={styles.campo}>
            <Ionicons name="mail-outline" size={20} color="#e05c3e" style={styles.icone} />
            <TextInput
              style={styles.input}
              placeholder="Seu e-mail"
              placeholderTextColor="#aaa"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.campo}>
            <Ionicons name="lock-closed-outline" size={20} color="#e05c3e" style={styles.icone} />
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Sua senha"
              placeholderTextColor="#aaa"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={!verSenha}
            />
            <TouchableOpacity onPress={() => setVerSenha(!verSenha)}>
              <Ionicons
                name={verSenha ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color="#aaa"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.botao, carregando && styles.botaoDesativado]}
            onPress={handleLogin}
            disabled={carregando}
            activeOpacity={0.85}
          >
            {carregando ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.botaoTexto}>Entrar</Text>
            )}
          </TouchableOpacity>

          <View style={styles.separador}>
            <View style={styles.linha} />
            <Text style={styles.separadorTexto}>ou</Text>
            <View style={styles.linha} />
          </View>

          <TouchableOpacity
            style={styles.botaoSecundario}
            onPress={() => navigation.navigate('Cadastro')}
            activeOpacity={0.85}
          >
            <Text style={styles.botaoSecundarioTexto}>Criar nova conta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 36,
  },
  logoCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#e05c3e',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#e05c3e',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 12,
  },
  logoEmoji: {
    fontSize: 42,
  },
  titulo: {
    fontSize: 34,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 1,
  },
  subtitulo: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#16213e',
    borderRadius: 24,
    padding: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  cardTitulo: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 24,
    textAlign: 'center',
  },
  campo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f3460',
    borderRadius: 14,
    paddingHorizontal: 14,
    marginBottom: 14,
    height: 52,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  icone: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 15,
  },
  botao: {
    backgroundColor: '#e05c3e',
    borderRadius: 14,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#e05c3e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 6,
  },
  botaoDesativado: {
    opacity: 0.7,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  separador: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  linha: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  separadorTexto: {
    color: '#aaa',
    marginHorizontal: 12,
    fontSize: 13,
  },
  botaoSecundario: {
    borderWidth: 2,
    borderColor: '#e05c3e',
    borderRadius: 14,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoSecundarioTexto: {
    color: '#e05c3e',
    fontSize: 15,
    fontWeight: '600',
  },
});
