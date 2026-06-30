import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
  Modal,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { styles } from "../styles/styles";
import { categorias } from "../data/ingredients";
import { buscarSugestaoIA } from "../services/aiService";
import { db } from "../config/firebase";
import { useAuth } from "../contexts/AuthContext";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

// ========== TELA PRINCIPAL COM SEÇÕES ==========
const agruparPorTipo = (lista) => {
  return lista.reduce((acc, item) => {
    const tipo = item.tipo || "outros";
    if (!acc[tipo]) acc[tipo] = [];
    acc[tipo].push(item);
    return acc;
  }, {});
};

const nomesTipos = {
  frango: "🐔 FRANGO",
  boi: "🐄 BOI",
  porco: "🐖 PORCO",
  peixe: "🐟 PEIXES",
  folha: "🥬 FOLHAS",
  cru: "🥒 CRUS",
  cozido: "🍲 COZIDOS",
  base_saladas: "🥔 BASE",
  base: "🍚 BASE",
  tuberculo: "🥔 TUBÉRCULOS",
  funcional: "🌾 FUNCIONAIS",
  natural: "🥑 NATURAIS",
  oleo: "🫒 ÓLEOS",
  oleaginosa: "🥜 OLEAGINOSAS",
  pasta: "🧈 PASTAS",
  animal: "🧀 GORDURAS ANIMAIS",
  semente: "🌱 SEMENTES",
  comum: "🍌 COMUNS",
  vermelha: "🍓 VERMELHAS",
  tropical: "🍍 TROPICAIS",
  citrica: "🍋 CÍTRICAS",
  especial: "🥝 ESPECIAIS",
  ovos: "🥚 OVOS",
  lacteo: "🥛 LÁCTEOS",
  queijo: "🧀 QUEIJOS",
  suplemento: "💪 SUPLEMENTOS",
  vegetal: "🌱 PROTEÍNAS VEGETAIS",
  base_tempero: "🧄 BASE",
  essencial: "🧂 ESSENCIAIS",
  especiaria: "🌶️ ESPECIARIAS",
  erva: "🌿 ERVAS",
  molho: "🧃 MOLHOS",
  feijao: "🫘 FEIJÕES",
  grão: "🌾 GRÃOS",
};

// Extrai todos os ingredientes em uma lista única para busca
const todosIngredientes = categorias.reduce((acc, cat) => {
  return [...acc, ...cat.data];
}, []);

