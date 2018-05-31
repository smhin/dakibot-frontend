import {createLanguage, getLanguage, getLanguages} from "../ApiHelper/LanguageApiHelper";


export function GetLanguagesAction() {
    return getLanguages();
}

export function GetLanguageAction(id) {
  return getLanguage(id);
}

export function CreateLanguageAction(data) {
  return createLanguage(data);
}
