import { apiBaseEntityName } from './apiBaseEntity';

export const apiMethodsName = {
  get: `Retrieves ${apiBaseEntityName}`,
  post: `Save ${apiBaseEntityName}`,
  put: `Upadte ${apiBaseEntityName}`,
  delete: `Remove ${apiBaseEntityName}`,
  service: `${apiBaseEntityName}`,
  '000': `Exito ${apiBaseEntityName}`,
};
