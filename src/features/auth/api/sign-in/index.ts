interface SignInRequest {
  email: string
  password: string
}

export async function signIn({ email, password }: SignInRequest) {
  // Simulating an API call
  await new Promise((resolve) => setTimeout(resolve, 1500))

  if (email === "admin@admin.com" && password === "password123") {
    const token = "fake-jwt-token"
    localStorage.setItem("libris:token", token)
    return { token }
  }

  throw new Error("Credenciais inválidas")
}
