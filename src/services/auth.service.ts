import type { User } from '../types/movie.types';

const API_BASE_URL = 'http://www.ies-azarquiel.es/paco/apigafas';

type ApiUser = {
  id?: string | number;
  nick?: string;
  usuario?: string;
  email?: string;
  mail?: string;
  nombre?: string;
};

const mapApiUserToUser = (apiUser: ApiUser): User => {
  
  let username = 'user';
  if (apiUser.nick) {
    username = apiUser.nick;
  } else if (apiUser.usuario) {
    username = apiUser.usuario;
  } else if (apiUser.nombre) {
    username = apiUser.nombre;
  }
  
  
  let email = undefined;
  if (apiUser.email) {
    email = apiUser.email;
  } else if (apiUser.mail) {
    email = apiUser.mail;
  }
  
  
  let id = Date.now().toString();
  if (apiUser.id) {
    id = String(apiUser.id);
  }

  
  return {
    id,
    username,
    email,
  };
};

export const authService = {
  login: async (nick: string, pass: string): Promise<User> => {
    const response = await fetch(
      `${API_BASE_URL}/usuario?nick=${encodeURIComponent(nick)}&pass=${encodeURIComponent(pass)}`,
    );

    if (!response.ok) {
      throw new Error('Error fetching user');
    }

    const data = await response.json();

    if (!data || data.usuario === null) {
      throw new Error('Invalid credentials');
    }

    return mapApiUserToUser(data.usuario as ApiUser);
  },

  register: async (nick: string, pass: string): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/usuario`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nick, pass }),
    });

    if (!response.ok) {
      throw new Error('Registration error');
    }

    return authService.login(nick, pass);
  },

  
  saveUser: (user: User): void => {
    localStorage.setItem('moviehub_user', JSON.stringify(user));
  },

  
  getStoredUser: (): User | null => {
    const userStr = localStorage.getItem('moviehub_user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  
  logout: (): void => {
    localStorage.removeItem('moviehub_user');
  },
};