import React, { useState, useEffect, useCallback } from 'react';
import { 
  Text, View, StyleSheet, FlatList, Image, ActivityIndicator, 
  TouchableOpacity, ScrollView, Alert, SafeAreaView, SectionList 
} from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
import { Ionicons } from '@expo/vector-icons';

const GEMINI_API_KEY = 'AIzaSyDR97WnVydUpfUiAjIpEFgMj1gnlIPZuKo';

SplashScreen.preventAutoHideAsync();

// ========== CATÁLOGO DE INGREDIENTES POR CATEGORIA ==========
const categorias = [
  {
  id: 'carnes',
  titulo: '🥩 CARNES',
  data: [

    // 🐔 FRANGO
    { 
      id: 'c1', nome: 'Peito de Frango', icone: 'fast-food', tipo: 'frango',
      nutricional: { calorias: 165, proteina: 31, carboidrato: 0, gordura: 3.6 }
    },
    { 
      id: 'c2', nome: 'Coxa de Frango', icone: 'fast-food', tipo: 'frango',
      nutricional: { calorias: 209, proteina: 26, carboidrato: 0, gordura: 10.9 }
    },
    { 
      id: 'c3', nome: 'Sobrecoxa de frango', icone: 'fast-food', tipo: 'frango',
      nutricional: { calorias: 232, proteina: 25, carboidrato: 0, gordura: 15 }
    },
    { 
      id: 'c4', nome: 'Frango inteiro', icone: 'fast-food', tipo: 'frango',
      nutricional: { calorias: 239, proteina: 27, carboidrato: 0, gordura: 14 }
    },
    { 
      id: 'c5', nome: 'Frango desfiado', icone: 'fast-food', tipo: 'frango',
      nutricional: { calorias: 165, proteina: 31, carboidrato: 0, gordura: 3.6 }
    },

    // 🐄 BOI
    { 
      id: 'c6', nome: 'Filé Mignon', icone: 'fast-food', tipo: 'boi',
      nutricional: { calorias: 250, proteina: 26, carboidrato: 0, gordura: 17 }
    },
    { 
      id: 'c7', nome: 'Alcatra', icone: 'fast-food', tipo: 'boi',
      nutricional: { calorias: 217, proteina: 29, carboidrato: 0, gordura: 11 }
    },
    { 
      id: 'c8', nome: 'Patinho', icone: 'fast-food', tipo: 'boi',
      nutricional: { calorias: 143, proteina: 26, carboidrato: 0, gordura: 4.5 }
    },
    { 
      id: 'c9', nome: 'Contra-filé', icone: 'fast-food', tipo: 'boi',
      nutricional: { calorias: 271, proteina: 25, carboidrato: 0, gordura: 19 }
    },
    { 
      id: 'c10', nome: 'Picanha', icone: 'fast-food', tipo: 'boi',
      nutricional: { calorias: 290, proteina: 24, carboidrato: 0, gordura: 22 }
    },
    { 
      id: 'c11', nome: 'Músculo', icone: 'fast-food', tipo: 'boi',
      nutricional: { calorias: 212, proteina: 30, carboidrato: 0, gordura: 9 }
    },
    { 
      id: 'c12', nome: 'Costela bovina', icone: 'fast-food', tipo: 'boi',
      nutricional: { calorias: 291, proteina: 24, carboidrato: 0, gordura: 22 }
    },
    { 
      id: 'c13', nome: 'Carne moída', icone: 'fast-food', tipo: 'boi',
      nutricional: { calorias: 250, proteina: 26, carboidrato: 0, gordura: 17 }
    },

    // 🐖 PORCO
    { 
      id: 'c14', nome: 'Lombo suíno', icone: 'fast-food', tipo: 'porco',
      nutricional: { calorias: 242, proteina: 27, carboidrato: 0, gordura: 14 }
    },
    { 
      id: 'c15', nome: 'Costelinha suína', icone: 'fast-food', tipo: 'porco',
      nutricional: { calorias: 321, proteina: 26, carboidrato: 0, gordura: 24 }
    },
    { 
      id: 'c16', nome: 'Bacon', icone: 'fast-food', tipo: 'porco',
      nutricional: { calorias: 541, proteina: 37, carboidrato: 1.4, gordura: 42 }
    },

    // 🐟 PEIXES
    { 
      id: 'c17', nome: 'Salmão', icone: 'fish', tipo: 'peixe',
      nutricional: { calorias: 208, proteina: 20, carboidrato: 0, gordura: 13 }
    },
    { 
      id: 'c18', nome: 'Tilápia', icone: 'fish', tipo: 'peixe',
      nutricional: { calorias: 128, proteina: 26, carboidrato: 0, gordura: 2.7 }
    },
    { 
      id: 'c19', nome: 'Atum', icone: 'fish', tipo: 'peixe',
      nutricional: { calorias: 132, proteina: 28, carboidrato: 0, gordura: 1 }
    },
    { 
      id: 'c20', nome: 'Sardinha', icone: 'fish', tipo: 'peixe',
      nutricional: { calorias: 208, proteina: 25, carboidrato: 0, gordura: 11 }
    },
    { 
      id: 'c21', nome: 'Merluza', icone: 'fish', tipo: 'peixe',
      nutricional: { calorias: 90, proteina: 18, carboidrato: 0, gordura: 1 }
    },
    { 
      id: 'c22', nome: 'Bacalhau', icone: 'fish', tipo: 'peixe',
      nutricional: { calorias: 105, proteina: 23, carboidrato: 0, gordura: 0.9 }
    },
    { 
      id: 'c23', nome: 'Camarão', icone: 'fish', tipo: 'peixe',
      nutricional: { calorias: 99, proteina: 24, carboidrato: 0.2, gordura: 0.3 }
    },
    { 
      id: 'c24', nome: 'Peixe branco', icone: 'fish', tipo: 'peixe',
      nutricional: { calorias: 120, proteina: 22, carboidrato: 0, gordura: 2 }
    },
  ],
},

  {
  id: 'saladas',
  titulo: '🥗 SALADAS, VERDURAS & LEGUMES',
  data: [

    // 🥬 FOLHAS
    { 
      id: 's1', nome: 'Alface', icone: 'leaf', tipo: 'folha',
      nutricional: { calorias: 15, proteina: 1.4, carboidrato: 2.9, gordura: 0.2 }
    },
    { 
      id: 's2', nome: 'Rúcula', icone: 'leaf', tipo: 'folha',
      nutricional: { calorias: 25, proteina: 2.6, carboidrato: 3.7, gordura: 0.7 }
    },
    { 
      id: 's3', nome: 'Agrião', icone: 'leaf', tipo: 'folha',
      nutricional: { calorias: 11, proteina: 2.3, carboidrato: 1.3, gordura: 0.1 }
    },
    { 
      id: 's4', nome: 'Espinafre', icone: 'leaf', tipo: 'folha',
      nutricional: { calorias: 23, proteina: 2.9, carboidrato: 3.6, gordura: 0.4 }
    },
    { 
      id: 's5', nome: 'Couve', icone: 'leaf', tipo: 'folha',
      nutricional: { calorias: 49, proteina: 4.3, carboidrato: 8.8, gordura: 0.9 }
    },
    { 
      id: 's6', nome: 'Acelga', icone: 'leaf', tipo: 'folha',
      nutricional: { calorias: 19, proteina: 1.8, carboidrato: 3.7, gordura: 0.2 }
    },
    { 
      id: 's7', nome: 'Chicória', icone: 'leaf', tipo: 'folha',
      nutricional: { calorias: 23, proteina: 1.7, carboidrato: 4.7, gordura: 0.3 }
    },
    { 
      id: 's8', nome: 'Escarola', icone: 'leaf', tipo: 'folha',
      nutricional: { calorias: 17, proteina: 1.3, carboidrato: 3.4, gordura: 0.2 }
    },
    { 
      id: 's9', nome: 'Almeirão', icone: 'leaf', tipo: 'folha',
      nutricional: { calorias: 28, proteina: 1.7, carboidrato: 5.9, gordura: 0.2 }
    },

    // 🥒 CRUS
    { 
      id: 's10', nome: 'Tomate', icone: 'nutrition', tipo: 'cru',
      nutricional: { calorias: 18, proteina: 0.9, carboidrato: 3.9, gordura: 0.2 }
    },
    { 
      id: 's11', nome: 'Pepino', icone: 'nutrition', tipo: 'cru',
      nutricional: { calorias: 16, proteina: 0.7, carboidrato: 3.6, gordura: 0.1 }
    },
    { 
      id: 's12', nome: 'Cenoura', icone: 'nutrition', tipo: 'cru',
      nutricional: { calorias: 41, proteina: 0.9, carboidrato: 9.6, gordura: 0.2 }
    },
    { 
      id: 's13', nome: 'Beterraba', icone: 'nutrition', tipo: 'cru',
      nutricional: { calorias: 43, proteina: 1.6, carboidrato: 10, gordura: 0.2 }
    },
    { 
      id: 's14', nome: 'Rabanete', icone: 'nutrition', tipo: 'cru',
      nutricional: { calorias: 16, proteina: 0.7, carboidrato: 3.4, gordura: 0.1 }
    },
    { 
      id: 's15', nome: 'Pimentão', icone: 'nutrition', tipo: 'cru',
      nutricional: { calorias: 31, proteina: 1, carboidrato: 6, gordura: 0.3 }
    },

    // 🍲 COZIDOS
    { 
      id: 's16', nome: 'Brócolis', icone: 'leaf', tipo: 'cozido',
      nutricional: { calorias: 35, proteina: 2.4, carboidrato: 7.2, gordura: 0.4 }
    },
    { 
      id: 's17', nome: 'Couve-flor', icone: 'leaf', tipo: 'cozido',
      nutricional: { calorias: 25, proteina: 1.9, carboidrato: 5, gordura: 0.3 }
    },
    { 
      id: 's18', nome: 'Abobrinha', icone: 'nutrition', tipo: 'cozido',
      nutricional: { calorias: 17, proteina: 1.2, carboidrato: 3.1, gordura: 0.3 }
    },
    { 
      id: 's19', nome: 'Berinjela', icone: 'nutrition', tipo: 'cozido',
      nutricional: { calorias: 25, proteina: 1, carboidrato: 6, gordura: 0.2 }
    },
    { 
      id: 's20', nome: 'Vagem', icone: 'nutrition', tipo: 'cozido',
      nutricional: { calorias: 35, proteina: 1.9, carboidrato: 7.9, gordura: 0.1 }
    },

    // 🥔 BASE
    { 
      id: 's23', nome: 'Mandioca', icone: 'cafe', tipo: 'base_saladas',
      nutricional: { calorias: 160, proteina: 1.4, carboidrato: 38, gordura: 0.3 }
    },
  ],
},

  {
  id: 'carboidratos',
  titulo: '🍚 CARBOIDRATOS',
  data: [

    // 🍚 BASE PRINCIPAL (cozidos/preparados)
    { 
      id: 'cb1', nome: 'Arroz integral', icone: 'restaurant', tipo: 'base',
      nutricional: { calorias: 123, proteina: 2.6, carboidrato: 25.6, gordura: 1 }
    },
    { 
      id: 'cb2', nome: 'Arroz branco', icone: 'restaurant', tipo: 'base',
      nutricional: { calorias: 130, proteina: 2.4, carboidrato: 28, gordura: 0.3 }
    },
    { 
      id: 'cb5', nome: 'Macarrão integral', icone: 'restaurant', tipo: 'base',
      nutricional: { calorias: 124, proteina: 5, carboidrato: 25, gordura: 1.1 }
    },
    { 
      id: 'cb6', nome: 'Macarrão comum', icone: 'restaurant', tipo: 'base',
      nutricional: { calorias: 131, proteina: 5, carboidrato: 25, gordura: 1.1 }
    },
    { 
      id: 'cb9', nome: 'Cuscuz', icone: 'restaurant', tipo: 'base',
      nutricional: { calorias: 112, proteina: 3.8, carboidrato: 23, gordura: 0.5 }
    },
    { 
      id: 'cb10', nome: 'Pão branco', icone: 'restaurant', tipo: 'base',
      nutricional: { calorias: 265, proteina: 9, carboidrato: 49, gordura: 3.2 }
    },
    { 
      id: 'cb11', nome: 'Pão integral', icone: 'restaurant', tipo: 'base',
      nutricional: { calorias: 247, proteina: 13, carboidrato: 41, gordura: 4.2 }
    },

    // 🥔 TUBÉRCULOS (cozidos)
    { 
      id: 'cb3', nome: 'Batata doce', icone: 'cafe', tipo: 'tuberculo',
      nutricional: { calorias: 86, proteina: 1.6, carboidrato: 20, gordura: 0.1 }
    },
    { 
      id: 'cb4', nome: 'Batata inglesa', icone: 'cafe', tipo: 'tuberculo',
      nutricional: { calorias: 87, proteina: 1.9, carboidrato: 20, gordura: 0.1 }
    },
    { 
      id: 'cb12', nome: 'Inhame', icone: 'cafe', tipo: 'tuberculo',
      nutricional: { calorias: 118, proteina: 1.5, carboidrato: 28, gordura: 0.2 }
    },
    { 
      id: 'cb13', nome: 'Cará', icone: 'cafe', tipo: 'tuberculo',
      nutricional: { calorias: 97, proteina: 2.1, carboidrato: 23, gordura: 0.2 }
    },

    // 🌾 FUNCIONAIS / INTEGRAIS
    { 
      id: 'cb7', nome: 'Quinoa', icone: 'nutrition', tipo: 'funcional',
      nutricional: { calorias: 120, proteina: 4.4, carboidrato: 21, gordura: 1.9 }
    },
    { 
      id: 'cb8', nome: 'Aveia', icone: 'nutrition', tipo: 'funcional',
      nutricional: { calorias: 389, proteina: 17, carboidrato: 66, gordura: 7 }
    },
    { 
      id: 'cb14', nome: 'Granola', icone: 'nutrition', tipo: 'funcional',
      nutricional: { calorias: 471, proteina: 10, carboidrato: 64, gordura: 20 }
    },
  ],
},

 {
  id: 'gorduras',
  titulo: '🥑 GORDURAS SAUDÁVEIS',
  data: [

    // 🥑 NATURAIS
    { 
      id: 'g1', nome: 'Abacate', icone: 'nutrition', tipo: 'natural',
      nutricional: { calorias: 160, proteina: 2, carboidrato: 9, gordura: 15 }
    },
    { 
      id: 'g2', nome: 'Azeitona', icone: 'nutrition', tipo: 'natural',
      nutricional: { calorias: 145, proteina: 1, carboidrato: 4, gordura: 15 }
    },
    { 
      id: 'g3', nome: 'Coco', icone: 'nutrition', tipo: 'natural',
      nutricional: { calorias: 354, proteina: 3.3, carboidrato: 15, gordura: 33 }
    },

    // 🫒 ÓLEOS
    { 
      id: 'g4', nome: 'Azeite de oliva', icone: 'restaurant', tipo: 'oleo',
      nutricional: { calorias: 884, proteina: 0, carboidrato: 0, gordura: 100 }
    },
    { 
      id: 'g5', nome: 'Óleo de coco', icone: 'restaurant', tipo: 'oleo',
      nutricional: { calorias: 892, proteina: 0, carboidrato: 0, gordura: 100 }
    },
    { 
      id: 'g6', nome: 'Óleo de girassol', icone: 'restaurant', tipo: 'oleo',
      nutricional: { calorias: 884, proteina: 0, carboidrato: 0, gordura: 100 }
    },

    // 🥜 OLEAGINOSAS
    { 
      id: 'g7', nome: 'Castanha de caju', icone: 'nutrition', tipo: 'oleaginosa',
      nutricional: { calorias: 553, proteina: 18, carboidrato: 30, gordura: 44 }
    },
    { 
      id: 'g8', nome: 'Castanha-do-pará', icone: 'nutrition', tipo: 'oleaginosa',
      nutricional: { calorias: 656, proteina: 14, carboidrato: 12, gordura: 66 }
    },
    { 
      id: 'g9', nome: 'Amêndoas', icone: 'nutrition', tipo: 'oleaginosa',
      nutricional: { calorias: 579, proteina: 21, carboidrato: 22, gordura: 50 }
    },
    { 
      id: 'g10', nome: 'Nozes', icone: 'nutrition', tipo: 'oleaginosa',
      nutricional: { calorias: 654, proteina: 15, carboidrato: 14, gordura: 65 }
    },
    { 
      id: 'g11', nome: 'Amendoim', icone: 'nutrition', tipo: 'oleaginosa',
      nutricional: { calorias: 567, proteina: 26, carboidrato: 16, gordura: 49 }
    },

    // 🧈 PASTAS
    { 
      id: 'g12', nome: 'Pasta de amendoim', icone: 'nutrition', tipo: 'pasta',
      nutricional: { calorias: 588, proteina: 25, carboidrato: 20, gordura: 50 }
    },
    { 
      id: 'g13', nome: 'Pasta de amêndoas', icone: 'nutrition', tipo: 'pasta',
      nutricional: { calorias: 614, proteina: 21, carboidrato: 19, gordura: 55 }
    },

    // 🧀 GORDURAS ANIMAIS
    { 
      id: 'g14', nome: 'Manteiga', icone: 'restaurant', tipo: 'animal',
      nutricional: { calorias: 717, proteina: 1, carboidrato: 0, gordura: 81 }
    },
    { 
      id: 'g15', nome: 'Banha de porco', icone: 'restaurant', tipo: 'animal',
      nutricional: { calorias: 902, proteina: 0, carboidrato: 0, gordura: 100 }
    },

    // 🌱 SEMENTES
    { 
      id: 'g16', nome: 'Chia', icone: 'nutrition', tipo: 'semente',
      nutricional: { calorias: 486, proteina: 17, carboidrato: 42, gordura: 31 }
    },
    { 
      id: 'g17', nome: 'Linhaça', icone: 'nutrition', tipo: 'semente',
      nutricional: { calorias: 534, proteina: 18, carboidrato: 29, gordura: 42 }
    },
    { 
      id: 'g18', nome: 'Gergelim', icone: 'nutrition', tipo: 'semente',
      nutricional: { calorias: 573, proteina: 17, carboidrato: 23, gordura: 50 }
    },

  ],
},

  {
  id: 'ovos',
  titulo: '🥚 PROTEÍNAS ADICIONAIS',
  data: [
    { 
      id: 'o1', nome: 'Ovo inteiro', icone: 'egg',
      nutricional: { calorias: 155, proteina: 13, carboidrato: 1.1, gordura: 11 }
    },
    { 
      id: 'o2', nome: 'Clara de ovo', icone: 'egg',
      nutricional: { calorias: 52, proteina: 11, carboidrato: 0.7, gordura: 0.2 }
    },

    // 🥛 LÁCTEOS PROTEICOS
    { 
      id: 'o3', nome: 'Iogurte grego', icone: 'cafe',
      nutricional: { calorias: 97, proteina: 10, carboidrato: 3.6, gordura: 5 }
    },
    { 
      id: 'o4', nome: 'Iogurte natural', icone: 'cafe',
      nutricional: { calorias: 61, proteina: 3.5, carboidrato: 4.7, gordura: 3.3 }
    },
    { 
      id: 'o5', nome: 'Leite integral', icone: 'cafe',
      nutricional: { calorias: 61, proteina: 3.2, carboidrato: 4.8, gordura: 3.3 }
    },
    { 
      id: 'o6', nome: 'Leite desnatado', icone: 'cafe',
      nutricional: { calorias: 34, proteina: 3.4, carboidrato: 5, gordura: 0.1 }
    },

    // 🧀 QUEIJOS
    { 
      id: 'o7', nome: 'Queijo muçarela', icone: 'restaurant',
      nutricional: { calorias: 280, proteina: 22, carboidrato: 2, gordura: 22 }
    },
    { 
      id: 'o8', nome: 'Queijo parmesão', icone: 'restaurant',
      nutricional: { calorias: 431, proteina: 36, carboidrato: 4, gordura: 29 }
    },
    { 
      id: 'o9', nome: 'Queijo minas', icone: 'restaurant',
      nutricional: { calorias: 264, proteina: 17, carboidrato: 3, gordura: 21 }
    },
    { 
      id: 'o10', nome: 'Queijo cottage', icone: 'restaurant',
      nutricional: { calorias: 98, proteina: 11, carboidrato: 3.4, gordura: 4.3 }
    },

    // 💪 SUPLEMENTOS
    { 
      id: 'o11', nome: 'Whey Protein', icone: 'barbell',
      nutricional: { calorias: 120, proteina: 24, carboidrato: 3, gordura: 1.5 }
    },
    { 
      id: 'o12', nome: 'Caseína', icone: 'barbell',
      nutricional: { calorias: 110, proteina: 24, carboidrato: 3, gordura: 1 }
    },

    // 🌱 PROTEÍNAS VEGETAIS
    { 
      id: 'o13', nome: 'Tofu', icone: 'leaf',
      nutricional: { calorias: 76, proteina: 8, carboidrato: 1.9, gordura: 4.8 }
    },
    { 
      id: 'o14', nome: 'Tempeh', icone: 'leaf',
      nutricional: { calorias: 193, proteina: 20, carboidrato: 9, gordura: 11 }
    },
    { 
      id: 'o15', nome: 'Proteína de soja', icone: 'leaf',
      nutricional: { calorias: 173, proteina: 17, carboidrato: 9, gordura: 9 }
    },


  ],
},

  {
  id: 'temperos',
  titulo: '🧂 TEMPEROS & CONDIMENTOS',
  data: [

    // 🧄 BASES
    { 
      id: 't1', nome: 'Alho', icone: 'nutrition',
      nutricional: { calorias: 149, proteina: 6.4, carboidrato: 33, gordura: 0.5 }
    },
    { 
      id: 't2', nome: 'Cebola', icone: 'nutrition',
      nutricional: { calorias: 40, proteina: 1.1, carboidrato: 9.3, gordura: 0.1 }
    },

    // 🧂 ESSENCIAIS
    { 
      id: 't3', nome: 'Sal', icone: 'restaurant',
      nutricional: { calorias: 0, proteina: 0, carboidrato: 0, gordura: 0 }
    },
    { 
      id: 't4', nome: 'Pimenta-do-reino', icone: 'flame',
      nutricional: { calorias: 251, proteina: 10, carboidrato: 64, gordura: 3.3 }
    },

    // 🌶️ ESPECIARIAS
    { 
      id: 't5', nome: 'Páprica', icone: 'flame',
      nutricional: { calorias: 282, proteina: 14, carboidrato: 54, gordura: 13 }
    },
    { 
      id: 't6', nome: 'Orégano', icone: 'leaf',
      nutricional: { calorias: 265, proteina: 9, carboidrato: 69, gordura: 4 }
    },

    // 🌿 VERDES
    { 
      id: 't7', nome: 'Salsinha', icone: 'leaf',
      nutricional: { calorias: 36, proteina: 3, carboidrato: 6, gordura: 0.8 }
    },
    { 
      id: 't8', nome: 'Cebolinha', icone: 'leaf',
      nutricional: { calorias: 30, proteina: 3.3, carboidrato: 4.4, gordura: 0.7 }
    },

    // 🧃 MOLHOS
    { 
      id: 't9', nome: 'Maionese', icone: 'restaurant',
      nutricional: { calorias: 680, proteina: 1, carboidrato: 1, gordura: 75 }
    },
    { 
      id: 't10', nome: 'Maionese verde', icone: 'restaurant',
      nutricional: { calorias: 620, proteina: 2, carboidrato: 3, gordura: 68 }
    },
    { 
      id: 't11', nome: 'Ketchup', icone: 'restaurant',
      nutricional: { calorias: 112, proteina: 1.3, carboidrato: 26, gordura: 0.2 }
    },
    { 
      id: 't12', nome: 'Mostarda', icone: 'restaurant',
      nutricional: { calorias: 66, proteina: 4.4, carboidrato: 5.8, gordura: 4.4 }
    },
    { 
      id: 't13', nome: 'Molho barbecue', icone: 'restaurant',
      nutricional: { calorias: 172, proteina: 1, carboidrato: 40, gordura: 0.5 }
    },
    { 
      id: 't14', nome: 'Shoyu', icone: 'restaurant',
      nutricional: { calorias: 53, proteina: 8, carboidrato: 5, gordura: 0.1 }
    },

  ],
},

  {
  id: 'frutas',
  titulo: '🍎 FRUTAS',
  data: [

    // 🍌 COMUNS
    { 
      id: 'f1', nome: 'Banana', icone: 'nutrition', tipo: 'comum',
      nutricional: { calorias: 89, proteina: 1.1, carboidrato: 23, gordura: 0.3 }
    },
    { 
      id: 'f2', nome: 'Maçã', icone: 'nutrition', tipo: 'comum',
      nutricional: { calorias: 52, proteina: 0.3, carboidrato: 14, gordura: 0.2 }
    },
    { 
      id: 'f3', nome: 'Laranja', icone: 'nutrition', tipo: 'comum',
      nutricional: { calorias: 47, proteina: 0.9, carboidrato: 12, gordura: 0.1 }
    },
    { 
      id: 'f4', nome: 'Pera', icone: 'nutrition', tipo: 'comum',
      nutricional: { calorias: 57, proteina: 0.4, carboidrato: 15, gordura: 0.1 }
    },
    { 
      id: 'f5', nome: 'Uva', icone: 'nutrition', tipo: 'comum',
      nutricional: { calorias: 69, proteina: 0.7, carboidrato: 18, gordura: 0.2 }
    },

    // 🍓 VERMELHAS
    { 
      id: 'f6', nome: 'Morango', icone: 'nutrition', tipo: 'vermelha',
      nutricional: { calorias: 32, proteina: 0.7, carboidrato: 7.7, gordura: 0.3 }
    },
    { 
      id: 'f7', nome: 'Amora', icone: 'nutrition', tipo: 'vermelha',
      nutricional: { calorias: 43, proteina: 1.4, carboidrato: 10, gordura: 0.5 }
    },
    { 
      id: 'f8', nome: 'Framboesa', icone: 'nutrition', tipo: 'vermelha',
      nutricional: { calorias: 52, proteina: 1.2, carboidrato: 12, gordura: 0.7 }
    },

    // 🍍 TROPICAIS
    { 
      id: 'f9', nome: 'Abacaxi', icone: 'nutrition', tipo: 'tropical',
      nutricional: { calorias: 50, proteina: 0.5, carboidrato: 13, gordura: 0.1 }
    },
    { 
      id: 'f10', nome: 'Manga', icone: 'nutrition', tipo: 'tropical',
      nutricional: { calorias: 60, proteina: 0.8, carboidrato: 15, gordura: 0.4 }
    },
    { 
      id: 'f11', nome: 'Mamão', icone: 'nutrition', tipo: 'tropical',
      nutricional: { calorias: 43, proteina: 0.5, carboidrato: 11, gordura: 0.3 }
    },
    { 
      id: 'f12', nome: 'Maracujá', icone: 'nutrition', tipo: 'tropical',
      nutricional: { calorias: 97, proteina: 2.2, carboidrato: 23, gordura: 0.7 }
    },
    { 
      id: 'f13', nome: 'Melancia', icone: 'nutrition', tipo: 'tropical',
      nutricional: { calorias: 30, proteina: 0.6, carboidrato: 8, gordura: 0.2 }
    },
    { 
      id: 'f14', nome: 'Melão', icone: 'nutrition', tipo: 'tropical',
      nutricional: { calorias: 34, proteina: 0.8, carboidrato: 8, gordura: 0.2 }
    },

    // 🍋 CÍTRICAS
    { 
      id: 'f15', nome: 'Limão', icone: 'nutrition', tipo: 'citrica',
      nutricional: { calorias: 29, proteina: 1.1, carboidrato: 9, gordura: 0.3 }
    },
    { 
      id: 'f16', nome: 'Tangerina', icone: 'nutrition', tipo: 'citrica',
      nutricional: { calorias: 53, proteina: 0.8, carboidrato: 13, gordura: 0.3 }
    },

    // 🥑 ESPECIAIS
    { 
      id: 'f17', nome: 'Kiwi', icone: 'nutrition', tipo: 'especial',
      nutricional: { calorias: 61, proteina: 1.1, carboidrato: 15, gordura: 0.5 }
    },
    { 
      id: 'f18', nome: 'Ameixa', icone: 'nutrition', tipo: 'especial',
      nutricional: { calorias: 46, proteina: 0.7, carboidrato: 11, gordura: 0.3 }
    },
    { 
      id: 'f19', nome: 'Pêssego', icone: 'nutrition', tipo: 'especial',
      nutricional: { calorias: 39, proteina: 0.9, carboidrato: 10, gordura: 0.3 }
    },

  ],
}

];

