import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return <footer className="site-footer">
    <div className="brand"><span className="brand-mark" aria-hidden="true">✧</span><span className="brand-name">Crochet</span><span className="brand-mark" aria-hidden="true">✧</span></div>
    <nav className="footer-nav" aria-label="Pie de página">
      <Link to="/" hash="inicio">Inicio</Link><Link to="/" hash="curso">Curso</Link><Link to="/" hash="lecciones">Lecciones</Link><Link to="/tutoriales-amigurumis">Tutoriales de Amigurumis</Link>
    </nav>
    <p>© 2026 Crochet</p>
  </footer>;
}
