// src/screens/RegisterScreen.js
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
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { criarPerfil } from '../services/firestoreService';
import { Ionicons } from '@expo/vector-icons';

export default function RegisterScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [verSenha, setVerSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);

  async function handleCadastro() {
    if (!nome.trim() || !email.trim() || !senha || !confirmarSenha) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }
    if (senha !== confirmarSenha) {
      Alert.alert('Atenção', 'As senhas não coincidem.');
      return;
    }
    if (senha.length < 6) {
      Alert.alert('Atenção', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setCarregando(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), senha);
      await criarPerfil(cred.user.uid, {
        nome: nome.trim(),
        email: email.trim(),
        telefone: '',
        bio: '',
      });
      // AuthContext redireciona automaticamente após criar a conta
    } catch (e) {
      const mensagens = {
        'auth/email-already-in-use': 'E-mail já cadastrado.',
        'auth/invalid-email': 'E-mail inválido.',
        'auth/weak-password': 'Senha muito fraca.',
      };
      Alert.alert('Erro', mensagens[e.code] || 'Erro ao criar conta.');
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
        {/* Header */}
        <TouchableOpacity style={styles.voltar} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#e05c3e" />
          <Text style={styles.voltarTexto}>Voltar</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoEmoji}>👨‍🍳</Text>
          </View>
          <Text style={styles.titulo}>Criar Conta</Text>
          <Text style={styles.subtitulo}>Junte-se ao RangoApp</Text>
        </View>

        <View style={styles.card}>
          {/* Nome */}
          <View style={styles.campo}>
            <Ionicons name="person-outline" size={20} color="#e05c3e" style={styles.icone} />
            <TextInput
              style={styles.input}
              placeholder="Seu nome completo"
              placeholderTextColor="#aaa"
              value={nome}
              onChangeText={setNome}
              autoCapitalize="words"
            />
          </View>

          {/* E-mail */}
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

          {/* Senha */}
          <View style={styles.campo}>
            <Ionicons name="lock-closed-outline" size={20} color="#e05c3e" style={styles.icone} />
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Crie uma senha"
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

          {/* Confirmar Senha */}
          <View style={styles.campo}>
            <Ionicons name="shield-checkmark-outline" size={20} color="#e05c3e" style={styles.icone} />
            <TextInput
              style={styles.input}
              placeholder="Confirme a senha"
              placeholderTextColor="#aaa"
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              secureTextEntry={!verSenha}
            />
          </View>

          <TouchableOpacity
            style={[styles.botao, carregando && styles.botaoDesativado]}
            onPress={handleCadastro}
            disabled={carregando}
            activeOpacity={0.85}
          >
            {carregando ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.botaoTexto}>Criar Conta</Text>
            )}
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
    padding: 24,
    paddingTop: 60,
  },
  voltar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  voltarTexto: {
    color: '#e05c3e',
    fontSize: 16,
    marginLeft: 6,
    fontWeight: '600',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e05c3e',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    shadowColor: '#e05c3e',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 14,
    elevation: 10,
  },
  logoEmoji: {
    fontSize: 36,
  },
  titulo: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
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
});