// ========== RECEITAS BASEADAS NOS INGREDIENTES ==========
export const receitasBase = [
  // ======================================
  // 💪 EMAGRECIMENTO & HIPERTROFIA (FITNESS)
  // ======================================
  {
    id: 'r1',
    nome: 'Frango com Arroz Integral Funcional',
    ingredientesNecessarios: ['Peito de Frango', 'Arroz integral', 'Brócolis'],
    modoPreparo: 'Grelhe o frango temperado com sal e alho. Cozinhe o arroz integral e refogue o brócolis levemente no vapor.',
    beneficio: 'Base perfeita de dieta. Proteína limpa e lenta.',
  },
  {
    id: 'r2',
    nome: 'Omelete de Espinafre com Batata Doce',
    ingredientesNecessarios: ['Ovo inteiro', 'Espinafre', 'Batata doce'],
    modoPreparo: 'Bata os ovos, coloque folhas rasgadas de espinafre e faça a omelete. Acompanhe com batata doce cozida.',
    beneficio: 'Refeição pós-treino completa com carboidrato de baixo índice glicêmico.',
  },
  {
    id: 'r3',
    nome: 'Salada Anabólica de Quinoa e Frango',
    ingredientesNecessarios: ['Quinoa', 'Frango desfiado', 'Tomate', 'Limão'],
    modoPreparo: 'Cozinhe a quinoa, misture o frango cozido desfiado, pique o tomate e tempere com limão.',
    beneficio: 'Refrescante e super proteico.',
  },
  {
    id: 'r4',
    nome: 'Tigela Proteica de Abacate e Ovo',
    ingredientesNecessarios: ['Abacate', 'Ovo inteiro', 'Espinafre'],
    modoPreparo: 'Amasse abacate, adicione ovo pochê e espinafre salteado no azeite.',
    beneficio: 'Gorduras omega 9 excelentes para a queima de flancos.',
  },
  {
    id: 'r5',
    nome: 'Salmão com Quinoa e Brócolis',
    ingredientesNecessarios: ['Salmão', 'Quinoa', 'Brócolis'],
    modoPreparo: 'Asse a posta de salmão ao lado do vegetal limpo e sirva com quinoa temperada.',
    beneficio: 'Ação anti-inflamatória forte para recuperação pós musculação pesada.',
  },
  {
    id: 'r8',
    nome: 'Escondidinho Maromba',
    ingredientesNecessarios: ['Batata doce', 'Frango desfiado', 'Cebola', 'Alho'],
    modoPreparo: 'Recheie frango em um fundo de panela assadeira e amasse o purê da batata por cima pra dourar no forno.',
    beneficio: 'Massa saborosa pra enganar a dieta saciando absurdamente.',
  },
  {
    id: 'r9',
    nome: 'Mega Vitamina Ganho de Massa',
    ingredientesNecessarios: ['Banana', 'Whey Protein', 'Aveia', 'Leite desnatado'],
    modoPreparo: 'Bata intensamente estes super carboidratos com o leite e a proteína até liquefazer completamente.',
    beneficio: 'A bomba do "bulking". Fácil digestão e ultra densidade.',
  },
  {
    id: 'r10',
    nome: 'Crepioca de Patinho Moído',
    ingredientesNecessarios: ['Ovo inteiro', 'Carne moída', 'Mandioca'],
    modoPreparo: 'Pegue goma hidratada de mandioca moida com ovo, jogue na panela quente para virar disco flexível. Recheie da carne.',
    beneficio: 'Lanche hipercalórico muito nutritivo e ferro na carne.',
  },
  {
    id: 'r11',
    nome: 'Tilápia "Cutting" Limpa',
    ingredientesNecessarios: ['Tilápia', 'Alface', 'Tomate', 'Azeite de oliva', 'Limão'],
    modoPreparo: 'Folhas ao meio e tilápias passadas rapido na grelha sem uso de gorduras adicionais pesadas.',
    beneficio: 'Cardápio base das extremas secas pré praia.',
  },
  {
    id: 'nf1',
    nome: 'Cuscuz Nordestino com Ovos',
    ingredientesNecessarios: ['Cuscuz', 'Ovo inteiro', 'Manteiga'],
    modoPreparo: 'A farinha grossa de milho entra na cuscuzeira até dourar em textura amarela firme, sendo suja de manteiga e ovos estrelados.',
    beneficio: 'Livre de glúten pesado, um clássico cultural inestimável.',
  },
  {
    id: 'nf2',
    nome: 'Purê de Inhame com Sobrecoxa Assada',
    ingredientesNecessarios: ['Inhame', 'Sobrecoxa de frango', 'Alho', 'Pimenta-do-reino'],
    modoPreparo: 'Caldo de frango para umedecer a raiz até esfarelar. A sobrecoxa deve grudar ao osso dourando da própria pela do forno.',
    beneficio: 'Inhame limpa artérias e frango doa proteína firme.',
  }
];


