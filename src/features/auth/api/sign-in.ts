interface SignInBody {
  email: string
  password: string
}

export interface SignInResponse {
  token: string
  email: string
}

export async function signIn({
  email,
  password,
}: SignInBody): Promise<SignInResponse> {
  await new Promise((resolve) => setTimeout(resolve, 1500))

  if (email.trim() !== "" && password.trim() !== "") {
    return {
      email,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30",
    }
  }
}
