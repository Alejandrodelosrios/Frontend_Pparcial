import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface BarraBusquedaProps{
value: string;
onChange: (value: string) => void;
}

export function BarraBusqueda({value,onChange}:BarraBusquedaProps){
 return(
        <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 h-4 w-4" />
        <Input
          placeholder="Buscar..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-9"
        />
        </div>
       );
}