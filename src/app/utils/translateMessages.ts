const API_MESSAGES_TO_ES: Record<string, string> = {
  "Este e-mail já possui um cadastro.": "Este correo electrónico ya tiene un registro.",
  "Usuário incluído com sucesso!": "¡Usuario añadido exitosamente!",
  "Você não tem permissão para incluir novos usuários.": "No tienes permiso para añadir nuevos usuarios.",
  "Usuário alterado com sucesso!": "¡Usuario alterado exitosamente!",
  "Você não tem permissão para definir você mesmo como administrador.": "No tienes permiso para configurarte como administrador.",
  "Livro incluído com sucesso!": "¡Libro incluido exitosamente!"
}

export function translateMessages(message: string) {
  return API_MESSAGES_TO_ES[message] || message
}
