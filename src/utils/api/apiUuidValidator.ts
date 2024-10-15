export class UUIDValidator {
  // Método para validar si el UUID es válido
  public static isValidUUID(uuid: string): boolean {
    // Expresión regular para validar un UUID en formato estándar
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  }
}