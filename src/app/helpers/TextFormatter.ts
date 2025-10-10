export class TextFormatter {
  static formatCPF(cpf: string): string {
    cpf = cpf.replace(/\D/g, '') // remove non numeric characters
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }

  static formatLandline(phone: string): string {
    phone = phone.replace(/\D/g, '') // remove non numeric characters
    return phone.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '($1) $2 $3 $4')
  }

  static formatPhoneNumber(phone: string): string {
    phone = phone.replace(/\D/g, '') // remove non numeric characters
    return phone.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '($1) $2 $3 $4')
  }

  static formatNewDate(date: string): string {
    const dateObj = new Date(date)
    const day = String(dateObj.getDate()).padStart(2, '0')
    const month = String(dateObj.getMonth() + 1).padStart(2, '0')
    const year = dateObj.getFullYear()

    return `${day}/${month}/${year}`
  }
}
