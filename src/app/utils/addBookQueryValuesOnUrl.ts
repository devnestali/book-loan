import { HttpParams } from "@angular/common/http";
import { BookFilter } from "../models/bookFilter";

export function addBookQueryValuesOnUrl(bookFilter: BookFilter) {
  let params = new HttpParams()

  if (bookFilter.pageNumber && bookFilter.pageSize) {
    params = params.append('nome', bookFilter.nome)
    params = params.append('autor', bookFilter.autor)
    params = params.append('editora', bookFilter.editora)
    params = params.append('anoPublicacao', bookFilter.anoPublicacao)
    params = params.append('edicao', bookFilter.edicao)
    params = params.append('pageNumber', bookFilter.pageNumber)
    params = params.append('pageSize', bookFilter.pageSize)
  }

  return params
}
