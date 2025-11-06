import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/sections/CTASection";
import { 
  Target, 
  Heart, 
  Users, 
  Globe, 
  Leaf, 
  TrendingUp, 
  ArrowRight 
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'À Propos - Notre Mission et Vision | Luggage',
  description: 'Découvrez l\'histoire de Luggage, startup franco-africaine qui révolutionne la livraison de colis entre l\'Europe et l\'Afrique. Notre mission : connecter les diasporas et démocratiser l\'accès aux envois internationaux.',
  keywords: ['à propos luggage', 'mission', 'vision', 'startup franco-africaine', 'équipe'],
  openGraph: {
    title: 'À Propos de Luggage',
    url: 'https://luggage-delivery.com/a-propos',
    images: [{url: '/images/og-apropos.jpg', width: 1200, height: 630}],
  },
};

export default function AProposPage() {
  const values = [
    { icon: Heart, title: "Communauté", description: "Connecter les personnes au-delà des frontières" },
    { icon: Globe, title: "Accessibilité", description: "Livraison internationale pour tous" },
    { icon: Leaf, title: "Durabilité", description: "Optimiser les voyages existants" },
  ];

  const impact = [
    { value: "50k+", label: "Colis livrés", icon: TrendingUp },
    { value: "€2M+", label: "Économisés par nos utilisateurs", icon: TrendingUp },
    { value: "15k+", label: "Membres actifs", icon: Users },
    { value: "25", label: "Corridors Europe-Afrique", icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 gradient-subtle">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-6">À propos de Luggage</h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Nous réinventons la livraison internationale en connectant voyageurs et expéditeurs pour un service économique, rapide et durable.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Target className="h-12 w-12 text-primary mb-6 mx-auto" />
            <h2 className="mb-6">Notre Mission</h2>
            <p className="text-lg text-muted-foreground mb-4">
              Luggage est né d&apos;un constat simple : des milliers de voyageurs effectuent quotidiennement des trajets entre l&apos;Europe et l&apos;Afrique avec de l&apos;espace bagage disponible, tandis que des expéditeurs cherchent des solutions abordables pour envoyer des colis.
            </p>
            <p className="text-lg text-muted-foreground">
              Notre mission est de connecter ces deux communautés pour créer une alternative collaborative aux services de livraison traditionnels, tout en générant des revenus complémentaires pour les voyageurs.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">Nos Valeurs</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <Card key={index} className="text-center border-2">
                <CardContent className="pt-6">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">Notre Impact</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {impact.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="h-10 w-10 text-secondary mx-auto mb-4" />
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Rejoignez l'aventure Luggage"
        description="Faites partie d'une communauté qui révolutionne la livraison entre l'Europe et l'Afrique."
        primaryText="S'inscrire maintenant"
        primaryLink="/contact"
        secondaryText="Découvrir nos destinations"
        secondaryLink="/destinations"
        variant="gradient"
      />
      <Footer />
    </div>
  );
}
