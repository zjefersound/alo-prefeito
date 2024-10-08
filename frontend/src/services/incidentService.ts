import { Incident } from "../models/Incident";
import { IPaginatedResponse } from "../models/IPaginatedResponse";
import { api } from "./api";

const path = "/incidents";
export interface IncidentsResponse extends IPaginatedResponse {
  incidents: Incident[];
}

export type IncidentPayload = {
  title: string;
  content: string;
  categoryId: string;
  latitude: number;
  longitude: number;
};
function create(payload: IncidentPayload) {
  return api.post<IncidentsResponse>(path, payload);
}

interface PaginatedOptions {
  page: number;
  perPage: number;
}
function getAll({ page, perPage }: PaginatedOptions) {
  return api.get<IncidentsResponse>(path, { params: { page, perPage } });
}

function getById(id: string) {
  return api.get<{ incident: Incident }>(`${path}/${id}`);
}

function getLatestIncidents() {
  return api.get<IncidentsResponse>(`${path}/latest`);
}

function getIncidentsFromUser() {
  return api.get<IncidentsResponse>(`/users${path}`);
}

function deleteIncident(id: string) {
  return api.delete(`${path}/${id}`);
}

export const incidentService = {
  create,
  delete: deleteIncident,
  getAll,
  getById,
  getIncidentsFromUser,
  getLatestIncidents,
};
