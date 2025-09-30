import { ThemeProvider } from "./components/Theme-provider";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "sonner";
// import { UserProvider } from "./context/UserContext";

export default function App() {
  return (
    // <UserProvider>
    <ThemeProvider>
      <AppRoutes />
      {/* Toaster global, se recomienda colocarlo aquí al final */}
      <Toaster position="top-right" richColors />
    </ThemeProvider>
    // </UserProvider>
  );
}
