export interface UserFilter {
  nome: string
  email: string
  isAdmin: boolean
  isNotAdmin: boolean
  ativo: boolean
  inativo: boolean
  pageNumber: number
  pageSize: number
}
