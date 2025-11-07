'use server';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';

export async function verifyToken(token: string): Promise<boolean> {
  try {
    const response = await axios.get(`${API_URL}/auth/me`, {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });
    return response.status === 200;
  } catch (error) {
    return false;
  }
}

export async function getCurrentUser(token: string) {
  const { data } = await axios.get(`${API_URL}/auth/me`, {
    headers: { 
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  });
  return data;
}
