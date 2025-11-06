import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/sections/CTASection";
import {
  TrendingDown,
  Clock,
  Shield,
  CheckCircle,
  Package,
  Users,
  Star,
  ArrowRight,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Expéditeurs - Envoi de Colis Économique Europe-Afrique',
  description: 'Envoyez vos colis entre l\'Europe et l\'Afrique jusqu\'à 60% moins cher que DHL, FedEx ou La Poste. Livraison en 2-5 jours avec suivi GPS. Plus de 10,000 colis livrés en toute sécurité.',
  keywords: ['envoi colis pas cher', 'expédition Europe Afrique', 'alternative DHL', 'livraison économique', 'colis international'],
  openGraph: {
    title: 'Expéditeurs - Envoi de Colis Économique avec Luggage',
    description: 'Économisez jusqu\'à 60% sur vos envois de colis entre l\'Europe et l\'Afrique.',
    url: 'https://luggage-delivery.com/expediteurs',
    images: [{url: '/images/og-expediteurs.jpg', width: 1200, height: 630}],
  },
};

export default function ExpediteursPage() {
  const avantages = [
    {
      icon: TrendingDown,
      title: "Jusqu'à 70% d'économie",
      description:
        "Divisez vos coûts d'envoi par 3 par rapport à DHL, FedEx ou La Poste.",
    },
    {
      icon: Clock,
      title: "Livraison rapide",
      description:
        "3-7 jours ouvrés en moyenne grâce à des voyageurs réguliers sur votre corridor.",
    },
    {
      icon: Shield,
      title: "100% sécurisé",
      description:
        "Assurance complète, voyageurs vérifiés et paiement en dépôt de garantie.",
    },
    {
      icon: Users,
      title: "Réseau étendu",
      description:
        "15 000+ voyageurs actifs sur 25 corridors entre l'Europe et l'Afrique.",
    },
    {
      icon: Package,
      title: "Suivi en temps réel",
      description:
        "Notifications à chaque étape et localisation du voyageur disponible.",
    },
    {
      icon: CheckCircle,
      title: "Support dédié",
      description:
        "Équipe disponible 24/7 pour répondre à vos questions et résoudre tout problème.",
    },
  ];

  const useCases = [
    {
      title: "Cadeaux familiaux",
      description:
        "Vêtements, jouets, produits cosmétiques pour vos proches en Afrique.",
      icon: Package,
    },
    {
      title: "Documents importants",
      description:
        "Papiers administratifs, diplômes, contrats nécessitant remise sécurisée.",
      icon: Shield,
    },
    {
      title: "Petits commerces",
      description:
        "Stock de marchandises, échantillons, produits pour micro-entreprises.",
      icon: Users,
    },
    {
      title: "Objets personnels",
      description:
        "Affaires oubliées, souvenirs, petits appareils électroniques.",
      icon: Star,
    },
  ];

  const temoignages = [
    {
      name: "Marie K.",
      location: "Paris → Abidjan",
      rating: 5,
      comment:
        "J'envoie régulièrement des colis à ma famille. Avec Luggage, je paie 3 fois moins cher et c'est plus rapide ! Le voyageur était très professionnel.",
    },
    {
      name: "Ibrahim S.",
      location: "Londres → Lagos",
      rating: 5,
      comment:
        "Service exceptionnel ! Mon colis de 8kg est arrivé en 5 jours pour 45€ au lieu de 180€ avec DHL. Je recommande vivement Luggage.",
    },
    {
      name: "Sophie L.",
      location: "Bruxelles → Dakar",
      rating: 5,
      comment:
        "Très rassurant d'avoir un suivi personnalisé et de pouvoir échanger avec le voyageur. Le colis est arrivé intact et à l'heure.",
    },
  ];

  const steps = [
    {
      title: "Créez votre demande",
      description:
        "Décrivez votre colis (contenu, poids, dimensions) et choisissez votre corridor.",
    },
    {
      title: "Trouvez un voyageur",
      description:
        "Consultez les profils vérifiés et les dates de voyage disponibles.",
    },
    {
      title: "Convenez des détails",
      description:
        "Négociez le prix, lieu et heure de remise avec le voyageur choisi.",
    },
    {
      title: "Payez en sécurité",
      description:
        "Le paiement est bloqué jusqu'à la confirmation de livraison.",
    },
    {
      title: "Remettez votre colis",
      description:
        "Rendez-vous au point convenu pour remettre votre colis au voyageur.",
    },
    {
      title: "Suivez la livraison",
      description:
        "Recevez des notifications à chaque étape jusqu'à la livraison confirmée.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-background/20 text-primary-foreground rounded-full text-sm font-semibold mb-6">
              📦 Pour les Expéditeurs
            </div>
            <h1 className="mb-6 text-primary-foreground">
              Envoyez vos colis jusqu'à 70% moins cher
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
              Une alternative économique, rapide et sécurisée aux services
              traditionnels pour vos envois entre l'Europe et l'Afrique.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                size="lg"
                asChild
                className="bg-background text-foreground hover:bg-background/90"
              >
                <Link href="/contact">
                  Envoyer un colis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <Link href="/comment-ca-marche">Comment ça marche</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">Pourquoi choisir Luggage ?</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Une solution d'envoi pensée pour vos besoins spécifiques
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {avantages.map((avantage, index) => (
              <Card key={index} className="border-2 hover:border-primary transition-smooth">
                <CardContent className="pt-6">
                  <div className="bg-primary/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                    <avantage.icon className="h-7 w-7 text-primary" />
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
            <h2 className="mb-4">Comment envoyer un colis ?</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              6 étapes simples pour envoyer votre colis en toute sécurité
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-lg">
                  {index + 1}
                </div>
                <h3 className="font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">Que pouvez-vous envoyer ?</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Des solutions adaptées à tous vos besoins d'envoi
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="text-center border-2">
                <CardContent className="pt-6">
                  <div className="bg-accent/10 w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <useCase.icon className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{useCase.title}</h3>
                  <p className="text-sm text-muted-foreground">{useCase.description}</p>
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
            <h2 className="mb-4">Ils envoient avec Luggage</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Des expériences réelles de nos expéditeurs satisfaits
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
                    <p className="text-sm text-muted-foreground">{temoignage.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Prêt à envoyer votre premier colis ?"
        description="Créez votre demande gratuitement et trouvez un voyageur fiable pour votre corridor dès aujourd'hui."
        primaryText="Envoyer un colis maintenant"
        primaryLink="/contact"
        secondaryText="Voir les destinations"
        secondaryLink="/destinations"
        variant="gradient"
      />

      <Footer />
    </div>
  );
}
