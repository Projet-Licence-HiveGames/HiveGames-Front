// frontend/src/services/userService.ts
const API_URL = 'http://localhost:5000/api/users';

// Typage de la réponse API
interface User {
    id: number;
    name: string;
}

async function getUsers(): Promise<User[]> {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Erreur lors de la récupération des utilisateurs');
    }
    return response.json();
}

export default {
    getUsers
};