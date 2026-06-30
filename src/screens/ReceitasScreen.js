// src/screens/ReceitasScreen.js
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Alert,
  Modal,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import {
  criarReceita,
  listarReceitas,
  atualizarReceita,
  deletarReceita,
} from '../services/firestoreService';

const DIFICULDADES = ['Fácil', 'Médio', 'Difícil'];

const receitaVazia = {
  nome: '',
  ingredientes: '',
  modoPreparo: '',
  tempo: '',
  dificuldade: 'Fácil',
};

export default function ReceitasScreen({ navigation }) {
  const { usuario } = useAuth();
  const [receitas, setReceitas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [form, setForm] = useState(receitaVazia);
  const [busca, setBusca] = useState('');

  const carregarReceitas = useCallback(async () => {
    setCarregando(true);
    try {
      const lista = await listarReceitas(usuario.uid);
      setReceitas(lista);
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível carregar as receitas.');
    } finally {
      setCarregando(false);
    }
  }, [usuario.uid]);

  useEffect(() => {
    carregarReceitas();
  }, [carregarReceitas]);

  function abrirNova() {
    setForm(receitaVazia);
    setEditandoId(null);
    setModalVisivel(true);
  }

  const formatarIngredientes = (ing) => {
    if (!ing) return '';
    if (typeof ing === 'string') return ing;
    if (Array.isArray(ing)) {
      return ing.map(i => typeof i === 'object' ? `${i.item || i.nome || ''} (${i.quantidade || ''})` : i).join(', ');
    }
    return '';
  };

  function abrirEditar(receita) {
    setForm({
      nome: receita.nome || '',
      ingredientes: formatarIngredientes(receita.ingredientes),
      modoPreparo: Array.isArray(receita.modoPreparo) ? receita.modoPreparo.join('\n') : (receita.modoPreparo || ''),
      tempo: receita.tempo || receita.tempoPreparo || '',
      dificuldade: receita.dificuldade || 'Fácil',
    });
    setEditandoId(receita.id);
    setModalVisivel(true);
  }

  async function handleSalvar() {
    if (!form.nome.trim() || !form.ingredientes.trim() || !form.modoPreparo.trim()) {
      Alert.alert('Atenção', 'Preencha nome, ingredientes e modo de preparo.');
      return;
    }
    setSalvando(true);
    try {
      if (editandoId) {
        await atualizarReceita(editandoId, form);
        setReceitas((prev) =>
          prev.map((r) => (r.id === editandoId ? { ...r, ...form } : r))
        );
        Alert.alert('✅ Atualizado!', 'Receita atualizada com sucesso.');
      } else {
        const novoId = await criarReceita(usuario.uid, form);
        setReceitas((prev) => [{ id: novoId, ...form, uid: usuario.uid }, ...prev]);
        Alert.alert('✅ Criado!', 'Receita adicionada com sucesso.');
      }
      setModalVisivel(false);
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível salvar a receita.');
    } finally {
      setSalvando(false);
    }
  }

  function handleDeletar(receita) {
    Alert.alert(
      '🗑️ Excluir Receita',
      `Tem certeza que deseja excluir "${receita.nome}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await deletarReceita(receita.id);
              setReceitas((prev) => prev.filter((r) => r.id !== receita.id));
            } catch (e) {
              Alert.alert('Erro', 'Não foi possível excluir a receita.');
            }
          },
        },
      ]
    );
  }

  const receitasFiltradas = receitas.filter((r) =>
    r.nome?.toLowerCase().includes(busca.toLowerCase())
  );

  const corDificuldade = {
    Fácil: '#22c55e',
    Médio: '#f59e0b',
    Difícil: '#ef4444',
  };

  function renderCard({ item }) {
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardNome} numberOfLines={1}>
            {item.nome}
          </Text>
          <View style={styles.cardAcoes}>
            <TouchableOpacity
              onPress={() => abrirEditar(item)}
              style={[styles.acaoBtn, { backgroundColor: 'rgba(224,92,62,0.15)' }]}
            >
              <Ionicons name="pencil" size={16} color="#e05c3e" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDeletar(item)}
              style={[styles.acaoBtn, { backgroundColor: 'rgba(239,68,68,0.15)' }]}
            >
              <Ionicons name="trash" size={16} color="#ef4444" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.cardTags}>
          {item.dificuldade && (
            <View style={[styles.tag, { borderColor: corDificuldade[item.dificuldade] }]}>
              <Text style={[styles.tagTexto, { color: corDificuldade[item.dificuldade] }]}>
                {item.dificuldade}
              </Text>
            </View>
          )}
          {item.tempo ? (
            <View style={styles.tagTempo}>
              <Ionicons name="time-outline" size={13} color="#aaa" />
              <Text style={styles.tagTempoTexto}>{item.tempo}</Text>
            </View>
          ) : null}
        </View>

        {item.ingredientes ? (
          <Text style={styles.cardIngredientes} numberOfLines={2}>
            🥘 {formatarIngredientes(item.ingredientes)}
          </Text>
        ) : null}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />

      {/* Header */}
      <View style={styles.headerArea}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.voltarBtn}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitulo}>Minhas Receitas</Text>
        <TouchableOpacity onPress={abrirNova} style={styles.addBtn}>
          <Ionicons name="add" size={26} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Busca */}
      <View style={styles.buscaContainer}>
        <Ionicons name="search-outline" size={18} color="#aaa" style={{ marginRight: 8 }} />
        <TextInput
          style={styles.buscaInput}
          placeholder="Buscar receita..."
          placeholderTextColor="#777"
          value={busca}
          onChangeText={setBusca}
        />
        {busca.length > 0 && (
          <TouchableOpacity onPress={() => setBusca('')}>
            <Ionicons name="close-circle" size={18} color="#aaa" />
          </TouchableOpacity>
        )}
      </View>

      {/* Lista */}
      {carregando ? (
        <View style={styles.centralizado}>
          <ActivityIndicator size="large" color="#e05c3e" />
          <Text style={styles.carregandoTexto}>Carregando receitas...</Text>
        </View>
      ) : receitasFiltradas.length === 0 ? (
        <View style={styles.centralizado}>
          <Text style={{ fontSize: 52 }}>🍽️</Text>
          <Text style={styles.vazioTitulo}>
            {busca ? 'Nenhuma receita encontrada' : 'Nenhuma receita ainda'}
          </Text>
          <Text style={styles.vazioSubtitulo}>
            {busca ? 'Tente outro nome' : 'Toque no + para adicionar sua primeira receita'}
          </Text>
          {!busca && (
            <TouchableOpacity style={styles.botaoCriar} onPress={abrirNova}>
              <Text style={styles.botaoCriarTexto}>Criar receita</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <FlatList
          data={receitasFiltradas}
          keyExtractor={(item) => item.id}
          renderItem={renderCard}
          contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Modal de criação/edição */}
      <Modal
        visible={modalVisivel}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisivel(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1 }}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {/* Header Modal */}
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitulo}>
                  {editandoId ? '✏️ Editar Receita' : '➕ Nova Receita'}
                </Text>
                <TouchableOpacity onPress={() => setModalVisivel(false)}>
                  <Ionicons name="close" size={24} color="#aaa" />
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                {/* Nome */}
                <Text style={styles.label}>Nome da Receita *</Text>
                <TextInput
                  style={styles.inputModal}
                  placeholder="Ex: Frango grelhado com arroz"
                  placeholderTextColor="#777"
                  value={form.nome}
                  onChangeText={(v) => setForm((f) => ({ ...f, nome: v }))}
                />

                {/* Ingredientes */}
                <Text style={styles.label}>Ingredientes *</Text>
                <TextInput
                  style={[styles.inputModal, { height: 90, textAlignVertical: 'top' }]}
                  placeholder="Ex: 2 filés de frango, 1 xícara de arroz, sal, alho..."
                  placeholderTextColor="#777"
                  value={form.ingredientes}
                  onChangeText={(v) => setForm((f) => ({ ...f, ingredientes: v }))}
                  multiline
                />

                {/* Modo de Preparo */}
                <Text style={styles.label}>Modo de Preparo *</Text>
                <TextInput
                  style={[styles.inputModal, { height: 110, textAlignVertical: 'top' }]}
                  placeholder="Ex: Tempere o frango, grelhe por 10 min de cada lado..."
                  placeholderTextColor="#777"
                  value={form.modoPreparo}
                  onChangeText={(v) => setForm((f) => ({ ...f, modoPreparo: v }))}
                  multiline
                />

                {/* Tempo */}
                <Text style={styles.label}>Tempo de Preparo</Text>
                <TextInput
                  style={styles.inputModal}
                  placeholder="Ex: 30 minutos"
                  placeholderTextColor="#777"
                  value={form.tempo}
                  onChangeText={(v) => setForm((f) => ({ ...f, tempo: v }))}
                />

                {/* Dificuldade */}
                <Text style={styles.label}>Dificuldade</Text>
                <View style={styles.dificuldadeRow}>
                  {DIFICULDADES.map((d) => (
                    <TouchableOpacity
                      key={d}
                      style={[
                        styles.dificuldadeBtn,
                        form.dificuldade === d && {
                          backgroundColor: corDificuldade[d],
                          borderColor: corDificuldade[d],
                        },
                      ]}
                      onPress={() => setForm((f) => ({ ...f, dificuldade: d }))}
                    >
                      <Text
                        style={[
                          styles.dificuldadeBtnTexto,
                          form.dificuldade === d && { color: '#fff', fontWeight: '700' },
                        ]}
                      >
                        {d}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Salvar */}
                <TouchableOpacity
                  style={[styles.botaoSalvar, salvando && { opacity: 0.7 }]}
                  onPress={handleSalvar}
                  disabled={salvando}
                >
                  {salvando ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.botaoSalvarTexto}>
                      {editandoId ? 'Atualizar Receita' : 'Salvar Receita'}
                    </Text>
                  )}
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const corDificuldade = {
  Fácil: '#22c55e',
  Médio: '#f59e0b',
  Difícil: '#ef4444',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  headerArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 16,
  },
  voltarBtn: { padding: 4 },
  headerTitulo: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  addBtn: {
    backgroundColor: '#e05c3e',
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buscaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16213e',
    borderRadius: 14,
    paddingHorizontal: 14,
    marginHorizontal: 16,
    marginBottom: 8,
    height: 46,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  buscaInput: {
    flex: 1,
    color: '#fff',
    fontSize: 15,
  },
  centralizado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  carregandoTexto: {
    color: '#aaa',
    marginTop: 12,
  },
  vazioTitulo: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginTop: 16,
    textAlign: 'center',
  },
  vazioSubtitulo: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 8,
    textAlign: 'center',
  },
  botaoCriar: {
    backgroundColor: '#e05c3e',
    borderRadius: 14,
    paddingHorizontal: 28,
    paddingVertical: 14,
    marginTop: 20,
  },
  botaoCriarTexto: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  card: {
    backgroundColor: '#16213e',
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cardNome: {
    flex: 1,
    fontSize: 17,
    fontWeight: '700',
    color: '#fff',
    marginRight: 10,
  },
  cardAcoes: {
    flexDirection: 'row',
    gap: 8,
  },
  acaoBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTags: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  tag: {
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  tagTexto: {
    fontSize: 12,
    fontWeight: '600',
  },
  tagTempo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  tagTempoTexto: {
    color: '#aaa',
    fontSize: 12,
  },
  cardIngredientes: {
    color: '#bbb',
    fontSize: 13,
    lineHeight: 18,
  },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#16213e',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    paddingBottom: 40,
    maxHeight: '92%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#e05c3e',
    marginBottom: 6,
    marginTop: 12,
  },
  inputModal: {
    backgroundColor: '#0f3460',
    borderRadius: 12,
    padding: 12,
    color: '#fff',
    fontSize: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  dificuldadeRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  dificuldadeBtn: {
    flex: 1,
    height: 40,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dificuldadeBtnTexto: {
    color: '#aaa',
    fontSize: 13,
  },
  botaoSalvar: {
    backgroundColor: '#e05c3e',
    borderRadius: 14,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
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
});
