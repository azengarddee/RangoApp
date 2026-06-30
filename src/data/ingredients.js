export const categorias = [

  {
  id: 'carboidratos',
  titulo: '🍚 CARBOIDRATOS',
  data: [

    // 🍚 BASE PRINCIPAL (cozidos/preparados)
    { 
      id: 'cb1', nome: 'Arroz integral', icone: 'restaurant', tipo: 'base',
      imagem: require('../../assets/imagens/arroz_integral_r.webp'),
      nutricional: { calorias: 123, proteina: 2.6, carboidrato: 25.6, gordura: 1 }
    },
    { 
      id: 'cb2', nome: 'Arroz branco', icone: 'restaurant', tipo: 'base',
      imagem: require('../../assets/imagens/arroz_branco_r.webp'),
      nutricional: { calorias: 130, proteina: 2.4, carboidrato: 28, gordura: 0.3 }
    },
    { 
      id: 'cb5', nome: 'Macarrão integral', icone: 'restaurant', tipo: 'base',
      imagem: require('../../assets/imagens/macarrao_integral_r.webp'),
      nutricional: { calorias: 124, proteina: 5, carboidrato: 25, gordura: 1.1 }
    },
    { 
      id: 'cb6', nome: 'Macarrão comum', icone: 'restaurant', tipo: 'base',
      imagem: require('../../assets/imagens/macarrao_comum_r.webp'),
      nutricional: { calorias: 131, proteina: 5, carboidrato: 25, gordura: 1.1 }
    },
    { 
      id: 'cb9', nome: 'Cuscuz', icone: 'restaurant', tipo: 'base',
      imagem: require('../../assets/imagens/cuscuz_r.webp'),
      nutricional: { calorias: 112, proteina: 3.8, carboidrato: 23, gordura: 0.5 }
    },
    { 
      id: 'cb10', nome: 'Pão branco', icone: 'restaurant', tipo: 'base',
      imagem: require('../../assets/imagens/pao_branco_r.webp'),
      nutricional: { calorias: 265, proteina: 9, carboidrato: 49, gordura: 3.2 }
    },
    { 
      id: 'cb11', nome: 'Pão integral', icone: 'restaurant', tipo: 'base',
      imagem: require('../../assets/imagens/pao_integral_r.webp'),
      nutricional: { calorias: 247, proteina: 13, carboidrato: 41, gordura: 4.2 }
    },
    { 
      id: 'cb15', nome: 'Pão francês', icone: 'restaurant', tipo: 'base',
      imagem: require('../../assets/imagens/pao_frances_r.webp'),
      nutricional: { calorias: 289, proteina: 8.6, carboidrato: 58, gordura: 3.1 }
    },

    // 🥔 TUBÉRCULOS (cozidos)
    { 
      id: 'cb3', nome: 'Batata doce', icone: 'cafe', tipo: 'tuberculo',
      imagem: require('../../assets/imagens/batata_doce_r.webp'),
      nutricional: { calorias: 86, proteina: 1.6, carboidrato: 20, gordura: 0.1 }
    },
    { 
      id: 'cb4', nome: 'Batata inglesa', icone: 'cafe', tipo: 'tuberculo',
      imagem: require('../../assets/imagens/batata_inglesa_r.webp'),
      nutricional: { calorias: 87, proteina: 1.9, carboidrato: 20, gordura: 0.1 }
    },
    { 
      id: 'cb12', nome: 'Inhame', icone: 'cafe', tipo: 'tuberculo',
      imagem: require('../../assets/imagens/inhame_r.webp'),
      nutricional: { calorias: 118, proteina: 1.5, carboidrato: 28, gordura: 0.2 }
    },
    { 
      id: 'cb13', nome: 'Cará', icone: 'cafe', tipo: 'tuberculo',
      imagem: require('../../assets/imagens/cara_r.webp'),
      nutricional: { calorias: 97, proteina: 2.1, carboidrato: 23, gordura: 0.2 }
    },

    // 🌾 FUNCIONAIS / INTEGRAIS
    { 
      id: 'cb7', nome: 'Quinoa', icone: 'nutrition', tipo: 'funcional',
      imagem: require('../../assets/imagens/quinoa_r.webp'),
      nutricional: { calorias: 120, proteina: 4.4, carboidrato: 21, gordura: 1.9 }
    },
    { 
      id: 'cb8', nome: 'Aveia', icone: 'nutrition', tipo: 'funcional',
      imagem: require('../../assets/imagens/aveia_r.webp'),
      nutricional: { calorias: 389, proteina: 17, carboidrato: 66, gordura: 7 }
    },
    { 
      id: 'cb14', nome: 'Granola', icone: 'nutrition', tipo: 'funcional',
      imagem: require('../../assets/imagens/granola_r.webp'),
      nutricional: { calorias: 471, proteina: 10, carboidrato: 64, gordura: 20 }
    },
  ],
},

{
  id: 'graos',
  titulo: '🥘 GRÃOS & LEGUMINOSAS',
  data: [
    { 
      id: 'g1', nome: 'Feijão Carioca', icone: 'color-filter', tipo: 'feijao',
      imagem: require('../../assets/imagens/feijao_carioca_r.webp'),
      nutricional: { calorias: 76, proteina: 4.8, carboidrato: 13.6, gordura: 0.5 }
    },
    { 
      id: 'g2', nome: 'Feijão Preto', icone: 'color-filter', tipo: 'feijao',
      imagem: require('../../assets/imagens/feijao_preto_r.webp'),
      nutricional: { calorias: 77, proteina: 4.5, carboidrato: 14, gordura: 0.5 }
    },
    { 
      id: 'g3', nome: 'Feijão Branco', icone: 'color-filter', tipo: 'feijao',
      imagem: require('../../assets/imagens/feijao_branco_r.webp'),
      nutricional: { calorias: 80, proteina: 5.5, carboidrato: 14.5, gordura: 0.5 }
    },
    { 
      id: 'g4', nome: 'Feijão de Corda', icone: 'color-filter', tipo: 'feijao',
      imagem: require('../../assets/imagens/feijao_corda_r.webp'),
      nutricional: { calorias: 88, proteina: 6, carboidrato: 16, gordura: 0.6 }
    },
    { 
      id: 'g5', nome: 'Grão-de-bico', icone: 'nutrition', tipo: 'grão',
      imagem: require('../../assets/imagens/grao_de_bico_r.webp'),
      nutricional: { calorias: 164, proteina: 8.9, carboidrato: 27, gordura: 2.6 }
    },
    { 
      id: 'g6', nome: 'Lentilha', icone: 'nutrition', tipo: 'grão',
      imagem: require('../../assets/imagens/lentilha_r.webp'),
      nutricional: { calorias: 116, proteina: 9, carboidrato: 20, gordura: 0.4 }
    },
    { 
      id: 'g7', nome: 'Ervilha', icone: 'nutrition', tipo: 'grão',
      imagem: require('../../assets/imagens/ervilha_r.webp'),
      nutricional: { calorias: 81, proteina: 5.4, carboidrato: 14, gordura: 0.4 }
    },
  ],
},

{
  id: 'carnes',
  titulo: '🥩 CARNES',
  data: [

    // 🐔 FRANGO
    { 
      id: 'c1', nome: 'Peito de Frango', icone: 'fast-food', tipo: 'frango',
      imagem: require('../../assets/imagens/peito_frango_r.webp'),
      nutricional: { calorias: 165, proteina: 31, carboidrato: 0, gordura: 3.6 }
    },
    { 
      id: 'c2', nome: 'Coxa de Frango', icone: 'fast-food', tipo: 'frango',
      imagem: require('../../assets/imagens/coxa_frango_r.webp'),
      nutricional: { calorias: 209, proteina: 26, carboidrato: 0, gordura: 10.9 }
    },
    { 
      id: 'c3', nome: 'Sobrecoxa de frango', icone: 'fast-food', tipo: 'frango',
      imagem: require('../../assets/imagens/sobrecoxa_de_frango_r.webp'),
      nutricional: { calorias: 232, proteina: 25, carboidrato: 0, gordura: 15 }
    },
    { 
      id: 'c4', nome: 'Frango inteiro', icone: 'fast-food', tipo: 'frango',
      imagem: require('../../assets/imagens/frango_inteiro_r.webp'),
      nutricional: { calorias: 239, proteina: 27, carboidrato: 0, gordura: 14 }
    },
    { 
      id: 'c5', nome: 'Frango desfiado', icone: 'fast-food', tipo: 'frango',
      imagem: require('../../assets/imagens/frango_desfiado_r.webp'),
      nutricional: { calorias: 165, proteina: 31, carboidrato: 0, gordura: 3.6 }
    },
    { 
      id: 'c30', nome: 'Asinha de frango', icone: 'fast-food', tipo: 'frango',
      imagem: require('../../assets/imagens/asinha_frango_r.webp'),
      nutricional: { calorias: 215, proteina: 18, carboidrato: 0, gordura: 15 }
    },

    // 🐄 BOI
    { 
      id: 'c6', nome: 'Filé Mignon', icone: 'fast-food', tipo: 'boi',
      imagem: require('../../assets/imagens/file_mignon_r.webp'),
      nutricional: { calorias: 250, proteina: 26, carboidrato: 0, gordura: 17 }
    },
    { 
      id: 'c7', nome: 'Alcatra', icone: 'fast-food', tipo: 'boi',
      imagem: require('../../assets/imagens/alcatra_r.webp'),
      nutricional: { calorias: 217, proteina: 29, carboidrato: 0, gordura: 11 }
    },
    { 
      id: 'c8', nome: 'Patinho', icone: 'fast-food', tipo: 'boi',
      imagem: require('../../assets/imagens/patinho_r.webp'),
      nutricional: { calorias: 143, proteina: 26, carboidrato: 0, gordura: 4.5 }
    },
    { 
      id: 'c9', nome: 'Contra-filé', icone: 'fast-food', tipo: 'boi',
      imagem: require('../../assets/imagens/contra_file_r.webp'),
      nutricional: { calorias: 271, proteina: 25, carboidrato: 0, gordura: 19 }
    },
    { 
      id: 'c10', nome: 'Picanha', icone: 'fast-food', tipo: 'boi',
      imagem: require('../../assets/imagens/picanha_r.webp'),
      nutricional: { calorias: 290, proteina: 24, carboidrato: 0, gordura: 22 }
    },
    { 
      id: 'c11', nome: 'Músculo', icone: 'fast-food', tipo: 'boi',
      imagem: require('../../assets/imagens/musculo_r.webp'),
      nutricional: { calorias: 212, proteina: 30, carboidrato: 0, gordura: 9 }
    },
    { 
      id: 'c12', nome: 'Costela bovina', icone: 'fast-food', tipo: 'boi',
      imagem: require('../../assets/imagens/costela_bovina_r.webp'),
      nutricional: { calorias: 291, proteina: 24, carboidrato: 0, gordura: 22 }
    },
    { 
      id: 'c13', nome: 'Carne moída', icone: 'fast-food', tipo: 'boi',
      imagem: require('../../assets/imagens/carne_moida_r.webp'),
      nutricional: { calorias: 250, proteina: 26, carboidrato: 0, gordura: 17 }
    },

    // 🐖 PORCO
    { 
      id: 'c14', nome: 'Lombo suíno', icone: 'fast-food', tipo: 'porco',
      imagem: require('../../assets/imagens/lombo_suino_r.webp'),
      nutricional: { calorias: 242, proteina: 27, carboidrato: 0, gordura: 14 }
    },
    { 
      id: 'c15', nome: 'Costelinha suína', icone: 'fast-food', tipo: 'porco',
      imagem: require('../../assets/imagens/costelinha_suina_r.webp'),
      nutricional: { calorias: 321, proteina: 26, carboidrato: 0, gordura: 24 }
    },
    { 
      id: 'c16', nome: 'Bacon', icone: 'fast-food', tipo: 'porco',
      imagem: require('../../assets/imagens/bacon_r.webp'),
      nutricional: { calorias: 541, proteina: 37, carboidrato: 1.4, gordura: 42 }
    },
    { 
      id: 'c25', nome: 'Panceta', icone: 'fast-food', tipo: 'porco',
      imagem: require('../../assets/imagens/panceta_r.webp'),
      nutricional: { calorias: 518, proteina: 9, carboidrato: 0, gordura: 53 }
    },
    { 
      id: 'c26', nome: 'Filé suíno', icone: 'fast-food', tipo: 'porco',
      imagem: require('../../assets/imagens/file_suino_r.webp'),
      nutricional: { calorias: 143, proteina: 26, carboidrato: 0, gordura: 3.5 }
    },
    { 
      id: 'c27', nome: 'Linguiça', icone: 'fast-food', tipo: 'porco',
      imagem: require('../../assets/imagens/linguica_r.webp'),
      nutricional: { calorias: 300, proteina: 15, carboidrato: 2, gordura: 25 }
    },
    { 
      id: 'c28', nome: 'Pernil suíno', icone: 'fast-food', tipo: 'porco',
      imagem: require('../../assets/imagens/pernil_suino_r.webp'),
      nutricional: { calorias: 262, proteina: 27, carboidrato: 0, gordura: 17 }
    },
    { 
      id: 'c29', nome: 'Bisteca suína', icone: 'fast-food', tipo: 'porco',
      imagem: require('../../assets/imagens/bisteca_suina_r.webp'),
      nutricional: { calorias: 242, proteina: 24, carboidrato: 0, gordura: 16 }
    },

    // 🐟 PEIXES
    { 
      id: 'c17', nome: 'Salmão', icone: 'fish', tipo: 'peixe',
      imagem: require('../../assets/imagens/salmao_r.webp'),
      nutricional: { calorias: 208, proteina: 20, carboidrato: 0, gordura: 13 }
    },
    { 
      id: 'c18', nome: 'Tilápia', icone: 'fish', tipo: 'peixe',
      imagem: require('../../assets/imagens/tilapia_r.webp'),
      nutricional: { calorias: 128, proteina: 26, carboidrato: 0, gordura: 2.7 }
    },
    { 
      id: 'c19', nome: 'Atum', icone: 'fish', tipo: 'peixe',
      imagem: require('../../assets/imagens/atum_r.webp'),
      nutricional: { calorias: 132, proteina: 28, carboidrato: 0, gordura: 1 }
    },
    { 
      id: 'c20', nome: 'Sardinha', icone: 'fish', tipo: 'peixe',
      imagem: require('../../assets/imagens/sardinha_r.webp'),
      nutricional: { calorias: 208, proteina: 25, carboidrato: 0, gordura: 11 }
    },
    { 
      id: 'c21', nome: 'Merluza', icone: 'fish', tipo: 'peixe',
      imagem: require('../../assets/imagens/merluza_r.webp'),
      nutricional: { calorias: 90, proteina: 18, carboidrato: 0, gordura: 1 }
    },
    { 
      id: 'c22', nome: 'Bacalhau', icone: 'fish', tipo: 'peixe',
      imagem: require('../../assets/imagens/bacalhau_r.webp'),
      nutricional: { calorias: 105, proteina: 23, carboidrato: 0, gordura: 0.9 }
    },
    { 
      id: 'c23', nome: 'Camarão', icone: 'fish', tipo: 'peixe',
      imagem: require('../../assets/imagens/camarao_r.webp'),
      nutricional: { calorias: 99, proteina: 24, carboidrato: 0.2, gordura: 0.3 }
    },
    { 
      id: 'c24', nome: 'Peixe branco', icone: 'fish', tipo: 'peixe',
      imagem: require('../../assets/imagens/peixe_branco_r.webp'),
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
      imagem: require('../../assets/imagens/alface_r.webp'),
      nutricional: { calorias: 15, proteina: 1.4, carboidrato: 2.9, gordura: 0.2 }
    },
    { 
      id: 's2', nome: 'Rúcula', icone: 'leaf', tipo: 'folha',
      imagem: require('../../assets/imagens/rucula_r.webp'),
      nutricional: { calorias: 25, proteina: 2.6, carboidrato: 3.7, gordura: 0.7 }
    },
    { 
      id: 's3', nome: 'Agrião', icone: 'leaf', tipo: 'folha',
      imagem: require('../../assets/imagens/agriao_r.webp'),
      nutricional: { calorias: 11, proteina: 2.3, carboidrato: 1.3, gordura: 0.1 }
    },
    { 
      id: 's4', nome: 'Espinafre', icone: 'leaf', tipo: 'folha',
      imagem: require('../../assets/imagens/espinafre_r.webp'),
      nutricional: { calorias: 23, proteina: 2.9, carboidrato: 3.6, gordura: 0.4 }
    },
    { 
      id: 's5', nome: 'Couve', icone: 'leaf', tipo: 'folha',
      imagem: require('../../assets/imagens/couve_r.webp'),
      nutricional: { calorias: 49, proteina: 4.3, carboidrato: 8.8, gordura: 0.9 }
    },
    { 
      id: 's6', nome: 'Acelga', icone: 'leaf', tipo: 'folha',
      imagem: require('../../assets/imagens/acelga_r.webp'),
      nutricional: { calorias: 19, proteina: 1.8, carboidrato: 3.7, gordura: 0.2 }
    },
    { 
      id: 's7', nome: 'Chicória', icone: 'leaf', tipo: 'folha',
      imagem: require('../../assets/imagens/chicoria_r.webp'),
      nutricional: { calorias: 23, proteina: 1.7, carboidrato: 4.7, gordura: 0.3 }
    },
    { 
      id: 's8', nome: 'Escarola', icone: 'leaf', tipo: 'folha',
      imagem: require('../../assets/imagens/escarola_r.webp'),
      nutricional: { calorias: 17, proteina: 1.3, carboidrato: 3.4, gordura: 0.2 }
    },
    { 
      id: 's9', nome: 'Almeirão', icone: 'leaf', tipo: 'folha',
      imagem: require('../../assets/imagens/almeirao_r.webp'),
      nutricional: { calorias: 28, proteina: 1.7, carboidrato: 5.9, gordura: 0.2 }
    },

    // 🥒 CRUS
    { 
      id: 's10', nome: 'Tomate', icone: 'nutrition', tipo: 'cru',
      imagem: require('../../assets/imagens/tomate_r.webp'),
      nutricional: { calorias: 18, proteina: 0.9, carboidrato: 3.9, gordura: 0.2 }
    },
    { 
      id: 's11', nome: 'Pepino', icone: 'nutrition', tipo: 'cru',
      imagem: require('../../assets/imagens/pepino_r.webp'),
      nutricional: { calorias: 16, proteina: 0.7, carboidrato: 3.6, gordura: 0.1 }
    },
    { 
      id: 's12', nome: 'Cenoura', icone: 'nutrition', tipo: 'cru',
      imagem: require('../../assets/imagens/cenoura_r.webp'),
      nutricional: { calorias: 41, proteina: 0.9, carboidrato: 9.6, gordura: 0.2 }
    },
    { 
      id: 's13', nome: 'Beterraba', icone: 'nutrition', tipo: 'cru',
      imagem: require('../../assets/imagens/beterraba_r.webp'),
      nutricional: { calorias: 43, proteina: 1.6, carboidrato: 10, gordura: 0.2 }
    },
    { 
      id: 's14', nome: 'Rabanete', icone: 'nutrition', tipo: 'cru',
      imagem: require('../../assets/imagens/rabanete_r.webp'),
      nutricional: { calorias: 16, proteina: 0.7, carboidrato: 3.4, gordura: 0.1 }
    },
    { 
      id: 's15', nome: 'Pimentão', icone: 'nutrition', tipo: 'cru',
      imagem: require('../../assets/imagens/pimentao_r.webp'),
      nutricional: { calorias: 31, proteina: 1, carboidrato: 6, gordura: 0.3 }
    },

    // 🍲 COZIDOS
    { 
      id: 's16', nome: 'Brócolis', icone: 'leaf', tipo: 'cozido',
      imagem: require('../../assets/imagens/brocolis_r.webp'),
      nutricional: { calorias: 35, proteina: 2.4, carboidrato: 7.2, gordura: 0.4 }
    },
    { 
      id: 's17', nome: 'Couve-flor', icone: 'leaf', tipo: 'cozido',
      imagem: require('../../assets/imagens/couve_flor_r.webp'),
      nutricional: { calorias: 25, proteina: 1.9, carboidrato: 5, gordura: 0.3 }
    },
    { 
      id: 's18', nome: 'Abobrinha', icone: 'nutrition', tipo: 'cozido',
      imagem: require('../../assets/imagens/abobrinha_r.webp'),
      nutricional: { calorias: 17, proteina: 1.2, carboidrato: 3.1, gordura: 0.3 }
    },
    { 
      id: 's19', nome: 'Berinjela', icone: 'nutrition', tipo: 'cozido',
      imagem: require('../../assets/imagens/beringela_r.webp'),
      nutricional: { calorias: 25, proteina: 1, carboidrato: 6, gordura: 0.2 }
    },
    { 
      id: 's20', nome: 'Vagem', icone: 'nutrition', tipo: 'cozido',
      imagem: require('../../assets/imagens/vagem_r.webp'),
      nutricional: { calorias: 35, proteina: 1.9, carboidrato: 7.9, gordura: 0.1 }
    },

    // 🥔 BASE
    { 
      id: 's23', nome: 'Mandioca', icone: 'cafe', tipo: 'base_saladas',
      imagem: require('../../assets/imagens/mandioca_r.webp'),
      nutricional: { calorias: 160, proteina: 1.4, carboidrato: 38, gordura: 0.3 }
    },
  ],
},

{
  id: 'gorduras',
  titulo: '🥑 GORDURAS SAUDÁVEIS',
  data: [

    // 🥑 NATURAIS
    { 
      id: 'gs1', nome: 'Abacate', icone: 'nutrition', tipo: 'natural',
      imagem: require('../../assets/imagens/abacate_r.webp'),
      nutricional: { calorias: 160, proteina: 2, carboidrato: 9, gordura: 15 }
    },
    { 
      id: 'gs2', nome: 'Azeitona', icone: 'nutrition', tipo: 'natural',
      imagem: require('../../assets/imagens/azeitona_r.webp'),
      nutricional: { calorias: 145, proteina: 1, carboidrato: 4, gordura: 15 }
    },
    { 
      id: 'gs3', nome: 'Coco', icone: 'nutrition', tipo: 'natural',
      imagem: require('../../assets/imagens/coco_r.webp'),
      nutricional: { calorias: 354, proteina: 3.3, carboidrato: 15, gordura: 33 }
    },

    // 🫒 ÓLEOS
    { 
      id: 'gs4', nome: 'Azeite de oliva', icone: 'restaurant', tipo: 'oleo',
      imagem: require('../../assets/imagens/azeite_de_oliva_r.webp'),
      nutricional: { calorias: 884, proteina: 0, carboidrato: 0, gordura: 100 }
    },
    { 
      id: 'gs5', nome: 'Óleo de coco', icone: 'restaurant', tipo: 'oleo',
      imagem: require('../../assets/imagens/oleo_de_coco_r.webp'),
      nutricional: { calorias: 892, proteina: 0, carboidrato: 0, gordura: 100 }
    },
    { 
      id: 'gs6', nome: 'Óleo de girassol', icone: 'restaurant', tipo: 'oleo',
      imagem: require('../../assets/imagens/oleo_de_girassol_r.webp'),
      nutricional: { calorias: 884, proteina: 0, carboidrato: 0, gordura: 100 }
    },

    // 🥜 OLEAGINOSAS
    { 
      id: 'gs7', nome: 'Castanha de caju', icone: 'nutrition', tipo: 'oleaginosa',
      imagem: require('../../assets/imagens/castanha_de_caju_r.webp'),
      nutricional: { calorias: 553, proteina: 18, carboidrato: 30, gordura: 44 }
    },
    { 
      id: 'gs8', nome: 'Castanha-do-pará', icone: 'nutrition', tipo: 'oleaginosa',
      imagem: require('../../assets/imagens/castanha_do_para_r.webp'),
      nutricional: { calorias: 656, proteina: 14, carboidrato: 12, gordura: 66 }
    },
    { 
      id: 'gs9', nome: 'Amêndoas', icone: 'nutrition', tipo: 'oleaginosa',
      imagem: require('../../assets/imagens/amendoas_r.webp'),
      nutricional: { calorias: 579, proteina: 21, carboidrato: 22, gordura: 50 }
    },
    { 
      id: 'gs10', nome: 'Nozes', icone: 'nutrition', tipo: 'oleaginosa',
      imagem: require('../../assets/imagens/nozes_r.webp'),
      nutricional: { calorias: 654, proteina: 15, carboidrato: 14, gordura: 65 }
    },
    { 
      id: 'gs11', nome: 'Amendoim', icone: 'nutrition', tipo: 'oleaginosa',
      imagem: require('../../assets/imagens/amendoim_r.webp'),
      nutricional: { calorias: 567, proteina: 26, carboidrato: 16, gordura: 49 }
    },

    // 🧈 PASTAS
    { 
      id: 'gs12', nome: 'Pasta de amendoim', icone: 'nutrition', tipo: 'pasta',
      imagem: require('../../assets/imagens/pasta_de_amendoim_r.webp'),
      nutricional: { calorias: 588, proteina: 25, carboidrato: 20, gordura: 50 }
    },
    { 
      id: 'gs13', nome: 'Pasta de amêndoas', icone: 'nutrition', tipo: 'pasta',
      imagem: require('../../assets/imagens/pasta_de_amendoas_r.webp'),
      nutricional: { calorias: 614, proteina: 21, carboidrato: 19, gordura: 55 }
    },

    // 🧀 GORDURAS ANIMAIS
    { 
      id: 'gs14', nome: 'Manteiga', icone: 'restaurant', tipo: 'animal',
      imagem: require('../../assets/imagens/manteiga_r.webp'),
      nutricional: { calorias: 717, proteina: 1, carboidrato: 0, gordura: 81 }
    },
    { 
      id: 'gs15', nome: 'Banha de porco', icone: 'restaurant', tipo: 'animal',
      imagem: require('../../assets/imagens/banha_de_porco_r.webp'),
      nutricional: { calorias: 902, proteina: 0, carboidrato: 0, gordura: 100 }
    },
    { 
      id: 'gs19', nome: 'Creme de leite', icone: 'restaurant', tipo: 'animal',
      imagem: require('../../assets/imagens/greme_de_leite_r.webp'),
      nutricional: { calorias: 300, proteina: 2.4, carboidrato: 3, gordura: 30 }
    },

    // 🌱 SEMENTES
    { 
      id: 'gs16', nome: 'Chia', icone: 'nutrition', tipo: 'semente',
      imagem: require('../../assets/imagens/chia_r.webp'),
      nutricional: { calorias: 486, proteina: 17, carboidrato: 42, gordura: 31 }
    },
    { 
      id: 'gs17', nome: 'Linhaça', icone: 'nutrition', tipo: 'semente',
      imagem: require('../../assets/imagens/linhaca_r.webp'),
      nutricional: { calorias: 534, proteina: 18, carboidrato: 29, gordura: 42 }
    },
    { 
      id: 'gs18', nome: 'Gergelim', icone: 'nutrition', tipo: 'semente',
      imagem: require('../../assets/imagens/gergelim_r.webp'),
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
      imagem: require('../../assets/imagens/ovo_r.webp'),
      nutricional: { calorias: 155, proteina: 13, carboidrato: 1.1, gordura: 11 }
    },
    { 
      id: 'o2', nome: 'Clara de ovo', icone: 'egg',
      imagem: require('../../assets/imagens/clara_de_ovo_r.webp'),
      nutricional: { calorias: 52, proteina: 11, carboidrato: 0.7, gordura: 0.2 }
    },

    // 🥛 LÁCTEOS PROTEICOS
    { 
      id: 'o3', nome: 'Iogurte grego', icone: 'cafe',
      imagem: require('../../assets/imagens/iorgute_grego_r.webp'),
      nutricional: { calorias: 97, proteina: 10, carboidrato: 3.6, gordura: 5 }
    },
    { 
      id: 'o4', nome: 'Iogurte natural', icone: 'cafe',
      imagem: require('../../assets/imagens/iorgute_natural_r.webp'),
      nutricional: { calorias: 61, proteina: 3.5, carboidrato: 4.7, gordura: 3.3 }
    },
    { 
      id: 'o5', nome: 'Leite integral', icone: 'cafe',
      imagem: require('../../assets/imagens/leite_integral_r.webp'),
      nutricional: { calorias: 61, proteina: 3.2, carboidrato: 4.8, gordura: 3.3 }
    },
    { 
      id: 'o6', nome: 'Leite desnatado', icone: 'cafe',
      imagem: require('../../assets/imagens/leite_desnatado_r.webp'),
      nutricional: { calorias: 34, proteina: 3.4, carboidrato: 5, gordura: 0.1 }
    },
    { 
      id: 'o16', nome: 'Leite condensado', icone: 'cafe',
      imagem: require('../../assets/imagens/leite_moca_r.webp'),
      nutricional: { calorias: 321, proteina: 7.9, carboidrato: 54, gordura: 8 }
    },

    // 🧀 QUEIJOS
    { 
      id: 'o7', nome: 'Queijo muçarela', icone: 'restaurant',
      imagem: require('../../assets/imagens/queijo_mucarela_r.webp'),
      nutricional: { calorias: 280, proteina: 22, carboidrato: 2, gordura: 22 }
    },
    { 
      id: 'o8', nome: 'Queijo parmesão', icone: 'restaurant',
      imagem: require('../../assets/imagens/queijo_parmesao_r.webp'),
      nutricional: { calorias: 431, proteina: 36, carboidrato: 4, gordura: 29 }
    },
    { 
      id: 'o9', nome: 'Queijo minas', icone: 'restaurant',
      imagem: require('../../assets/imagens/queijo_minas_r.webp'),
      nutricional: { calorias: 264, proteina: 17, carboidrato: 3, gordura: 21 }
    },
    { 
      id: 'o10', nome: 'Queijo cottage', icone: 'restaurant',
      imagem: require('../../assets/imagens/queijo_cottage_r.webp'),
      nutricional: { calorias: 98, proteina: 11, carboidrato: 3.4, gordura: 4.3 }
    },

    // 💪 SUPLEMENTOS
    { 
      id: 'o11', nome: 'Whey Protein', icone: 'barbell',
      imagem: require('../../assets/imagens/whey_protein_r.webp'),
      nutricional: { calorias: 120, proteina: 24, carboidrato: 3, gordura: 1.5 }
    },
    { 
      id: 'o12', nome: 'Caseína', icone: 'barbell',
      imagem: require('../../assets/imagens/caseina_r.webp'),
      nutricional: { calorias: 110, proteina: 24, carboidrato: 3, gordura: 1 }
    },

    // 🌱 PROTEÍNAS VEGETAIS
    { 
      id: 'o13', nome: 'Tofu', icone: 'leaf',
      imagem: require('../../assets/imagens/tofu_r.webp'),
      nutricional: { calorias: 76, proteina: 8, carboidrato: 1.9, gordura: 4.8 }
    },
    { 
      id: 'o14', nome: 'Tempeh', icone: 'leaf',
      imagem: require('../../assets/imagens/tempeh_r.webp'),
      nutricional: { calorias: 193, proteina: 20, carboidrato: 9, gordura: 11 }
    },
    { 
      id: 'o15', nome: 'Proteína de soja', icone: 'leaf',
      imagem: require('../../assets/imagens/proteina_de_soja_r.webp'),
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
      imagem: require('../../assets/imagens/alho_r.webp'),
      nutricional: { calorias: 149, proteina: 6.4, carboidrato: 33, gordura: 0.5 }
    },
    { 
      id: 't2', nome: 'Cebola', icone: 'nutrition',
      imagem: require('../../assets/imagens/cebola_r.webp'),
      nutricional: { calorias: 40, proteina: 1.1, carboidrato: 9.3, gordura: 0.1 }
    },

    // 🧂 ESSENCIAIS
    { 
      id: 't3', nome: 'Sal', icone: 'restaurant',
      imagem: require('../../assets/imagens/sal_r.webp'),
      nutricional: { calorias: 0, proteina: 0, carboidrato: 0, gordura: 0 }
    },
    { 
      id: 't4', nome: 'Pimenta-do-reino', icone: 'flame',
      imagem: require('../../assets/imagens/pimenta_do_reino_r.webp'),
      nutricional: { calorias: 251, proteina: 10, carboidrato: 64, gordura: 3.3 }
    },

    // 🌶️ ESPECIARIAS
    { 
      id: 't5', nome: 'Páprica', icone: 'flame',
      imagem: require('../../assets/imagens/paprica_r.webp'),
      nutricional: { calorias: 282, proteina: 14, carboidrato: 54, gordura: 13 }
    },
    { 
      id: 't6', nome: 'Orégano', icone: 'leaf',
      imagem: require('../../assets/imagens/oregano_r.webp'),
      nutricional: { calorias: 265, proteina: 9, carboidrato: 69, gordura: 4 }
    },

    // 🌿 VERDES
    { 
      id: 't7', nome: 'Salsinha', icone: 'leaf',
      imagem: require('../../assets/imagens/salsinha_r.webp'),
      nutricional: { calorias: 36, proteina: 3, carboidrato: 6, gordura: 0.8 }
    },
    { 
      id: 't8', nome: 'Cebolinha', icone: 'leaf',
      imagem: require('../../assets/imagens/cebolinha_r.webp'),
      nutricional: { calorias: 30, proteina: 3.3, carboidrato: 4.4, gordura: 0.7 }
    },

    // 🧄 MOLHOS
    { 
      id: 't9', nome: 'Maionese', icone: 'restaurant',
      imagem: require('../../assets/imagens/maionese_r.webp'),
      nutricional: { calorias: 680, proteina: 1, carboidrato: 1, gordura: 75 }
    },
    { 
      id: 't10', nome: 'Maionese verde', icone: 'restaurant',
      imagem: require('../../assets/imagens/maionese_verde_r.webp'),
      nutricional: { calorias: 620, proteina: 2, carboidrato: 3, gordura: 68 }
    },
    { 
      id: 't11', nome: 'Ketchup', icone: 'restaurant',
      imagem: require('../../assets/imagens/ketchup_r.webp'),
      nutricional: { calorias: 112, proteina: 1.3, carboidrato: 26, gordura: 0.2 }
    },
    { 
      id: 't12', nome: 'Mostarda', icone: 'restaurant',
      imagem: require('../../assets/imagens/mostarda_r.webp'),
      nutricional: { calorias: 66, proteina: 4.4, carboidrato: 5.8, gordura: 4.4 }
    },
    { 
      id: 't13', nome: 'Molho barbecue', icone: 'restaurant',
      imagem: require('../../assets/imagens/barbecue_r.webp'),
      nutricional: { calorias: 172, proteina: 1, carboidrato: 40, gordura: 0.5 }
    },
    { 
      id: 't14', nome: 'Shoyu', icone: 'restaurant',
      imagem: require('../../assets/imagens/shoyu_r.webp'),
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
      imagem: require('../../assets/imagens/banana_r.webp'),
      nutricional: { calorias: 89, proteina: 1.1, carboidrato: 23, gordura: 0.3 }
    },
    { 
      id: 'f2', nome: 'Maçã', icone: 'nutrition', tipo: 'comum',
      imagem: require('../../assets/imagens/maca_r.webp'),
      nutricional: { calorias: 52, proteina: 0.3, carboidrato: 14, gordura: 0.2 }
    },
    { 
      id: 'f3', nome: 'Laranja', icone: 'nutrition', tipo: 'comum',
      imagem: require('../../assets/imagens/laranja_r.webp'),
      nutricional: { calorias: 47, proteina: 0.9, carboidrato: 12, gordura: 0.1 }
    },
    { 
      id: 'f4', nome: 'Pera', icone: 'nutrition', tipo: 'comum',
      imagem: require('../../assets/imagens/pera_r.webp'),
      nutricional: { calorias: 57, proteina: 0.4, carboidrato: 15, gordura: 0.1 }
    },
    { 
      id: 'f5', nome: 'Uva', icone: 'nutrition', tipo: 'comum',
      imagem: require('../../assets/imagens/uva_r.webp'),
      nutricional: { calorias: 69, proteina: 0.7, carboidrato: 18, gordura: 0.2 }
    },

    // 🍓 VERMELHAS
    { 
      id: 'f6', nome: 'Morango', icone: 'nutrition', tipo: 'vermelha',
      imagem: require('../../assets/imagens/morango_r.webp'),
      nutricional: { calorias: 32, proteina: 0.7, carboidrato: 7.7, gordura: 0.3 }
    },
    { 
      id: 'f7', nome: 'Amora', icone: 'nutrition', tipo: 'vermelha',
      imagem: require('../../assets/imagens/amora_r.webp'),
      nutricional: { calorias: 43, proteina: 1.4, carboidrato: 10, gordura: 0.5 }
    },
    { 
      id: 'f8', nome: 'Framboesa', icone: 'nutrition', tipo: 'vermelha',
      imagem: require('../../assets/imagens/framboesa_r.webp'),
      nutricional: { calorias: 52, proteina: 1.2, carboidrato: 12, gordura: 0.7 }
    },

    // 🍍 TROPICAIS
    { 
      id: 'f9', nome: 'Abacaxi', icone: 'nutrition', tipo: 'tropical',
      imagem: require('../../assets/imagens/abacaxi_r.webp'),
      nutricional: { calorias: 50, proteina: 0.5, carboidrato: 13, gordura: 0.1 }
    },
    { 
      id: 'f10', nome: 'Manga', icone: 'nutrition', tipo: 'tropical',
      imagem: require('../../assets/imagens/manga_r.webp'),
      nutricional: { calorias: 60, proteina: 0.8, carboidrato: 15, gordura: 0.4 }
    },
    { 
      id: 'f11', nome: 'Mamão', icone: 'nutrition', tipo: 'tropical',
      imagem: require('../../assets/imagens/mamao_r.webp'),
      nutricional: { calorias: 43, proteina: 0.5, carboidrato: 11, gordura: 0.3 }
    },
    { 
      id: 'f12', nome: 'Maracujá', icone: 'nutrition', tipo: 'tropical',
      imagem: require('../../assets/imagens/maracuja_r.webp'),
      nutricional: { calorias: 97, proteina: 2.2, carboidrato: 23, gordura: 0.7 }
    },
    { 
      id: 'f13', nome: 'Melancia', icone: 'nutrition', tipo: 'tropical',
      imagem: require('../../assets/imagens/melancia_r.webp'),
      nutricional: { calorias: 30, proteina: 0.6, carboidrato: 8, gordura: 0.2 }
    },
    { 
      id: 'f14', nome: 'Melão', icone: 'nutrition', tipo: 'tropical',
      imagem: require('../../assets/imagens/melao_r.webp'),
      nutricional: { calorias: 34, proteina: 0.8, carboidrato: 8, gordura: 0.2 }
    },

    // 🍋 CÍTRICAS
    { 
      id: 'f15', nome: 'Limão', icone: 'nutrition', tipo: 'citrica',
      imagem: require('../../assets/imagens/limao_r.webp'),
      nutricional: { calorias: 29, proteina: 1.1, carboidrato: 9, gordura: 0.3 }
    },
    { 
      id: 'f16', nome: 'Tangerina', icone: 'nutrition', tipo: 'citrica',
      imagem: require('../../assets/imagens/tangerina_r.webp'),
      nutricional: { calorias: 53, proteina: 0.8, carboidrato: 13, gordura: 0.3 }
    },

    // 🥑 ESPECIAIS
    { 
      id: 'f17', nome: 'Kiwi', icone: 'nutrition', tipo: 'especial',
      imagem: require('../../assets/imagens/kiwi_r.webp'),
      nutricional: { calorias: 61, proteina: 1.1, carboidrato: 15, gordura: 0.5 }
    },
    { 
      id: 'f18', nome: 'Ameixa', icone: 'nutrition', tipo: 'especial',
      imagem: require('../../assets/imagens/ameixa_r.webp'),
      nutricional: { calorias: 46, proteina: 0.7, carboidrato: 11, gordura: 0.3 }
    },
    { 
      id: 'f19', nome: 'Pêssego', icone: 'nutrition', tipo: 'especial',
      imagem: require('../../assets/imagens/pessego_r.webp'),
      nutricional: { calorias: 39, proteina: 0.9, carboidrato: 10, gordura: 0.3 }
    },

  ],
}

];
