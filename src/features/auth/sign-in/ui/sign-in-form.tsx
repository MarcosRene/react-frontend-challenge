import { ViewIcon, ViewOffIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useState } from "react"
import { Controller } from "react-hook-form"

import { Button } from "@/shared/ui/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/shared/ui/field"
import { Input } from "@/shared/ui/input"
import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from "@/shared/ui/input-group"
import { Spinner } from "@/shared/ui/spinner"
import { useSignIn } from "../hooks/use-sign-in"

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false)
  const { form, isPending, handleSignIn } = useSignIn()

  const { handleSubmit } = form

  function handleTogglePassword() {
    setShowPassword((prevShowPassword) => !prevShowPassword)
  }

  return (
    <form
      onSubmit={handleSubmit(handleSignIn)}
      className="flex w-full max-w-sm flex-col items-center gap-10"
    >
      <div className="flex w-full flex-col items-center">
        <h1 className="mb-6 w-full text-center text-2xl font-bold tracking-tight">
          Acesse sua conta
        </h1>

        <div className="flex w-full flex-col space-y-4">
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="email">E-mail</FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    placeholder="Seu e-mail"
                    className="h-10"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <FieldGroup>
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="password">Senha</FieldLabel>
                  <InputGroup
                    className="h-10"
                    data-invalid={fieldState.invalid}
                  >
                    <InputGroupInput
                      {...field}
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="Sua senha"
                      aria-invalid={fieldState.invalid}
                    />

                    <InputGroupButton
                      variant="ghost"
                      size="icon-xs"
                      onClick={handleTogglePassword}
                      className="mr-1"
                    >
                      {showPassword ? (
                        <HugeiconsIcon icon={ViewIcon} className="size-3.5" />
                      ) : (
                        <HugeiconsIcon
                          icon={ViewOffIcon}
                          className="size-3.5"
                        />
                      )}
                    </InputGroupButton>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </div>
      </div>

      <Button type="submit" className="w-full h-10" disabled={isPending}>
        {isPending ? <Spinner data-icon="inline-start" /> : "Entrar"}
      </Button>
    </form>
  )
}
