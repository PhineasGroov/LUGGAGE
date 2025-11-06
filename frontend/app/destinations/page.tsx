import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/sections/CTASection";
import {
  MapPin,
  TrendingUp,
  Users,
  Package,
  Clock,
  Star,
  Plane,
  ArrowRight,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Destinations - Réseau de Livraison Europe-Afrique',
  description: 'Découvrez notre réseau de destinations couvrant 15 pays européens et 25 pays africains. Paris, Lyon, Marseille vers Dakar, Abidjan, Bamako, Kinshasa et plus. Nouveaux corridors en expansion.',
  keywords: ['destinations luggage', 'villes desservies', 'corridors Europe Afrique', 'réseau livraison'],
  openGraph: {
    title: 'Destinations - Réseau Luggage Europe-Afrique',
    url: 'https://luggage-delivery.com/destinations',
    images: [{url: '/images/og-destinations.jpg', width: 1200, height: 630}],
  },
};

export default function DestinationsPage() {
  const corridors = [
    {
      region: "Afrique de l'Ouest",
      countries: [
        {
          name: "Sénégal",
          capital: "Dakar",
          routes: [
            { from: "Paris", time: "6h", price: "80-120€", freq: "Quotidien" },
            { from: "Bruxelles", time: "6.5h", price: "85-125€", freq: "4x/sem" },
            { from: "Madrid", time: "5h", price: "75-110€", freq: "3x/sem" },
          ],
          travelers: "2.1k+",
          parcels: "8.5k+",
          rating: 4.8,
        },
        {
          name: "Côte d'Ivoire",
          capital: "Abidjan",
          routes: [
            { from: "Paris", time: "6.5h", price: "90-130€", freq: "Quotidien" },
            { from: "Lyon", time: "7h", price: "95-135€", freq: "3x/sem" },
            { from: "Bruxelles", time: "7h", price: "90-130€", freq: "3x/sem" },
          ],
          travelers: "1.8k+",
          parcels: "7.2k+",
          rating: 4.7,
        },
      ],
    },
    {
      region: "Afrique Centrale",
      countries: [
        {
          name: "RD Congo",
          capital: "Kinshasa",
          routes: [
            { from: "Bruxelles", time: "8h", price: "120-180€", freq: "5x/sem" },
            { from: "Paris", time: "8.5h", price: "125-185€", freq: "Quotidien" },
            {
              from: "Amsterdam",
              time: "8h",
              price: "120-180€",
              freq: "3x/sem",
            },
          ],
          travelers: "3.2k+",
          parcels: "12k+",
          rating: 4.9,
        },
        {
          name: "Cameroun",
          capital: "Douala/Yaoundé",
          routes: [
            { from: "Paris", time: "7h", price: "100-150€", freq: "Quotidien" },
            { from: "Bruxelles", time: "7.5h", price: "105-155€", freq: "4x/sem" },
          ],
          travelers: "1.5k+",
          parcels: "5.8k+",
          rating: 4.6,
        },
      ],
    },
    {
      region: "Afrique de l'Est",
      countries: [
        {
          name: "Kenya",
          capital: "Nairobi",
          routes: [
            { from: "Londres", time: "8.5h", price: "130-190€", freq: "Quotidien" },
            { from: "Paris", time: "9h", price: "135-195€", freq: "5x/sem" },
          ],
          travelers: "900+",
          parcels: "3.2k+",
          rating: 4.5,
        },
      ],
    },
    {
      region: "Afrique du Nord",
      countries: [
        {
          name: "Maroc",
          capital: "Casablanca",
          routes: [
            { from: "Paris", time: "3h", price: "50-80€", freq: "Quotidien" },
            { from: "Madrid", time: "2h", price: "45-75€", freq: "Quotidien" },
            { from: "Bruxelles", time: "3.5h", price: "55-85€", freq: "Quotidien" },
          ],
          travelers: "2.8k+",
          parcels: "11k+",
          rating: 4.8,
        },
        {
          name: "Algérie",
          capital: "Alger",
          routes: [
            { from: "Paris", time: "2.5h", price: "60-90€", freq: "Quotidien" },
            { from: "Lyon", time: "2.5h", price: "60-90€", freq: "5x/sem" },
            { from: "Marseille", time: "2h", price: "55-85€", freq: "Quotidien" },
          ],
          travelers: "2.5k+",
          parcels: "9.8k+",
          rating: 4.7,
        },
      ],
    },
  ];

  const stats = [
    { icon: MapPin, value: "25", label: "Corridors actifs" },
    { icon: Plane, value: "350+", label: "Vols hebdomadaires" },
    { icon: Users, value: "15k+", label: "Voyageurs réguliers" },
    { icon: Package, value: "50k+", label: "Colis livrés" },
  ];

  const expansion = [
    {
      region: "Afrique de l'Ouest",
      countries: ["Mali (Bamako)", "Guinée (Conakry)", "Burkina Faso (Ouagadougou)"],
      timeline: "Q2 2025",
    },
    {
      region: "Afrique Australe",
      countries: ["Afrique du Sud (Johannesburg)", "Zimbabwe (Harare)"],
      timeline: "Q3 2025",
    },
    {
      region: "Afrique de l'Est",
      countries: ["Tanzanie (Dar es Salaam)", "Ouganda (Kampala)"],
      timeline: "Q4 2025",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 gradient-subtle">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <MapPin className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="mb-6">Nos Destinations</h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              25 corridors actifs connectant les principales villes d'Europe et
              d'Afrique. Découvrez où nous livrons et les opportunités disponibles.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corridors par région */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">Corridors actifs par région</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Tarifs indicatifs pour un colis de 5kg. Prix finaux négociables avec le
              voyageur.
            </p>
          </div>

          <div className="space-y-16">
            {corridors.map((region, regionIndex) => (
              <div key={regionIndex}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-1 w-12 bg-primary rounded"></div>
                  <h3 className="text-2xl md:text-3xl font-bold">{region.region}</h3>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {region.countries.map((country, countryIndex) => (
                    <Card
                      key={countryIndex}
                      className="border-2 hover:border-primary transition-smooth hover:shadow-xl"
                    >
                      <CardContent className="pt-6">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-6">
                          <div>
                            <h4 className="text-2xl font-bold mb-1">
                              {country.name}
                            </h4>
                            <p className="text-muted-foreground">
                              {country.capital}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 bg-accent/10 px-3 py-1 rounded-full">
                            <Star className="h-4 w-4 fill-accent text-accent" />
                            <span className="font-bold text-accent">
                              {country.rating}
                            </span>
                          </div>
                        </div>

                        {/* Routes */}
                        <div className="space-y-4 mb-6">
                          {country.routes.map((route, routeIndex) => (
                            <div
                              key={routeIndex}
                              className="bg-muted rounded-lg p-4"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Plane className="h-4 w-4 text-primary" />
                                  <span className="font-semibold">
                                    {route.from} → {country.capital}
                                  </span>
                                </div>
                                <span className="text-sm text-muted-foreground">
                                  {route.freq}
                                </span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-4">
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span>{route.time}</span>
                                  </div>
                                  <div className="text-primary font-bold">
                                    {route.price}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Stats */}
                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="text-center flex-1">
                            <div className="text-lg font-bold text-secondary">
                              {country.travelers}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Voyageurs
                            </div>
                          </div>
                          <div className="w-px h-8 bg-border"></div>
                          <div className="text-center flex-1">
                            <div className="text-lg font-bold text-primary">
                              {country.parcels}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Colis livrés
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expansion prévue */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <TrendingUp className="h-12 w-12 text-secondary mx-auto mb-4" />
            <h2 className="mb-4">Expansion prévue</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              De nouveaux corridors en cours de lancement pour élargir notre réseau
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {expansion.map((plan, index) => (
              <Card key={index} className="border-2 border-secondary/30">
                <CardContent className="pt-6">
                  <div className="bg-secondary/10 px-3 py-1 rounded-full inline-block mb-4">
                    <span className="text-secondary font-bold text-sm">
                      {plan.timeline}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-4">{plan.region}</h3>
                  <ul className="space-y-2">
                    {plan.countries.map((country, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                        <span>{country}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Votre destination n'est pas listée ?
            </p>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact">Suggérer une nouvelle destination</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">Carte interactive des corridors</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Visualisez tous nos corridors actifs entre l'Europe et l'Afrique
            </p>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-2xl p-12 md:p-24 border-2 border-dashed border-primary/20">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-primary mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-4">Carte interactive</h3>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Une carte interactive complète avec tous les corridors, statistiques
                  et options de filtrage sera disponible prochainement dans votre
                  espace membre.
                </p>
                <Button variant="default" size="lg" asChild>
                  <Link href="/contact">
                    S'inscrire pour accéder
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Prêt à explorer nos destinations ?"
        description="Que vous soyez voyageur ou expéditeur, trouvez le corridor qui vous convient parmi nos 25 destinations actives."
        primaryText="Commencer maintenant"
        primaryLink="/contact"
        secondaryText="Comment ça marche"
        secondaryLink="/comment-ca-marche"
        variant="gradient"
      />

      <Footer />
    </div>
  );
}