export default function HomeScreen({ navigation }) {
  const [ingredientesSelecionados, setIngredientesSelecionados] = useState([]);
  const [sugestao, setSugestao] = useState(null);
  const [faltando, setFaltando] = useState([]);
  const [categoriaAtiva, setCategoriaAtiva] = useState(null);
  const [tipoAtivo, setTipoAtivo] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [termoBusca, setTermoBusca] = useState("");
  const [sugestoesBusca, setSugestoesBusca] = useState([]);
  const [tipoReceita, setTipoReceita] = useState("Casa");

  const { usuario } = useAuth();

  const [salvando, setSalvando] = useState(false);

  const handleLoginRedirect = () => {
    navigation.navigate("Login");
  };

  const salvarReceita = async () => {
    if (!usuario) {
      Alert.alert("Login Necessário", "Conecte sua conta para poder salvar receitas.", [
        { text: "Cancelar", style: "cancel" },
        { text: "Login", onPress: handleLoginRedirect },
      ]);
      return;
    }

    if (!sugestao) return;

    setSalvando(true);
    try {
      // Converte a lista de ingredientes (objeto) em formato de string separada por vírgula
      const ingredientesStr = Array.isArray(sugestao.ingredientes)
        ? sugestao.ingredientes.map(i => `${i.item} (${i.quantidade})`).join(', ')
        : (sugestao.ingredientes || '');

      // Converte os passos de modo de preparo (array) em uma única string com quebras de linha
      const modoPreparoStr = Array.isArray(sugestao.modoPreparo)
        ? sugestao.modoPreparo.join('\n')
        : (sugestao.modoPreparo || '');

      // Converte o tempo de preparo em string simples
      const tempoStr = typeof sugestao.tempoPreparo === 'object'
        ? (sugestao.tempoPreparo.total || '')
        : (sugestao.tempoPreparo || '');

      await addDoc(collection(db, "receitas"), {
        uid: usuario.uid,
        nome: sugestao.nome,
        ingredientes: ingredientesStr,
        modoPreparo: modoPreparoStr,
        tempo: tempoStr,
        dificuldade: 'Médio', // Dificuldade padrão para sugestões de IA
        criadoEm: serverTimestamp(),
      });

      Alert.alert("✅ Salva", "Receita adicionada com sucesso em Minhas Receitas!");
    } catch (e) {
      console.error(e);
      Alert.alert("Erro", "Falha ao salvar a receita no Firebase.");
    } finally {
      setSalvando(false);
    }
  };

  const handleBusca = (texto) => {
    setTermoBusca(texto);
    if (texto.length >= 3) {
      const filtrados = todosIngredientes.filter((ing) =>
        ing.nome.toLowerCase().includes(texto.toLowerCase()),
      );
      setSugestoesBusca(filtrados);
    } else {
      setSugestoesBusca([]);
    }
  };

  const selecionarSugestao = (ingrediente) => {
    if (!ingredientesSelecionados.includes(ingrediente.nome)) {
      setIngredientesSelecionados([...ingredientesSelecionados, ingrediente.nome]);
    }
    setTermoBusca("");
    setSugestoesBusca([]);
  };

  const toggleIngrediente = (nome) => {
    if (ingredientesSelecionados.includes(nome)) {
      setIngredientesSelecionados(
        ingredientesSelecionados.filter((i) => i !== nome),
      );
    } else {
      setIngredientesSelecionados([...ingredientesSelecionados, nome]);
    }
  };

  const selecionarCategoria = (id) => {
    setCategoriaAtiva((prev) => (prev === id ? null : id));
    setTipoAtivo(null);
  };

  const selecionarTipo = (tipo) => {
    setTipoAtivo((prev) => (prev === tipo ? null : tipo));
  };

  const buscarSugestao = async () => {
    try {
      setCarregando(true);
      setSugestao(null);
      setFaltando([]);

      const receita = await buscarSugestaoIA(ingredientesSelecionados, tipoReceita);

      if (receita.erro) {
        Alert.alert("IA informa:", receita.erro);
      } else {
        setSugestao(receita);
        setFaltando(receita.faltando || []);
      }
    } catch (error) {
      Alert.alert("Erro na Geração", error.message);
    } finally {
      setCarregando(false);
    }
  };

  const renderIngrediente = ({ item }) => {
    const isSelected = ingredientesSelecionados.includes(item.nome);
    return (
      <TouchableOpacity
        style={[styles.cardIngrediente, isSelected && styles.cardSelecionado]}
        onPress={() => toggleIngrediente(item.nome)}
        activeOpacity={0.8}
      >
        <View style={styles.containerImagemIngrediente}>
          {item.imagem ? (
            <Image
              source={item.imagem}
              style={[styles.fotoIngrediente, isSelected && { opacity: 0.6 }]}
            />
          ) : (
            <Ionicons
              name={item.icone}
              size={32}
              color={isSelected ? "#ea1d2c" : "#888"}
            />
          )}
        </View>

        <Text
          style={[
            styles.textoIngrediente,
            isSelected && styles.textoSelecionado,
          ]}
        >
          {item.nome}
        </Text>

        {isSelected && (
          <View style={styles.badgeCheck}>
            <Ionicons name="checkmark" size={12} color="#fff" />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderSectionHeader = ({ section }) => {
    const aberta = categoriaAtiva === section.id;

    return (
      <View>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => selecionarCategoria(section.id)}
          activeOpacity={0.8}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={styles.sectionTitle}>{section.titulo}</Text>

            <Ionicons
              name={aberta ? "chevron-up" : "chevron-down"}
              size={20}
              color="#ea1d2c"
            />
          </View>
        </TouchableOpacity>

        {aberta && section.data.some((item) => item.tipo) && (
          <View style={{ paddingHorizontal: 10 }}>
            {Object.entries(agruparPorTipo(section.data)).map(
              ([tipo, itens]) => (
                <View key={tipo}>
                  <TouchableOpacity
                    style={styles.subCategoryHeader}
                    onPress={() => selecionarTipo(tipo)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.subtituloTipo}>
                      {nomesTipos[tipo] || tipo.toUpperCase()}
                    </Text>
                    <Ionicons
                      name={tipoAtivo === tipo ? "chevron-up" : "chevron-down"}
                      size={16}
                      color="#ea1d2c"
                    />
                  </TouchableOpacity>

                  {tipoAtivo === tipo && (
                    <View style={[styles.gridContainer, { marginTop: 10 }]}>
                      {itens.map((item) => (
                        <View key={item.id} style={{ width: "48%" }}>
                          {renderIngrediente({ item })}
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              ),
            )}
          </View>
        )}

        {aberta && !section.data.some((item) => item.tipo) && (
          <View
            style={[
              styles.gridContainer,
              { paddingHorizontal: 10, marginTop: 10 },
            ]}
          >
            {section.data.map((item) => (
              <View key={item.id} style={{ width: "48%" }}>
                {renderIngrediente({ item })}
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho de Navegação — sempre logado nesta tela */}
      <View style={styles.userStatusHeader}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <Text style={styles.loginHintText}>🍽️ RangoApp</Text>
          <View style={{ flexDirection: "row", gap: 8 }}>
            <TouchableOpacity
              onPress={() => navigation && navigation.navigate('Receitas')}
              style={[styles.loginButton, { backgroundColor: '#0f3460' }]}
            >
              <Ionicons name="book-outline" size={15} color="#fff" style={{ marginRight: 4 }} />
              <Text style={styles.loginButtonText}>Receitas</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation && navigation.navigate('Perfil')}
              style={styles.loginButton}
            >
              <Ionicons name="person-outline" size={15} color="#fff" style={{ marginRight: 4 }} />
              <Text style={styles.loginButtonText}>Perfil</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.titulo}>🥘 O que temos hoje?</Text>
            <Text style={styles.subtitulo}>
              Selecione seus ingredientes e deixe a mágica acontecer
            </Text>

            {/* Barra de Busca */}
            <View style={styles.searchContainer}>
              <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar ingrediente..."
                placeholderTextColor="#888"
                value={termoBusca}
                onChangeText={handleBusca}
              />
              {termoBusca.length > 0 && (
                <TouchableOpacity onPress={() => handleBusca("")}>
                  <Ionicons name="close-circle" size={20} color="#888" />
                </TouchableOpacity>
              )}
            </View>

            {/* Sugestões de Busca */}
            {sugestoesBusca.length > 0 && (
              <View style={styles.suggestionsList}>
                <ScrollView nestedScrollEnabled={true}>
                  {sugestoesBusca.map((ing) => (
                    <TouchableOpacity
                      key={ing.id}
                      style={styles.suggestionItem}
                      onPress={() => selecionarSugestao(ing)}
                    >
                      <Ionicons
                        name={ingredientesSelecionados.includes(ing.nome) ? "checkmark-circle" : "add-circle-outline"}
                        size={20}
                        color={ingredientesSelecionados.includes(ing.nome) ? "#ea1d2c" : "#888"}
                      />
                      <Text style={styles.suggestionText}>{ing.nome}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}

            {categorias.map((section) => (
              <View key={section.id}>
                {renderSectionHeader({ section })}
              </View>
            ))}

            {/* Lista de Selecionados (Chips) */}
            {ingredientesSelecionados.length > 0 && (
              <View>
                <Text style={styles.selectedTitle}>
                  📍 Selecionados ({ingredientesSelecionados.length}):
                </Text>
                <View style={styles.selectedChipsContainer}>
                  {ingredientesSelecionados.map((nome, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.chip}
                      onPress={() => toggleIngrediente(nome)}
                    >
                      <Text style={styles.chipText}>{nome}</Text>
                      <Ionicons name="close-circle" size={14} color="#ea1d2c" />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {/* Seleção de Tipo de Receita */}
            <Text style={styles.typeLabel}>Selecione o estilo:</Text>
            <View style={styles.typeSelectorContainer}>
              {["Casa", "Restaurante", "Dieta"].map((tipo) => (
                <TouchableOpacity
                  key={tipo}
                  style={[
                    styles.typeOption,
                    tipoReceita === tipo && styles.typeOptionSelected,
                  ]}
                  onPress={() => setTipoReceita(tipo)}
                >
                  <Text
                    style={[
                      styles.typeText,
                      tipoReceita === tipo && styles.typeTextSelected,
                    ]}
                  >
                    {tipo}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={styles.botaoMontar}
              onPress={buscarSugestao}
              disabled={carregando}
            >
              {carregando ? (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <ActivityIndicator color="#fff" style={{ marginRight: 10 }} />
                  <Text style={styles.loadingText}>Criando sua receita, aguarde...</Text>
                </View>
              ) : (
                <Text style={styles.botaoText}>Montar Refeição com IA</Text>
              )}
            </TouchableOpacity>

            {sugestao && (
              <View style={styles.resultadoContainer}>
                <Text style={styles.nomeReceita}>🍽️ {sugestao.nome}</Text>

                {sugestao.descricao && (
                  <Text style={styles.descricaoText}>{sugestao.descricao}</Text>
                )}

                {sugestao.classificacao && (
                  <View style={styles.classificacaoContainer}>
                    <View style={styles.classificacaoBadge}>
                      <Text style={styles.classificacaoText}>{sugestao.classificacao}</Text>
                    </View>
                  </View>
                )}

                {/* Info Pills: Tempo, Rendimento e Peso */}
                <View style={styles.infoContainer}>
                  <View style={styles.infoPill}>
                    <Ionicons name="time-outline" size={16} color="#ea1d2c" />
                    <Text style={styles.infoText}>{sugestao.tempoPreparo?.total || sugestao.tempoPreparo}</Text>
                  </View>
                  {sugestao.rendimento && (
                    <View style={styles.infoPill}>
                      <Ionicons name="restaurant-outline" size={16} color="#ea1d2c" />
                      <Text style={styles.infoText}>{sugestao.rendimento}</Text>
                    </View>
                  )}
                  {sugestao.pesoTotal && (
                    <View style={styles.infoPill}>
                      <Ionicons name="scale-outline" size={16} color="#ea1d2c" />
                      <Text style={styles.infoText}>{sugestao.pesoTotal}</Text>
                    </View>
                  )}
                </View>

                {faltando.length > 0 && (
                  <Text style={styles.faltandoText}>
                    ⚠️ Sugestão extra: {faltando.join(", ")}.
                  </Text>
                )}

                {/* Lista de Ingredientes e Quantidades */}
                <Text style={styles.ingredientesTitle}>🛒 Ingredientes:</Text>
                {sugestao.ingredientes &&
                  sugestao.ingredientes.map((ing, index) => (
                    <View key={index} style={styles.ingredienteItem}>
                      <View style={styles.ingredienteBullet} />
                      <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={styles.ingredienteTexto}>{ing.item}</Text>
                        <Text style={styles.ingredienteQuantidade}>{ing.quantidade}</Text>
                      </View>
                    </View>
                  ))}

                {/* Modo de Preparo (Array) */}
                <Text style={styles.preparoTitle}>🍳 Modo de preparo:</Text>
                {Array.isArray(sugestao.modoPreparo) ? (
                  sugestao.modoPreparo.map((passo, index) => (
                    <View key={index} style={styles.passoItem}>
                      <View style={styles.passoNumeroContainer}>
                        <Text style={styles.passoNumero}>{index + 1}</Text>
                      </View>
                      <Text style={styles.passoTexto}>{passo}</Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.preparoText}>{sugestao.modoPreparo}</Text>
                )}

                {/* Dicas do Chef (Array ou String) */}
                {sugestao.dicasDoChef && (
                  <View>
                    <Text style={styles.preparoTitle}>💡 Dicas do Chef:</Text>
                    {Array.isArray(sugestao.dicasDoChef) ? (
                      sugestao.dicasDoChef.map((dica, index) => (
                        <Text key={index} style={styles.dicaText}>• {dica}</Text>
                      ))
                    ) : (
                      <Text style={styles.dicaText}>💡 {sugestao.dicasDoChef}</Text>
                    )}
                  </View>
                )}

                {/* Substituições */}
                {sugestao.substituicoes && Array.isArray(sugestao.substituicoes) && (
                  <View>
                    <Text style={styles.substituicaoTitle}>🔄 Possíveis Substituições:</Text>
                    {sugestao.substituicoes.map((sub, index) => (
                      <View key={index} style={styles.substituicaoItem}>
                        <Text style={styles.substituicaoText}>{sub}</Text>
                      </View>
                    ))}
                  </View>
                )}

                {/* Informação Nutricional */}
                {sugestao.informacaoNutricional && (
                  <View>
                    <Text style={styles.beneficioTitle}>🔥 Informação Nutricional (por 100g):</Text>
                    <View style={styles.nutricionalContainer}>
                      <View style={styles.nutricionalItem}>
                        <Text style={styles.nutricionalValor}>{sugestao.informacaoNutricional.calorias}</Text>
                        <Text style={styles.nutricionalLabel}>Kcal</Text>
                      </View>
                      <View style={styles.nutricionalItem}>
                        <Text style={styles.nutricionalValor}>{sugestao.informacaoNutricional.proteinas}</Text>
                        <Text style={styles.nutricionalLabel}>Prot</Text>
                      </View>
                      <View style={styles.nutricionalItem}>
                        <Text style={styles.nutricionalValor}>{sugestao.informacaoNutricional.carboidratos}</Text>
                        <Text style={styles.nutricionalLabel}>Carb</Text>
                      </View>
                      <View style={styles.nutricionalItem}>
                        <Text style={styles.nutricionalValor}>{sugestao.informacaoNutricional.gorduras}</Text>
                        <Text style={styles.nutricionalLabel}>Gord</Text>
                      </View>
                    </View>

                    <View style={[styles.nutricionalContainer, { marginTop: 10, backgroundColor: "transparent", borderStyle: "dashed" }]}>
                      <View style={styles.nutricionalItem}>
                        <Text style={styles.nutricionalValor}>{sugestao.informacaoNutricional.fibras || "N/A"}</Text>
                        <Text style={styles.nutricionalLabel}>Fibras</Text>
                      </View>
                      <View style={styles.nutricionalItem}>
                        <Text style={styles.nutricionalValor}>{sugestao.informacaoNutricional.sodio || "N/A"}</Text>
                        <Text style={styles.nutricionalLabel}>Sódio</Text>
                      </View>
                    </View>
                  </View>
                )}

                {/* Botões pós refeição */}
                <View style={{ marginTop: 25 }}>
                  {/* Botão de Salvar no Caderno */}
                  <TouchableOpacity
                    style={[styles.botaoSalvarGrande, salvando && { opacity: 0.7 }]}
                    onPress={salvarReceita}
                    disabled={salvando}
                  >
                    {salvando ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <>
                        <Ionicons name="save-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
                        <Text style={styles.botaoText}>Salvar Receita</Text>
                      </>
                    )}
                  </TouchableOpacity>

                  <View style={styles.containerBotoesPosRefeicao}>
                    <TouchableOpacity
                      style={[styles.botaoAcaoPos, styles.botaoTentarOutra]}
                      onPress={buscarSugestao}
                      disabled={carregando}
                    >
                      <Ionicons
                        name="shuffle"
                        size={20}
                        color="#fff"
                        style={{ marginRight: 6 }}
                      />
                      <Text style={styles.botaoTextPequeno}>Tentar Outra</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.botaoAcaoPos, styles.botaoMudarTudo]}
                      onPress={() => {
                        setSugestao(null);
                        setIngredientesSelecionados([]);
                        setFaltando([]);
                      }}
                    >
                      <Ionicons
                        name="list"
                        size={20}
                        color="#fff"
                        style={{ marginRight: 6 }}
                      />
                      <Text style={styles.botaoTextPequeno}>Mudar Tudo</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
      </ScrollView>
    </SafeAreaView>
  );
}
