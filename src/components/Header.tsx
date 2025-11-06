import { Building2 } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center gap-3">
          <Building2 className="h-8 w-8" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">TEKNA WINDOW SYSTEM</h1>
            <p className="text-sm text-primary-foreground/80">Professional Window Configurator</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
