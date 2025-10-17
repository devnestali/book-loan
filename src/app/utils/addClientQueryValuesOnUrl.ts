import { HttpParams } from "@angular/common/http";
import { clientFilter } from "../models/clientFilter";

export function addClientQueryValuesOnUrl(clientFilter: clientFilter) {
  let params = new HttpParams()

  if (clientFilter.pageNumber && clientFilter.pageSize) {
    params = params.append('cpf', clientFilter.cpf)
    params = params.append('nome', clientFilter.nome)
    params = params.append('cidade', clientFilter.cidade)
    params = params.append('bairro', clientFilter.bairro)
    params = params.append('telefoneCelular', clientFilter.telefoneCelular)
    params = params.append('telefoneFixo', clientFilter.telefoneFixo)
    params = params.append('pageNumber', clientFilter.pageNumber)
    params = params.append('pageSize', clientFilter.pageSize)
  }

  return params
}
