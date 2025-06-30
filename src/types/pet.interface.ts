import { User } from "./user.type";

export interface Pet {
  pet_id: string;
  user_id: string;
  name: string;
  species?: string;
  breed?: string;
  age?: number;
  medical_info?: string;
  createdAt: string;
  user?: User;
}

export interface CreatePetRequest {
  user_id: string;
  name: string;
  species?: string;
  breed?: string;
  age?: number;
  medical_info?: string;
}

export interface UpdatePetRequest {
  name?: string;
  species?: string;
  breed?: string;
  age?: number;
  medical_info?: string;
}