// ========== TELA DE ABERTURA ==========
function TelaAbertura() {
  return (
    <View style={styles.splashContainer}>
      <Image 
        source={require('./assets/meu-logo.jpg')}  // ← sua imagem local
        style={styles.splashLogo}
      />
      <Text style={styles.splashText}>Transforme ingredientes em pratos incríveis</Text>
      <ActivityIndicator size="large" color="#ff6b6b" />
    </View>
  );
}

// ========== TELA PRINCIPAL COM SEÇÕES ==========
const agruparPorTipo = (lista) => {
  return lista.reduce((acc, item) => {
    const tipo = item.tipo || 'outros';
    if (!acc[tipo]) acc[tipo] = [];
    acc[tipo].push(item);
    return acc;
  }, {});
};

const nomesTipos = {

  // =========================
  // 🥩 CARNES
  // =========================
  frango: '🐔 FRANGO',
  boi: '🐄 BOI',
  porco: '🐖 PORCO',
  peixe: '🐟 PEIXES',

  // =========================
  // 🥗 SALADAS / LEGUMES
  // =========================
  folha: '🥬 FOLHAS',
  cru: '🥒 CRUS',
  cozido: '🍲 COZIDOS',
  base_saladas: '🥔 BASE',

  // =========================
  // 🍚 CARBOIDRATOS
  // =========================
  base: '🍚 BASE',
  tuberculo: '🥔 TUBÉRCULOS',
  funcional: '🌾 FUNCIONAIS',

  // =========================
  // 🥑 GORDURAS
  // =========================
  natural: '🥑 NATURAIS',
  oleo: '🫒 ÓLEOS',
  oleaginosa: '🥜 OLEAGINOSAS',
  pasta: '🧈 PASTAS',
  animal: '🧀 GORDURAS ANIMAIS',
  semente: '🌱 SEMENTES',

  // =========================
  // 🍎 FRUTAS
  // =========================
  comum: '🍌 COMUNS',
  vermelha: '🍓 VERMELHAS',
  tropical: '🍍 TROPICAIS',
  citrica: '🍋 CÍTRICAS',
  especial: '🥝 ESPECIAIS',

  // =========================
  // 🥚 PROTEÍNAS ADICIONAIS
  // =========================
  ovos: '🥚 OVOS',
  lacteo: '🥛 LÁCTEOS',
  queijo: '🧀 QUEIJOS',
  suplemento: '💪 SUPLEMENTOS',
  vegetal: '🌱 PROTEÍNAS VEGETAIS',

  // =========================
  // 🧂 TEMPEROS
  // =========================
  base_tempero: '🧄 BASE',
  essencial: '🧂 ESSENCIAIS',
  especiaria: '🌶️ ESPECIARIAS',
  erva: '🌿 ERVAS',
  molho: '🧃 MOLHOS',
};

