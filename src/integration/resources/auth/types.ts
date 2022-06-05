export enum USER_STATUS {
  AWAITING_CONFIRM_MOBILE = 1, // O cadastro do usuário realizado via aplicativo esta pendente de confirmação do numero do celular informado
  AWAITING_CONFIRM_EMAIL = 2, // O cadastro do usuário realizado via aplicativo esta pendente de confirmação de e-mail
  AWAITING_APPROVAL = 3, // Os dados do cadastro do usuário realizado via aplicativo/ETL esta pendente de ser avaliado pelo back-office
  FIRST_PASSWORD = 4, // O usuário esta pendente de definir a sua senha
  REFUSED = 5, // O backoffice apos avaliar os dados do usuário cadastrado via aplicativo, recusa o cadastro encerrando o fluxo
  AWAITING_ACCEPT_TERM = 6, // O usuário possui termo(s) pendente(s) de ser(em) aprovado(s)
  ACTIVE = 7, // O usuário possui acesso as features da aplicação
  INACTIVE = 8, // O usuário esta com o acesso suspenso
  DELETED = 9 // O usuário foi deletado logicamente da base, o mesmo não deve ser exibido nas listagens
}

export type PreAuthData = {
  id: string
  phone_number_cell: string
  status: USER_STATUS
}

export type PreAuthPayload = {
  email: string
  password: string
}

export type AuthData = {
  auth: {
    expires_at: string
    token: string
    type: string
  }
  user: {
    accepted_commitment_term_at?: string
    accepted_responsibility_term_at?: string
    name: string
    profile_image_url?: string
  }
}

export type AuthPayload = PreAuthPayload & {
  code: string
  slt: string
}
