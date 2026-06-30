// src/screens/ProfileScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { deleteUser } from 'firebase/auth';
import { auth } from '../config/firebase';
import {
  buscarPerfil,
  atualizarPerfil,
  deletarPerfil,
} from '../services/firestoreService';
import { useAuth } from '../contexts/AuthContext';

export default function ProfileScreen({ navigation }) {
  const { usuario, sair } = useAuth();
  const [perfil, setPerfil] = useState(null);
  const [editando, setEditando] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  // Campos editáveis
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    carregarPerfil();
  }, []);

  async function carregarPerfil() {
    setCarregando(true);
    try {
      const dados = await buscarPerfil(usuario.uid);
      if (dados) {
        setPerfil(dados);
        setNome(dados.nome || '');
        setTelefone(dados.telefone || '');
        setBio(dados.bio || '');
      }
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível carregar o perfil.');
    } finally {
      setCarregando(false);
    }
  }

  async function handleSalvar() {
    if (!nome.trim()) {
      Alert.alert('Atenção', 'O nome não pode ficar vazio.');
      return;
    }
    setSalvando(true);
    try {
      await atualizarPerfil(usuario.uid, {
        nome: nome.trim(),
        telefone: telefone.trim(),
        bio: bio.trim(),
      });
      setPerfil((p) => ({ ...p, nome: nome.trim(), telefone: telefone.trim(), bio: bio.trim() }));
      setEditando(false);
      Alert.alert('✅ Sucesso', 'Perfil atualizado com sucesso!');
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível salvar as alterações.');
    } finally {
      setSalvando(false);
    }
  }

  async function handleExcluirConta() {
    Alert.alert(
      '⚠️ Excluir Conta',
      'Tem certeza? Todos os seus dados serão apagados permanentemente.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await deletarPerfil(usuario.uid);
              await deleteUser(auth.currentUser);
            } catch (e) {
              Alert.alert('Erro', 'Não foi possível excluir a conta. Faça login novamente e tente.');
            }
          },
        },
      ]
    );
  }

  function handleLogout() {
    Alert.alert('Sair', 'Deseja sair da sua conta?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: sair },
    ]);
  }

  if (carregando) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#e05c3e" />
        <Text style={styles.loadingTexto}>Carregando perfil...</Text>
      </View>
    );
  }

  const iniciais = (perfil?.nome || usuario?.email || 'U')
    .split(' ')
    .map((p) => p[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />

      {/* Header */}
      <View style={styles.headerArea}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.voltarBtn}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitulo}>Meu Perfil</Text>
        <TouchableOpacity onPress={() => setEditando(!editando)} style={styles.editBtn}>
          <Ionicons name={editando ? 'close' : 'pencil'} size={22} color="#e05c3e" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarTexto}>{iniciais}</Text>
          </View>
          <Text style={styles.nomeHeader}>{perfil?.nome || 'Usuário'}</Text>
          <Text style={styles.emailHeader}>{usuario?.email}</Text>
        </View>

        {/* Informações */}
        <View style={styles.card}>
          <Text style={styles.secaoTitulo}>Informações Pessoais</Text>

          <View style={styles.campo}>
            <Ionicons name="person-outline" size={18} color="#e05c3e" style={styles.campoIcone} />
            <View style={styles.campoConteudo}>
              <Text style={styles.campoLabel}>Nome</Text>
              {editando ? (
                <TextInput
                  style={styles.input}
                  value={nome}
                  onChangeText={setNome}
                  placeholder="Seu nome"
                  placeholderTextColor="#777"
                  autoCapitalize="words"
                />
              ) : (
                <Text style={styles.campoValor}>{perfil?.nome || '—'}</Text>
              )}
            </View>
          </View>

          <View style={styles.divisor} />

          <View style={styles.campo}>
            <Ionicons name="mail-outline" size={18} color="#e05c3e" style={styles.campoIcone} />
            <View style={styles.campoConteudo}>
              <Text style={styles.campoLabel}>E-mail</Text>
              <Text style={styles.campoValor}>{usuario?.email}</Text>
            </View>
          </View>

          <View style={styles.divisor} />

          <View style={styles.campo}>
            <Ionicons name="call-outline" size={18} color="#e05c3e" style={styles.campoIcone} />
            <View style={styles.campoConteudo}>
              <Text style={styles.campoLabel}>Telefone</Text>
              {editando ? (
                <TextInput
                  style={styles.input}
                  value={telefone}
                  onChangeText={setTelefone}
                  placeholder="(00) 00000-0000"
                  placeholderTextColor="#777"
                  keyboardType="phone-pad"
                />
              ) : (
                <Text style={styles.campoValor}>{perfil?.telefone || '—'}</Text>
              )}
            </View>
          </View>

          <View style={styles.divisor} />

          <View style={styles.campo}>
            <Ionicons name="chatbubble-outline" size={18} color="#e05c3e" style={styles.campoIcone} />
            <View style={styles.campoConteudo}>
              <Text style={styles.campoLabel}>Bio</Text>
              {editando ? (
                <TextInput
                  style={[styles.input, { height: 72, textAlignVertical: 'top' }]}
                  value={bio}
                  onChangeText={setBio}
                  placeholder="Fale sobre você..."
                  placeholderTextColor="#777"
                  multiline
                />
              ) : (
                <Text style={styles.campoValor}>{perfil?.bio || '—'}</Text>
              )}
            </View>
          </View>
        </View>

        {/* Botão salvar */}
        {editando && (
          <TouchableOpacity
            style={[styles.botaoSalvar, salvando && { opacity: 0.7 }]}
            onPress={handleSalvar}
            disabled={salvando}
          >
            {salvando ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Ionicons name="checkmark-circle" size={20} color="#fff" />
                <Text style={styles.botaoSalvarTexto}>Salvar Alterações</Text>
              </>
            )}
          </TouchableOpacity>
        )}

        {/* Ações */}
        <View style={styles.card}>
          <Text style={styles.secaoTitulo}>Conta</Text>

          <TouchableOpacity style={styles.acaoBotao} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={22} color="#f59e0b" />
            <Text style={[styles.acaoTexto, { color: '#f59e0b' }]}>Sair da conta</Text>
            <Ionicons name="chevron-forward" size={18} color="#f59e0b" />
          </TouchableOpacity>

          <View style={styles.divisor} />

          <TouchableOpacity style={styles.acaoBotao} onPress={handleExcluirConta}>
            <Ionicons name="trash-outline" size={22} color="#ef4444" />
            <Text style={[styles.acaoTexto, { color: '#ef4444' }]}>Excluir conta</Text>
            <Ionicons name="chevron-forward" size={18} color="#ef4444" />
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingTexto: {
    color: '#aaa',
    marginTop: 12,
  },
  headerArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 16,
  },
  voltarBtn: {
    padding: 4,
  },
  headerTitulo: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  editBtn: {
    padding: 4,
  },
  scroll: {
    padding: 20,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e05c3e',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#e05c3e',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 10,
  },
  avatarTexto: {
    fontSize: 36,
    fontWeight: '800',
    color: '#fff',
  },
  nomeHeader: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },
  emailHeader: {
    fontSize: 13,
    color: '#aaa',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#16213e',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  secaoTitulo: {
    fontSize: 13,
    fontWeight: '700',
    color: '#e05c3e',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  campo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 6,
  },
  campoIcone: {
    marginTop: 2,
    marginRight: 14,
  },
  campoConteudo: {
    flex: 1,
  },
  campoLabel: {
    fontSize: 12,
    color: '#aaa',
    marginBottom: 4,
  },
  campoValor: {
    fontSize: 15,
    color: '#fff',
  },
  input: {
    backgroundColor: '#0f3460',
    borderRadius: 10,
    padding: 10,
    color: '#fff',
    fontSize: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  divisor: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
    marginVertical: 10,
  },
  botaoSalvar: {
    backgroundColor: '#e05c3e',
    borderRadius: 14,
    height: 52,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
    shadowColor: '#e05c3e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  botaoSalvarTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  acaoBotao: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 12,
  },
  acaoTexto: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },
});
