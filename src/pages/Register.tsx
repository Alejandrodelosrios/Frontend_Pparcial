import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usuarioSocketService } from "@/services/UsuarioSocket.service";
import { PathNames } from "@/routes/paths";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";

export default function Register() {
  const navigate = useNavigate();

  //estados
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
   const [loading, setLoading] = useState(false);

  const handleEmailRegister = async () => {
    // Validaciones
    if (!name || !email || !password || !confirmPassword){
      toast.error("todos los campos son obligatorios");
      return; 
    } 
    if(password.length < 8){
      toast.error("la contraseña debe tener al menos 8 caracteres");
      return;
    } 
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    setError(""); // limpiar error si todo está bien
    setLoading(true) 
    try{
     usuarioSocketService.createUsuario( {nombre: name,correo:email,contraseña:password}, (response: any) => {
       setLoading(false);

       if (!response.success) {
         toast.error("Error en el registro: " + response.error.message);
       } else {
         toast.success("Registro exitoso");

         if(response.token){
           localStorage.setItem("token",response.token);
           localStorage.setItem("id_usuario", response.usuario.id);
         }
         navigate(PathNames.HOME);
       }
     });
    } catch(err){
      setLoading(false);
      toast.error("Error en el registro. Inténtalo de nuevo.");
    }
  };

 return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 transition-colors px-4">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Registro</CardTitle>
          <CardDescription>Crea tu cuenta para continuar</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Input
            placeholder="Nombre completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <Input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button 
            className="w-full" 
            onClick={handleEmailRegister} 
            disabled={loading} // deshabilitar mientras carga
          >
           {loading ? "Registrando..." : "Registrarse"} 
          </Button>
          <p className="text-sm text-slate-600 dark:text-slate-300 text-center">
            ¿Ya tienes cuenta?{" "}
            <Link
              to={PathNames.LOGIN}
              className="text-blue-500 hover:underline"
            >
              Iniciar sesión
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}