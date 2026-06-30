// src/services/firestoreService.js
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { db } from '../config/firebase';

// ===== USUÁRIOS =====

export async function criarPerfil(uid, dados) {
  await setDoc(doc(db, 'usuarios', uid), {
    ...dados,
    criadoEm: serverTimestamp(),
  });
}

export async function buscarPerfil(uid) {
  const snap = await getDoc(doc(db, 'usuarios', uid));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function atualizarPerfil(uid, dados) {
  await updateDoc(doc(db, 'usuarios', uid), {
    ...dados,
    atualizadoEm: serverTimestamp(),
  });
}

export async function deletarPerfil(uid) {
  await deleteDoc(doc(db, 'usuarios', uid));
}

// ===== RECEITAS =====

export async function criarReceita(uid, dados) {
  const docRef = await addDoc(collection(db, 'receitas'), {
    ...dados,
    uid,
    criadoEm: serverTimestamp(),
  });
  return docRef.id;
}

export async function listarReceitas(uid) {
  const q = query(
    collection(db, 'receitas'),
    where('uid', '==', uid)
  );
  const snap = await getDocs(q);
  const lista = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  
  // Ordena no lado do cliente para evitar a necessidade de criar índices compostos no Firebase Console
  return lista.sort((a, b) => {
    const dataA = a.criadoEm?.seconds || 0;
    const dataB = b.criadoEm?.seconds || 0;
    return dataB - dataA;
  });
}

export async function atualizarReceita(id, dados) {
  await updateDoc(doc(db, 'receitas', id), {
    ...dados,
    atualizadoEm: serverTimestamp(),
  });
}

export async function deletarReceita(id) {
  await deleteDoc(doc(db, 'receitas', id));
}
