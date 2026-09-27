import { Link } from "@tanstack/react-router";
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <Link to="/" hash="inicio" className="brand" aria-label="Crochet, inicio"><span className="brand-mark" aria-hidden="true">✧</span><span className="brand-name">Crochet</span><span className="brand-mark" aria-hidden="true">✧</span></Link>
    <nav className="desktop-nav" aria-label="Navegación principal">
      <Link to="/" hash="inicio">Inicio</Link><Link to="/" hash="curso">Curso</Link><Link to="/" hash="lecciones">Lecciones</Link><Link to="/tutoriales-amigurumis">Tutoriales de Amigurumis</Link>
    </nav>
    <div className="header-actions"><Button variant="ghost" size="icon" aria-label="Buscar"><Search /></Button><span className="profile">AC</span><Button variant="ghost" size="icon" className="menu-toggle" onClick={()=>setOpen(!open)} aria-label="Abrir menú">{open?<X/>:<Menu/>}</Button></div>
    {open && <nav className="mobile-nav"><Link to="/" hash="inicio" onClick={()=>setOpen(false)}>Inicio</Link><Link to="/" hash="curso" onClick={()=>setOpen(false)}>Curso</Link><Link to="/" hash="lecciones" onClick={()=>setOpen(false)}>Lecciones</Link><Link to="/tutoriales-amigurumis" onClick={()=>setOpen(false)}>Tutoriales de Amigurumis</Link></nav>}
  </header>;
}