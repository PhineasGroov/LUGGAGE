import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/sections/CTASection";
import StatsSection from "@/components/sections/StatsSection";
import {
  Package,
  Shield,
  Clock,
  Euro,
  Users,
  Globe,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

const Home = () => {
  const features = [
    {
      icon: Euro,
      title: "Économique",
      description:
        "Jusqu'à 70% moins cher que les services traditionnels grâce au modèle collaboratif",
    },
    {
      icon: Clock,
      title: "Rapide",
      description:
        "Livraison en 3-7 jours avec des voyageurs réguliers sur votre corridor",
    },
    {
      icon: Shield,
      title: "Sécurisé",
      description:
        "Vérification d'identité, assurance complète et suivi en temps réel",
    },
    {
      icon: Users,
      title: "Communauté",
      description:
        "Rejoignez une communauté de confiance de voyageurs et expéditeurs vérifiés",
    },
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Publiez votre annonce",
      description:
        "Voyageurs annoncent leur itinéraire, expéditeurs leurs besoins",
    },
    {
      step: "2",
      title: "Trouvez votre match",
      description:
        "Connectez-vous avec des profils vérifiés sur votre corridor",
    },
    {
      step: "3",
      title: "Finalisez en sécurité",
      description:
        "Paiement sécurisé, remise en main propre et confirmation de livraison",
    },
  ];

  const stats = [
    { value: "50k+", label: "Colis livrés" },
    { value: "15k+", label: "Voyageurs actifs" },
    { value: "25", label: "Corridors actifs" },
    { value: "4.8", suffix: "/5", label: "Note moyenne" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 gradient-subtle opacity-50"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold mb-6">
                🚀 La révolution de la livraison collaborative
              </div>
              <h1 className="mb-6">
                Envoyez vos colis entre{" "}
                <span className="text-primary">l'Europe</span> et{" "}
                <span className="text-secondary">l'Afrique</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Connectez-vous avec des voyageurs vérifiés pour envoyer ou
                transporter des colis. Économique, rapide et sécurisé.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="ghost" size="xl" asChild>
                  <Link href="/comment-ca-marche">
                    Découvrir comment ça marche
                    <ArrowRight className="ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" size="xl" asChild>
                  <Link href="/contact">S'inscrire gratuitement</Link>
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span>Inscription gratuite</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span>Sans engagement</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 gradient-accent opacity-20 blur-3xl rounded-full"></div>
              <img
                src={"/assets/landing/hero-travelers.jpg"}
                alt="Voyageurs et colis dans un aéroport international"
                className="relative rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection stats={stats} />

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="mb-4">Pourquoi choisir Luggage ?</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Une alternative intelligente aux services de livraison
              traditionnels, pensée pour les besoins spécifiques entre l'Europe
              et l'Afrique
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-2 hover:border-primary transition-smooth hover:shadow-lg"
              >
                <CardContent className="pt-6">
                  <div className="bg-primary/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="mb-4">Comment ça marche ?</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Un processus simple en 3 étapes pour voyageurs et expéditeurs
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {howItWorks.map((item, index) => (
              <div key={index} className="relative text-center">
                <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
                {index < howItWorks.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-8 -right-12 h-8 w-8 text-muted-foreground/30" />
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="default" size="lg" asChild>
              <Link href="/comment-ca-marche">
                Voir le processus détaillé
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Dual CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="gradient-warm text-secondary-foreground border-0 shadow-xl hover:shadow-2xl transition-smooth">
              <CardContent className="p-8 md:p-10">
                <Package className="h-12 w-12 mb-4" />
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Vous voyagez ?
                </h3>
                <p className="mb-6 text-primary">
                  Monétisez votre espace bagage disponible et aidez votre
                  communauté tout en gagnant jusqu'à 200€ par voyage.
                </p>
                <Button
                  variant="secondary"
                  size="lg"
                  asChild
                  className="bg-background text-foreground hover:bg-background/90"
                >
                  <Link href="/voyageurs">
                    Devenir voyageur
                    <ArrowRight className="ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="gradient-hero text-primary-foreground border-0 shadow-xl hover:shadow-2xl transition-smooth">
              <CardContent className="p-8 md:p-10">
                <Globe className="h-12 w-12 mb-4" />
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Vous expédiez ?
                </h3>
                <p className="mb-6 text-primary">
                  Économisez jusqu'à 70% sur vos envois internationaux avec une
                  livraison rapide et sécurisée par des voyageurs de confiance.
                </p>
                <Button
                  variant="secondary"
                  size="lg"
                  asChild
                  className="bg-background text-foreground hover:bg-background/90"
                >
                  <Link href="/expediteurs">
                    Envoyer un colis
                    <ArrowRight className="ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection
        title="Prêt à rejoindre la révolution de la livraison collaborative ?"
        description="Inscrivez-vous gratuitement en 2 minutes et découvrez une nouvelle façon d'envoyer ou de transporter des colis entre l'Europe et l'Afrique."
        primaryText="Créer mon compte gratuitement"
        primaryLink="/contact"
        secondaryText="En savoir plus"
        secondaryLink="/comment-ca-marche"
        variant="gradient"
      />

      <Footer />
    </div>
  );
};

export default Home;
