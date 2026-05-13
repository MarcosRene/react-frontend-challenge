import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { Toaster } from "@/shared/ui/sonner"
import "./index.css"
import { AppProviders } from "./app/providers"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProviders>
      <Toaster richColors duration={3000} />
    </AppProviders>
  </StrictMode>,
)
