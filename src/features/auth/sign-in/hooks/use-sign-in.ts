import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { z } from "zod"
import { signIn } from "../../api/sign-in"

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "O e-mail é obrigatório" })
    .email({ message: "E-mail inválido" }),
  password: z
    .string()
    .min(1, { message: "A senha é obrigatória" })
    .min(6, { message: "Senha deve ter ao menos 6 caracteres" }),
})

export type SignInSchema = z.infer<typeof signInSchema>

export function useSignIn() {
  const navigate = useNavigate()

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { mutateAsync: signInFn, isPending } = useMutation({
    mutationFn: signIn,
    onSuccess: () => navigate("/dashboard"),
    onError: (error) => {
      toast.error(error.message || "Erro desconhecido")
    },
  })

  async function handleSignIn(data: SignInSchema) {
    await signInFn(data)
  }

  return {
    form,
    isPending,
    handleSignIn,
  }
}