function TelaMontarRefeicao() {
  const [ingredientesSelecionados, setIngredientesSelecionados] = useState([]);
  const [sugestao, setSugestao] = useState(null);
  const [faltando, setFaltando] = useState([]);
  
  const [categoriasAbertas, setCategoriasAbertas] = useState({}); // mantido
  const [categoriaAtiva, setCategoriaAtiva] = useState(null); // ✅ NOVO
  
  

  const toggleIngrediente = (nome) => {
    if (ingredientesSelecionados.includes(nome)) {
      setIngredientesSelecionados(ingredientesSelecionados.filter(i => i !== nome));
    } else {
      setIngredientesSelecionados([...ingredientesSelecionados, nome]);
    }
  };

  // ✅ NOVA FUNÇÃO
  const selecionarCategoria = (id) => {
    setCategoriaAtiva(prev => (prev === id ? null : id));
  };

  const [carregando, setCarregando] = useState(false); // adicione esta linha junto com os outros useState

const buscarSugestao = async () => {
  if (ingredientesSelecionados.length === 0) {
    Alert.alert('Epa!', 'Selecione pelo menos um ingrediente.');
    return;
  }

  setCarregando(true);
  setSugestao(null);

  // Prompt otimizado para evitar que a IA trave ou retorne lixo
  const prompt = `Aja como um Chef Saudável. 
    Ingredientes disponíveis: ${ingredientesSelecionados.join(', ')}.
    Crie uma receita única. 
    Responda EXCLUSIVAMENTE em formato JSON, sem markdown (sem aspas triplas), seguindo este modelo:
    {"nome": "Nome", "modoPreparo": "Passo a passo", "beneficio": "Por que é saudável"}
    Se não conseguir criar nada, responda: {"erro": "Não foi possível"}`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await response.json();

    // Log para você ver no terminal do VS Code/Expo o que a IA está cuspindo
    console.log("RESPOSTA DA IA:", JSON.stringify(data));

    if (!data.candidates || data.candidates.length === 0) {
      throw new Error("A IA não retornou resultados (pode ser a chave da API ou limite de uso).");
    }

    let textoOriginal = data.candidates[0].content.parts[0].text;
    
    // Limpeza de Markdown (caso a IA insira ```json ... ```)
    const jsonLimpo = textoOriginal.replace(/```json|```/g, '').trim();
    const receita = JSON.parse(jsonLimpo);

    if (receita.erro) {
      Alert.alert('IA diz:', receita.erro);
    } else {
      setSugestao(receita);
    }
  } catch (error) {
    console.error('Erro detalhado:', error);
    Alert.alert('Erro na Conexão', 'Verifique sua chave da API ou se o Gemini está fora do ar.');
  } finally {
    setCarregando(false);
  }
};

  const renderIngrediente = ({ item }) => {
    const isSelected = ingredientesSelecionados.includes(item.nome);
    return (
      <TouchableOpacity
        style={[styles.ingredienteButton, isSelected && styles.ingredienteSelected]}
        onPress={() => toggleIngrediente(item.nome)}
        activeOpacity={0.7}
      >
        <Ionicons name={item.icone} size={20} color={isSelected ? '#fff' : '#ff6b6b'} />
        <Text style={[styles.ingredienteText, isSelected && styles.ingredienteTextSelected]}>
          {item.nome}
        </Text>
        {isSelected && <Ionicons name="checkmark-circle" size={16} color="#fff" style={{ marginLeft: 4 }} />}
      </TouchableOpacity>
    );
  };

  // ✅ HEADER CLICÁVEL
  const contarSelecionados = (section) => {
  let count = 0;

  for (let item of section.data) {
    if (ingredientesSelecionados.includes(item.nome)) {
      count++;
    }
  }

  return count;
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
        <View style={{ 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          <Text style={styles.sectionTitle}>{section.titulo}</Text>

          <Ionicons 
            name={aberta ? 'chevron-up' : 'chevron-down'} 
            size={20} 
            color="#ff6b6b" 
          />
        </View>
      </TouchableOpacity>

      {/* 🔥 AGORA INCLUI CARBOIDRATOS */}
      {aberta && section.data.some(item => item.tipo) && (
        <View style={{ paddingHorizontal: 10 }}>
          {Object.entries(agruparPorTipo(section.data)).map(([tipo, itens]) => (
            <View key={tipo}>
              
              <Text style={{
                color: '#fff',
                fontFamily: 'Poppins_700Bold',
                marginTop: 10,
                marginBottom: 5
              }}>
                {nomesTipos[tipo] || tipo.toUpperCase()}
              </Text>

              {itens.map(item => (
                <View key={item.id}>
                  {renderIngrediente({ item })}
                </View>
              ))}

            </View>
          ))}
        </View>
      )}
    </View>
  );
};

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.titulo}>🥗 O que você tem em casa?</Text>
      <Text style={styles.subtitulo}>Toque nos ingredientes que possui (várias categorias)</Text>

      <SectionList
        sections={categorias}
        keyExtractor={(item) => item.id}

        // ✅ MOSTRA APENAS A CATEGORIA SELECIONADA
        renderItem={({ item, section }) => {
  if (categoriaAtiva !== section.id) return null;

  // evita duplicação nas categorias agrupadas
  if (section.data.some(item => item.tipo)) {
  return null;
}

  return renderIngrediente({ item });
}}

        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={styles.sectionListContent}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity 
  style={styles.botaoMontar} 
  onPress={buscarSugestao}
  disabled={carregando}
