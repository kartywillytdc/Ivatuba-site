import { db } from './firebase-config.js';
import { 
    collection, 
    doc, 
    getDoc, 
    getDocs, 
    setDoc, 
    updateDoc, 
    deleteDoc,
    query,
    orderBy,
    limit
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

export async function getUserData(userId) {
    try {
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
        }
        return { success: false, error: 'Usuário não encontrado' };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function updateUserData(userId, data) {
    try {
        await updateDoc(doc(db, 'users', userId), data);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function getAllUsers() {
    try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const users = [];
        querySnapshot.forEach((doc) => {
            users.push({ id: doc.id, ...doc.data() });
        });
        return { success: true, data: users };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function addProduct(productData) {
    try {
        const docRef = doc(collection(db, 'products'));
        await setDoc(docRef, {
            ...productData,
            createdAt: new Date().toISOString()
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function getAllProducts() {
    try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const products = [];
        querySnapshot.forEach((doc) => {
            products.push({ id: doc.id, ...doc.data() });
        });
        return { success: true, data: products };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function getAllWorkouts() {
    try {
        const querySnapshot = await getDocs(collection(db, 'workouts'));
        const workouts = [];
        querySnapshot.forEach((doc) => {
            workouts.push({ id: doc.id, ...doc.data() });
        });
        return { success: true, data: workouts };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function getRanking() {
    try {
        const q = query(
            collection(db, 'users'),
            orderBy('foguinhos', 'desc'),
            limit(100)
        );
        
        const querySnapshot = await getDocs(q);
        const ranking = [];
        querySnapshot.forEach((doc) => {
            ranking.push({ id: doc.id, ...doc.data() });
        });
        
        return { success: true, data: ranking };
    } catch (error) {
        return { success: false, error: error.message };
    }
}
