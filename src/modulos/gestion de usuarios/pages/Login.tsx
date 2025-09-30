import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";
import { usuarioSocketService } from "@/services/UsuarioSocket.service";
import { Link, useNavigate } from "react-router-dom";
import { PathNames } from "@/routes/paths";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailLogin = async () => {
    if (!email || !password) {
      toast.error("Todos los campos son obligatorios");
      return;
    }
    setLoading(true);

    try {
     // 🔹 Llamada al backend vía WebSockets
     usuarioSocketService.login({correo: email,contraseña: password}, (response: any) => {
      setLoading(false);

      if (!response.success) {
        toast.error("Credenciales inválidas ");
      } else {
        toast.success("Sesión iniciada con éxito ");

        // 🔹 Si backend devuelve un token, guárdalo
        if (response.token) {
          localStorage.setItem("token", response.token);
          localStorage.setItem("id_usuario", response.usuario.id);
        }

         navigate(PathNames.HOME);
       }
       });
      } catch (err) {
        setLoading(false);
       toast.error("Error al conectar con el servidor");
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 transition-colors px-4">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Iniciar sesión</CardTitle>
          <CardDescription>Accede a tu cuenta</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <Input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button 
            className="w-full" 
            onClick={handleEmailLogin}
            disabled={loading}
          >
            {loading ? "Iniciando..." : "Iniciar sesión"}
          </Button>
          <p className="text-sm text-slate-600 dark:text-slate-300 text-center">
            ¿No tienes cuenta?{" "}
            <Link
              to={PathNames.REGISTER}
              className="text-blue-500 hover:underline"
            >
              Regístrate
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}