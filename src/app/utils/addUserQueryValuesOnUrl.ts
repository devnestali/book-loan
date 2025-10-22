import { HttpParams } from "@angular/common/http";
import { UserFilter } from "../models/userFilter";

export function addUserQueryValuesOnUrl(userFilter: UserFilter) {
  let params = new HttpParams()

  if (userFilter.pageNumber && userFilter.pageSize) {
    params = params.append('nome', userFilter.nome)
    params = params.append('email', userFilter.email)
    params = params.append('isAdmin', userFilter.isAdmin)
    params = params.append('isNotAdmin', userFilter.isNotAdmin)
    params = params.append('ativo', userFilter.ativo)
    params = params.append('inativo', userFilter.inativo)
    params = params.append('pageNumber', userFilter.pageNumber)
    params = params.append('pageSize', userFilter.pageSize)
  }

  return params
}
