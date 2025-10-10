const API_MESSAGES_TO_ES: Record<string, string> = {
  "Este e-mail já possui um cadastro.": "Este correo electrónico ya tiene un registro.",
  "Usuário incluído com sucesso!": "¡Usuario añadido exitosamente!",
  "Você não tem permissão para incluir novos usuários.": "No tienes permiso para añadir nuevos usuarios.",
  "Usuário alterado com sucesso!": "¡Usuario alterado exitosamente!",
  "Você não tem permissão para definir você mesmo como administrador.": "No tienes permiso para configurarte como administrador.",
  "Livro incluído com sucesso!": "¡Libro incluido exitosamente!",
  "Livro alterado com sucesso!": "¡Libro alterado exitosamente!",
  "Já existe um cliente cadastrado com esse CPF": "Ya hay un cliente registrado con este NIE/DNI.",
  "Cliente incluído com sucesso!": "!Cliente añadido exitosamente!",
  "Cliente alterado com sucesso!": "¡Cliente alterado exitosamente!",
  "Usuário ou senha inválido.": "Usuario o contraseña no válidos.",
  "Usuário não existe.": "Usuario no existe.",
  "Você não tem permissão para alterar os usuários do sistema.": "No tienes permiso para cambiar usuarios del sistema.",
  "Você não tem permissão para consultar os usuários do sistema.": "No tienes permiso para consultar a los usuarios del sistema.",
  "Emprestimo incluído com sucesso!": "!Préstamo incluido exitosamente!",
  "Emprestimo alterado com sucesso!": "!Préstamo alterado exitosamente!"
}

export function translateMessages(message: string) {
  return API_MESSAGES_TO_ES[message] || message
}
