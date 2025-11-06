import type { Metadata } from 'next';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/sections/CTASection";
import {
  Shield,
  Lock,
  CreditCard,
  CheckCircle,
  DollarSign,
  FileCheck,
  Users,
  Eye,
  Phone,
  ShieldCheck,
  Building2,
  Clock,
} from "lucide-react";

export const metadata: Metadata = {
  title: 'Sécurité et Confiance - Protection des Envois Luggage',
  description: 'Découvrez les mesures de sécurité Luggage : vérification d\'identité, assurance jusqu\'\u00e0 500€, paiement sécurisé, conformité RGPD. Voyageurs vérifiés et processus transparent pour des envois en toute confiance.',
  keywords: ['sécurité envoi colis', 'assurance livraison', 'vérification voyageur', 'paiement sécurisé', 'conformité RGPD'],
  openGraph: {
    title: 'Sécurité et Confiance - Luggage',
    url: 'https://luggage-delivery.com/securite',
    images: [{url: '/images/og-securite.jpg', width: 1200, height: 630}],
  },
};

export default function SecuritePage() {
  const mesuresSecurite = [
    {
      icon: CreditCard,
      title: "Vérification d'identité",
      description:
        "Tous les membres doivent fournir une pièce d'identité valide. Processus de vérification en 3 étapes avec validation manuelle.",
      color: "primary",
    },
    {
      icon: CheckCircle,
      title: "Système de notation",
      description:
        "Chaque transaction est notée et commentée. Les profils avec mauvaises évaluations sont suspendus automatiquement.",
      color: "secondary",
    },
    {
      icon: DollarSign,
      title: "Paiement sécurisé",
      description:
        "Les fonds sont bloqués en dépôt de garantie jusqu'à confirmation de livraison. Protection totale pour voyageurs et expéditeurs.",
      color: "accent",
    },
    {
      icon: FileCheck,
      title: "Assurance complète",
      description:
        "Tous les colis sont assurés jusqu'à 500€. Protection contre la perte, le vol et les dommages avec remboursement sous 10 jours.",
      color: "primary",
    },
    {
      icon: Users,
      title: "Support 24/7",
      description:
        "Équipe dédiée disponible en permanence pour répondre aux urgences et résoudre tout problème rapidement.",
      color: "secondary",
    },
    {
      icon: Eye,
      title: "Suivi en temps réel",
      description:
        "Notifications à chaque étape du processus. Historique complet de chaque transaction conservé de manière sécurisée.",
      color: "accent",
    },
  ];

  const processusVerification = [
    {
      etape: "1",
      titre: "Inscription",
      description:
        "Création du profil avec email, numéro de téléphone et informations de base.",
    },
    {
      etape: "2",
      titre: "Vérification identité",
      description:
        "Upload de pièce d'identité (CNI, passeport) et selfie de vérification.",
    },
    {
      etape: "3",
      titre: "Validation manuelle",
      description:
        "Notre équipe vérifie chaque document sous 24h. Détection de fraude automatique.",
    },
    {
      etape: "4",
      titre: "Badge vérifié",
      description:
        "Attribution du badge vérifié ✓ visible sur le profil public.",
    },
  ];

  const protectionsColis = [
    {
      icon: ShieldCheck,
      titre: "Inspection obligatoire",
      description:
        "Le voyageur doit vérifier le contenu du colis à la remise et confirmer qu'il correspond à la description.",
    },
    {
      icon: Building2,
      titre: "Assurance automatique",
      description:
        "Couverture jusqu'à 500€ incluse gratuitement. Option d'extension disponible pour valeurs supérieures.",
    },
    {
      icon: FileCheck,
      titre: "Contrat signé",
      description:
        "Reçu de remise et de livraison signé électroniquement par les deux parties à chaque étape.",
    },
    {
      icon: Phone,
      titre: "Signalement immédiat",
      description:
        "Bouton d'urgence dans l'app pour signaler tout problème. Réponse de notre équipe sous 30 minutes.",
    },
  ];

  const interdictions = [
    "Armes, munitions et explosifs",
    "Drogues et substances illégales",
    "Produits périssables non autorisés",
    "Médicaments sur ordonnance (sauf autorisation)",
    "Contrefaçons et produits piratés",
    "Animaux vivants",
    "Matières dangereuses et produits chimiques",
    "Objets volés ou d'origine douteuse",
  ];

  const stats = [
    {
      value: "100%",
      label: "Membres vérifiés",
    },
    {
      value: "€10M+",
      label: "Transactions sécurisées",
    },
    {
      value: "<0.1%",
      label: "Taux d'incident",
    },
    {
      value: "24/7",
      label: "Support disponible",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 gradient-subtle">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Shield className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="mb-6">Sécurité et Confiance</h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Votre sécurité est notre priorité absolue. Découvrez toutes les
              mesures mises en place pour protéger vos transactions.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mesures de sécurité */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">Nos mesures de sécurité</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Un système complet pour garantir la sécurité de chaque transaction
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mesuresSecurite.map((mesure, index) => (
              <Card key={index} className="border-2 hover:shadow-lg transition-smooth">
                <CardContent className="pt-6">
                  <div className={`bg-${mesure.color}/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4`}>
                    <mesure.icon className={`h-7 w-7 text-${mesure.color}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{mesure.title}</h3>
                  <p className="text-muted-foreground text-sm">{mesure.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Processus de vérification */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">Processus de vérification</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Comment nous vérifions l'identité de chaque membre
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {processusVerification.map((etape, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-lg">
                  {etape.etape}
                </div>
                <h3 className="font-bold mb-2">{etape.titre}</h3>
                <p className="text-sm text-muted-foreground">{etape.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Protection des colis */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">Protection de vos colis</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Garanties et assurances pour chaque envoi
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {protectionsColis.map((protection, index) => (
              <Card key={index} className="text-center border-2">
                <CardContent className="pt-6">
                  <div className="bg-accent/10 w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <protection.icon className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="font-bold mb-2">{protection.titre}</h3>
                  <p className="text-sm text-muted-foreground">{protection.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Objets interdits */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Lock className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h2 className="mb-4">Objets strictement interdits</h2>
              <p className="text-lg text-muted-foreground">
                Pour la sécurité de tous, ces objets ne peuvent pas être transportés
                via Luggage
              </p>
            </div>
            <Card className="border-2 border-destructive/20">
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {interdictions.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="text-destructive mt-1">✗</div>
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Note importante :</strong> Le transport d'objets interdits
                    entraîne la suspension immédiate du compte et peut faire l'objet de
                    poursuites judiciaires. En cas de doute, contactez notre support.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Que faire en cas de problème */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="mb-4">Que faire en cas de problème ?</h2>
              <p className="text-lg text-muted-foreground">
                Notre équipe est là pour vous aider à chaque étape
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Phone className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h3 className="font-bold mb-2">Support immédiat</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Contactez notre équipe 24/7 via chat, email ou téléphone
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/contact">Nous contacter</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <FileCheck className="h-10 w-10 text-secondary mx-auto mb-4" />
                  <h3 className="font-bold mb-2">Réclamation</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Déposez une réclamation officielle dans votre espace membre
                  </p>
                  <Button variant="outline" size="sm" disabled>
                    Espace membre
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Clock className="h-10 w-10 text-accent mx-auto mb-4" />
                  <h3 className="font-bold mb-2">Médiation</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Processus de médiation gratuit en cas de litige
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/comment-ca-marche">En savoir plus</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Voyagez et expédiez en toute confiance"
        description="Rejoignez une plateforme où la sécurité et la confiance sont au cœur de chaque transaction."
        primaryText="Créer mon compte sécurisé"
        primaryLink="/contact"
        secondaryText="Questions fréquentes"
        secondaryLink="/comment-ca-marche"
        variant="gradient"
      />

      <Footer />
    </div>
  );
}
