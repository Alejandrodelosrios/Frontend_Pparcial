export const PathNames={
  WELCOME: "/welcome", 
  LOGIN: "/login",
  REGISTER: "/register",
  HOME: "/home",
  DIAGRAMA: (id?: string) => (id ? `/diagrama/${id}` : "/diagrama/:id"),
  ENDPOINT_GENERADO: "/endpoint_generado",
  HISTORIAL_CAMBIOS: "/historial_cambios",
  RESTORE_VERSION: "/restore_version",
}as const;

// Si quieres un tipo para autocompletar:
export type RoutePath = (typeof PathNames)[keyof typeof PathNames];