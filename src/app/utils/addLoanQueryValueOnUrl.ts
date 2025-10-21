import { HttpParams } from "@angular/common/http";
import { LoanFilter } from "../models/loanFilter";

export function addLoanQueryValueOnUrl(loanFilter: LoanFilter) {
  let params = new HttpParams()

  if (loanFilter.pageNumber && loanFilter.pageSize) {
    params = params.append('cpf', loanFilter.cpf)
    params = params.append('nome', loanFilter.nome)
    params = params.append('dataEmprestimoInicio', loanFilter.dataEmprestimoInicio)
    params = params.append('dataEmprestimoFim', loanFilter.dataEmprestimoFim)
    params = params.append('dataEntregaInicio', loanFilter.dataEntregaInicio)
    params = params.append('dataEntregaFim', loanFilter.dataEntregaFim)
    params = params.append('entregue', loanFilter.entregue)
    params = params.append('naoEntregue', loanFilter.naoEntregue)
    params = params.append('pageNumber', loanFilter.pageNumber)
    params = params.append('pageSize', loanFilter.pageSize)
  }

  return params
}
