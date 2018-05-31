import {
  addContextToProject,
  createProject,
  getContexts,
  getProject,
  getProjectsByUser
} from '../ApiHelper/ProjectApiHelper';


export function GetUserProjectsAction(userId) {
  return getProjectsByUser(userId);
}

export function CreateProjectAction(userId, data) {
  return createProject(userId, data);
}

export function GetProjectAction(projectId, userId) {
  return getProject(projectId, userId);
}

export function AddContextToProjectAction(projectId, userId, data) {
  return addContextToProject(projectId, userId, data);
}

export function GetContextsAction(projectId) {
  return getContexts(projectId);
}
