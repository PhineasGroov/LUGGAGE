import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/sections/CTASection";
import StatsSection from "@/components/sections/StatsSection";
import {
  Euro,
  TrendingUp,
  Calendar,
  Shield,
  Users,
  Star,
  Clock,
  CheckCircle,
  Smartphone,
  CreditCard,
  ArrowRight,
  Package,
} from "lucide-react";

export default function VoyageursPage() {
  const avantages = [
    {
      icon: Euro,
      title: "Revenus attractifs",
      description:
        "Gagnez entre 50€ et 200€ par voyage selon l'espace disponible. Voyageurs réguliers : jusqu'à 2400€/an.",
    },
    {
      icon: TrendingUp,
      title: "Monétisez votre routine",
      description:
        "Transformez vos voyages existants en source de revenus sans effort supplémentaire.",
    },
    {
      icon: Calendar,
      title: "Flexibilité totale",
      description:
        "Vous décidez quand, où et combien de colis transporter. Aucune obligation ni engagement.",
    },
    {
      icon: Shield,
      title: "Protection complète",
      description:
        "Assurance, vérification des colis et support juridique 24/7 pour votre tranquillité.",
    },
    {
      icon: Users,
      title: "Communauté de confiance",
      description:
        "Rejoignez 15 000+ voyageurs vérifiés et notés par la communauté.",
    },
    {
      icon: Smartphone,
      title: "Processus simple",
      description:
        "Application intuitive pour gérer vos trajets, colis et paiements en quelques clics.",
    },
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Inscription gratuite",
      description:
        "Créez votre profil en 5 minutes avec vérification d'identité sécurisée",
    },
    {
      step: "2",
      title: "Publiez vos trajets",
      description:
        "Indiquez vos itinéraires et dates. L'algorithme vous connecte automatiquement",
    },
    {
      step: "3",
      title: "Acceptez les demandes",
      description:
        "Consultez les détails, choisissez vos colis et négociez si besoin",
    },
    {
      step: "4",
      title: "Récupérez et transportez",
      description:
        "Rendez-vous au point de remise, vérifiez le contenu et voyagez normalement",
    },
    {
      step: "5",
      title: "Livrez et gagnez",
      description:
        "Remettez le colis et recevez votre paiement automatiquement sous 24h",
    },
  ];

  const temoignages = [
    {
      name: "Aminata D.",
      role: "Paris ↔ Dakar • 12 voyages",
      rating: 5,
      comment:
        "Je fais Paris-Dakar 3-4 fois par an pour ma famille. Avec Luggage, je couvre mes billets d'avion et aide ma communauté. Parfait !",
    },
    {
      name: "Jean-Marc B.",
      role: "Bruxelles ↔ Kinshasa • 8 voyages",
      rating: 5,
      comment:
        "Excellent complément de revenus ! J'ai gagné 1200€ en 6 mois simplement en transportant quelques kilos lors de mes voyages d'affaires.",
    },
    {
      name: "Fatou M.",
      role: "Lyon ↔ Abidjan • 15 voyages",
      rating: 5,
      comment:
        "Très rassurant avec les vérifications d'identité. Les expéditeurs sont sérieux et le paiement toujours ponctuel. Je recommande à 100% !",
    },
  ];

  const stats = [
    { value: "15k+", label: "Voyageurs actifs" },
    { value: "€150", label: "Gain moyen/voyage" },
    { value: "4.9", suffix: "/5", label: "Note moyenne" },
    { value: "98%", label: "Taux de satisfaction" },
  ];

  const earnings = [
    {
      corridor: "Paris → Dakar",
      weight: "5kg",
      price: "€80-120",
      duration: "6h",
    },
    {
      corridor: "Bruxelles → Kinshasa",
      weight: "8kg",
      price: "€120-180",
      duration: "8h",
    },
    {
      corridor: "Londres → Lagos",
      weight: "10kg",
      price: "€150-200",
      duration: "7h",
    },
    {
      corridor: "Amsterdam → Accra",
      weight: "7kg",
      price: "€100-150",
      duration: "6.5h",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 gradient-warm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-background/20 text-secondary-foreground rounded-full text-sm font-semibold mb-6">
              💼 Pour les Voyageurs
            </div>
            <h1 className="mb-6 text-secondary-foreground">
              Transformez vos voyages en revenus
            </h1>
            <p className="text-lg md:text-xl text-secondary-foreground/90 mb-8">
              Gagnez jusqu'à 200€ par voyage en transportant des colis dans votre
              bagage disponible. Simple, sécurisé et rentable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                size="lg"
                asChild
                className="bg-background text-foreground hover:bg-background/90"
              >
                <Link href="/contact">
                  Devenir voyageur
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-secondary-foreground text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary"
              >
                <Link href="/comment-ca-marche">Comment ça marche</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsSection
        stats={stats}
        title="Des chiffres qui parlent"
        description="Rejoignez une communauté active et satisfaite de voyageurs"
      />

      {/* Avantages */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">Pourquoi devenir voyageur Luggage ?</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Des avantages concrets pour tous vos voyages entre l'Europe et l'Afrique
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {avantages.map((avantage, index) => (
              <Card key={index} className="border-2 hover:border-secondary transition-smooth">
                <CardContent className="pt-6">
                  <div className="bg-secondary/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                    <avantage.icon className="h-7 w-7 text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{avantage.title}</h3>
                  <p className="text-muted-foreground">{avantage.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">Comment ça fonctionne ?</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              5 étapes simples pour commencer à gagner avec vos voyages
            </p>
          </div>
          <div className="grid md:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {howItWorks.map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-secondary text-secondary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-lg">
                  {item.step}
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Earnings Table */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">Exemples de gains par corridor</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Tarifs moyens pratiqués par nos voyageurs
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {earnings.map((earning, index) => (
              <Card key={index} className="border-2">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg mb-1">{earning.corridor}</h3>
                      <p className="text-sm text-muted-foreground">Durée : {earning.duration}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-secondary">{earning.price}</div>
                      <p className="text-sm text-muted-foreground">{earning.weight}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">Ils voyagent avec Luggage</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Des expériences réelles de notre communauté de voyageurs
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {temoignages.map((temoignage, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-3">
                    {[...Array(temoignage.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{temoignage.comment}"</p>
                  <div className="border-t pt-4">
                    <p className="font-bold">{temoignage.name}</p>
                    <p className="text-sm text-muted-foreground">{temoignage.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Prêt à transformer vos voyages en revenus ?"
        description="Inscrivez-vous gratuitement et commencez à gagner dès votre prochain voyage entre l'Europe et l'Afrique."
        primaryText="Devenir voyageur maintenant"
        primaryLink="/contact"
        secondaryText="En savoir plus"
        secondaryLink="/comment-ca-marche"
        variant="gradient"
      />

      <Footer />
    </div>
  );
}
