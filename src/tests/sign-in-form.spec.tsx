import { screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { SignInForm } from "@/features/auth/ui/sign-in-form"
import { renderWithProviders } from "@/shared/test/render"

describe("SignInForm", () => {
  it("deve renderizar os campos corretamente", () => {
    renderWithProviders(<SignInForm />)

    expect(screen.getByRole("textbox", { name: /email/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument()
  })

  it("deve preencher formulário", async () => {
    const user = userEvent.setup()
    renderWithProviders(<SignInForm />)

    const emailInput = screen.getByRole("textbox", { name: /email/i })
    const passwordInput = screen.getByLabelText(/password/i)

    await user.type(emailInput, "john@doe.com")
    await user.type(passwordInput, "123456")

    expect(emailInput).toHaveValue("john@doe.com")
    expect(passwordInput).toHaveValue("123456")
  })

  it("deve exibir erro quando o e-mail for vazio", async () => {
    const user = userEvent.setup()
    renderWithProviders(<SignInForm />)

    const submitButton = screen.getByRole("button", { name: /entrar/i })
    await user.click(submitButton)

    expect(
      await screen.findByText("O e-mail é obrigatório"),
    ).toBeInTheDocument()
  })

  it("deve exibir erro quando o e-mail for inválido", async () => {
    const user = userEvent.setup()
    renderWithProviders(<SignInForm />)

    const emailInput = screen.getByRole("textbox", { name: /email/i })
    await user.type(emailInput, "email-invalido")

    const submitButton = screen.getByRole("button", { name: /entrar/i })
    await user.click(submitButton)

    expect(await screen.findByText("E-mail inválido")).toBeInTheDocument()
  })

  it("deve exibir erro quando a senha for vazia", async () => {
    const user = userEvent.setup()
    renderWithProviders(<SignInForm />)

    const submitButton = screen.getByRole("button", { name: /entrar/i })
    await user.click(submitButton)

    expect(await screen.findByText("A senha é obrigatória")).toBeInTheDocument()
  })

  it("deve exibir erro quando a senha tiver menos que 6 caracteres", async () => {
    const user = userEvent.setup()
    renderWithProviders(<SignInForm />)

    const passwordInput = screen.getByLabelText(/password/i)
    await user.type(passwordInput, "123")

    const submitButton = screen.getByRole("button", { name: /entrar/i })
    await user.click(submitButton)

    expect(
      await screen.findByText("Senha deve ter ao menos 6 caracteres"),
    ).toBeInTheDocument()
  })
})
