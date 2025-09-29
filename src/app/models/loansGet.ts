import { Client } from "./client"

export interface LoansGet  {
  id: number
  idCliente: number
  dataEmprestimo: string
  dataEntrega: string
  entregue: boolean
  clienteDTO: Client
}
