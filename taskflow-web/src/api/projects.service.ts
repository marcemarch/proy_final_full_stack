import api from './axios';
import type { ApiResponse, Project, CreateProjectData } from '../types';

export const projectsService = {
    async getAll(): Promise<Project[]> {
        const res = await api.get<ApiResponse<Project[]>>('/projects');
        return res.data.data; // ← doble .data: Axios + ApiResponse
    },
    async getById(id: string): Promise<Project> {
        const res = await api.get<ApiResponse<Project>>(`/projects/${id}`);
        return res.data.data;
    },
    async create(data: CreateProjectData): Promise<Project> {
        const res = await api.post<ApiResponse<Project>>('/projects', data);
        return res.data.data;
    },
    async update(id: string, data: {
        name: string;
        description?: string;
    }): Promise<Project>{
        const response = await api.put(`/projects/${id}`, data);
        return response.data.data;
    },
    async remove(id: string): Promise<void> {
        await api.delete(`/projects/${id}`);
    },
};