export type SignupFormData = {
  name: string
  email: string
  password: string
  confirmPassword: string
  role: string
  company?: string
}

export type LoginFormData = {
  email: string
  password: string
}