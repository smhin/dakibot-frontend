import {addIntentToContext, getIntents} from '../ApiHelper/IntentsApiHelper';


export function GetIntentsAction(projectId, userId) {
  return getIntents(projectId, userId);
}

export function AddIntentToContextAction(projectId, contextId, userId, data) {
  return addIntentToContext(projectId, contextId, userId,  data);
}
