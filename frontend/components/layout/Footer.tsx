import Link from "next/link";
import { Package, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    platform: [
      { name: "Comment ça marche", href: "/comment-ca-marche" },
      { name: "Pour les voyageurs", href: "/voyageurs" },
      { name: "Pour les expéditeurs", href: "/expediteurs" },
      { name: "Destinations", href: "/destinations" },
    ],
    company: [
      { name: "À propos", href: "/a-propos" },
      { name: "Sécurité", href: "/securite" },
      { name: "Contact", href: "/contact" },
    ],
    legal: [
      { name: "Conditions d'utilisation", href: "/contact" },
      { name: "Politique de confidentialité", href: "/contact" },
      { name: "Mentions légales", href: "/contact" },
    ],
  };

  const social = [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
  ];

  return (
    <footer className="bg-muted border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 group mb-4">
              <div className="bg-primary rounded-lg p-2 group-hover:bg-primary-light transition-smooth">
                <Package className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Luggage</span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              La plateforme collaborative qui connecte voyageurs et expéditeurs pour une livraison de colis économique, rapide et sécurisée entre l&apos;Europe et l&apos;Afrique.
            </p>
            <div className="flex gap-4">
              {social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="p-2 rounded-lg bg-background hover:bg-primary hover:text-primary-foreground transition-smooth"
                  aria-label={item.name}
                >
                  <item.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Plateforme */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Plateforme</h3>
            <ul className="space-y-3">
              {links.platform.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-smooth"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Entreprise */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Entreprise</h3>
            <ul className="space-y-3">
              {links.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-smooth"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Légal */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Légal</h3>
            <ul className="space-y-3">
              {links.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-smooth"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Luggage. Tous droits réservés.
            </p>
            <p className="text-sm text-muted-foreground">
              Fait avec ❤️ pour connecter l&apos;Europe et l&apos;Afrique
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