>
  {carregando ? (
    <ActivityIndicator color="#fff" />
  ) : (
    <Text style={styles.botaoText}>Montar Refeição com IA</Text>
  )}
</TouchableOpacity>

      {sugestao && (
        <View style={styles.resultadoContainer}>
          <Text style={styles.nomeReceita}>🍽️ {sugestao.nome}</Text>
          {faltando.length > 0 && (
            <Text style={styles.faltandoText}>
              ⚠️ Ingredientes faltando: {faltando.join(', ')}. Use substitutos criativos!
            </Text>
          )}
          <Text style={styles.preparoTitle}>👨‍🍳 Modo de preparo:</Text>
          <Text style={styles.preparoText}>{sugestao.modoPreparo}</Text>
          <Text style={styles.beneficioTitle}>✨ Benefício:</Text>
          <Text style={styles.beneficioText}>{sugestao.beneficio}</Text>
        </View>
      )}
    </ScrollView>
  );
}

// ========== APP PRINCIPAL ==========
export default function App() {
  const [mostrarSplash, setMostrarSplash] = useState(true);
  const [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    const timer = setTimeout(() => setMostrarSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1e1e1e' }} onLayout={onLayoutRootView}>
      {mostrarSplash ? <TelaAbertura /> : <TelaMontarRefeicao />}
    </SafeAreaView>
  );
}

// ========== ESTILOS ==========
const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  splashLogo: {
    width: 450,
    height: 250,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  splashText: {
    fontSize: 22,
    fontFamily: 'Poppins_700Bold',
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    paddingTop: 20,
  },
  titulo: {
    fontSize: 28,
    fontFamily: 'Poppins_700Bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#fff',
  },
  subtitulo: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  sectionListContent: {
    paddingHorizontal: 12,
  },
  sectionHeader: {
    backgroundColor: '#2a2a2a',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 12,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
    color: '#ff6b6b',
  },
  ingredienteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#3a3a3a',
    marginVertical: 4,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#ff6b6b',
    width: '100%',
  },
  ingredienteSelected: {
    backgroundColor: '#ff6b6b',
    borderColor: '#ff6b6b',
  },
  ingredienteText: {
    color: '#ff6b6b',
    marginLeft: 10,
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    flex: 1,
  },
  ingredienteTextSelected: {
    color: '#fff',
  },
  botaoMontar: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 14,
    borderRadius: 40,
    marginVertical: 20,
    marginHorizontal: 16,
    alignItems: 'center',
  },
  botaoText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
  },
  resultadoContainer: {
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 30,
  },
  nomeReceita: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    color: '#ff6b6b',
    marginBottom: 10,
    textAlign: 'center',
  },
  faltandoText: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#ffaa44',
    marginBottom: 15,
    textAlign: 'center',
  },
  preparoTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
    color: '#fff',
    marginTop: 10,
  },
  preparoText: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#ddd',
    marginBottom: 10,
  },
  beneficioTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
    color: '#fff',
    marginTop: 10,
  },
  beneficioText: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#ddd',
  },
});