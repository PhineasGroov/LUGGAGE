import type { Metadata } from 'next';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Collapse } from "antd";
import type { CollapseProps } from "antd";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/sections/CTASection";
import {
  UserPlus,
  Search,
  MessageSquare,
  Handshake,
  CreditCard,
  Package,
  CheckCircle,
  Shield,
  Clock,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: 'Comment Ça Marche - Guide Complet Luggage',
  description: 'Découvrez comment Luggage fonctionne en 3 étapes simples. Guide détaillé pour voyageurs et expéditeurs : inscription, recherche, livraison. FAQ et conseils pratiques pour un envoi de colis réussi entre l\'Europe et l\'Afrique.',
  keywords: ['comment envoyer colis', 'processus livraison collaborative', 'tutoriel luggage', 'guide expédition colis', 'fonctionnement transport collaboratif'],
  openGraph: {
    title: 'Comment Ça Marche - Guide Complet Luggage',
    description: 'Découvrez en 3 étapes comment envoyer vos colis entre l\'Europe et l\'Afrique avec Luggage.',
    url: 'https://luggage-delivery.com/comment-ca-marche',
    type: 'article',
    images: [
      {
        url: '/images/og-comment-ca-marche.jpg',
        width: 1200,
        height: 630,
        alt: 'Comment Ça Marche - Luggage',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Comment Ça Marche - Guide Complet Luggage',
    description: 'Découvrez en 3 étapes comment envoyer vos colis entre l\'Europe et l\'Afrique avec Luggage.',
    images: ['/images/twitter-comment-ca-marche.jpg'],
  },
};

export default function CommentCaMarchePage() {
  const stepsVoyageurs = [
    {
      icon: UserPlus,
      title: "Inscrivez-vous gratuitement",
      description:
        "Créez votre profil voyageur en quelques minutes. Vérification d'identité obligatoire pour garantir la sécurité de tous.",
    },
    {
      icon: Package,
      title: "Publiez votre itinéraire",
      description:
        "Indiquez vos dates de voyage, villes de départ/arrivée et espace bagage disponible. Précisez vos conditions et tarifs.",
    },
    {
      icon: Search,
      title: "Recevez des demandes",
      description:
        "Les expéditeurs vous contactent avec leurs besoins. Consultez les détails du colis et acceptez ceux qui vous conviennent.",
    },
    {
      icon: MessageSquare,
      title: "Communiquez avec l'expéditeur",
      description:
        "Échangez via notre messagerie sécurisée pour organiser la remise du colis et confirmer tous les détails.",
    },
    {
      icon: Handshake,
      title: "Récupérez le colis",
      description:
        "Rendez-vous au point de rencontre convenu. Vérifiez le contenu déclaré et signez le reçu de remise.",
    },
    {
      icon: CheckCircle,
      title: "Livrez et soyez payé",
      description:
        "Remettez le colis au destinataire avec confirmation. Le paiement est automatiquement libéré sur votre compte Luggage.",
    },
  ];

  const stepsExpediteurs = [
    {
      icon: UserPlus,
      title: "Créez votre compte",
      description:
        "Inscription rapide et gratuite. Renseignez vos coordonnées et préférences de livraison pour faciliter vos futurs envois.",
    },
    {
      icon: Package,
      title: "Décrivez votre colis",
      description:
        "Indiquez le contenu, dimensions, poids, valeur et corridor souhaité (Paris-Dakar, Bruxelles-Kinshasa, etc.).",
    },
    {
      icon: Search,
      title: "Trouvez votre voyageur",
      description:
        "Parcourez les profils vérifiés de voyageurs disponibles sur votre corridor. Consultez leurs évaluations et tarifs.",
    },
    {
      icon: MessageSquare,
      title: "Négociez et confirmez",
      description:
        "Contactez le voyageur pour discuter des détails. Convenez du prix, dates et modalités de remise/livraison.",
    },
    {
      icon: CreditCard,
      title: "Payez en sécurité",
      description:
        "Effectuez le paiement via notre système sécurisé. L'argent est conservé en dépôt de garantie jusqu'à la livraison confirmée.",
    },
    {
      icon: Handshake,
      title: "Remettez le colis",
      description:
        "Rendez-vous au point convenu pour remettre votre colis au voyageur. Signez le reçu et suivez votre envoi en temps réel.",
    },
  ];

  const garanties = [
    {
      icon: Shield,
      title: "Assurance complète",
      description: "Tous les colis sont assurés jusqu'à 500€",
    },
    {
      icon: CheckCircle,
      title: "Vérification d'identité",
      description: "Tous les membres sont vérifiés et notés",
    },
    {
      icon: Clock,
      title: "Support 24/7",
      description: "Équipe disponible pour toute question",
    },
  ];

  const faqVoyageursItems: CollapseProps['items'] = [
    {
      key: '1',
      label: "Combien puis-je gagner en transportant des colis ?",
      children: (
        <p className="text-muted-foreground">
          Vos gains dépendent du corridor, du poids et de la distance. En moyenne, les voyageurs gagnent entre 50€ et 200€ par voyage pour transporter 5-10kg de colis. Certains voyageurs réguliers peuvent gagner jusqu'à 2400€ par an.
        </p>
      ),
    },
    {
      key: '2',
      label: "Que se passe-t-il si mon vol est annulé ?",
      children: (
        <p className="text-muted-foreground">
          En cas d'annulation de vol, vous devez immédiatement informer l'expéditeur via l'application. Le colis peut être reporté sur un autre voyage ou annulé sans pénalité. L'expéditeur sera remboursé intégralement.
        </p>
      ),
    },
    {
      key: '3',
      label: "Puis-je refuser un colis après l'avoir accepté ?",
      children: (
        <p className="text-muted-foreground">
          Oui, vous pouvez annuler jusqu'à 24h avant la date de remise prévue sans pénalité. Après ce délai, des frais d'annulation de 20% peuvent s'appliquer pour compenser le désagrément de l'expéditeur.
        </p>
      ),
    },
    {
      key: '4',
      label: "Comment suis-je protégé en cas de problème ?",
      children: (
        <p className="text-muted-foreground">
          Tous les colis sont assurés et vous bénéficiez d'une protection juridique complète. Notre équipe support est disponible 24/7 pour vous assister. En cas de litige, notre processus de médiation garantit une résolution équitable.
        </p>
      ),
    },
  ];

  const faqExpediteursItems: CollapseProps['items'] = [
    {
      key: '1',
      label: "Combien coûte l'envoi d'un colis via Luggage ?",
      children: (
        <p className="text-muted-foreground">
          Les prix varient selon le corridor, le poids et la valeur déclarée. En moyenne, comptez 30-40€ pour un colis de 5kg entre Paris et Abidjan, soit 60-70% moins cher que les services traditionnels. Le tarif final est fixé d'un commun accord avec le voyageur.
        </p>
      ),
    },
    {
      key: '2',
      label: "Quels types de colis puis-je envoyer ?",
      children: (
        <p className="text-muted-foreground">
          Vous pouvez envoyer la plupart des objets personnels : vêtements, produits cosmétiques, électronique, documents, etc. Les produits interdits incluent : substances illégales, armes, produits périssables non autorisés, liquides inflammables. Consultez notre liste complète dans les CGU.
        </p>
      ),
    },
    {
      key: '3',
      label: "Comment puis-je suivre mon colis ?",
      children: (
        <p className="text-muted-foreground">
          Une fois le colis remis au voyageur, vous recevez des notifications à chaque étape : colis récupéré, en transit (embarqué), arrivé à destination, livré. Le voyageur peut également partager sa localisation en temps réel via l'application.
        </p>
      ),
    },
    {
      key: '4',
      label: "Que faire si mon colis n'arrive pas ou est endommagé ?",
      children: (
        <p className="text-muted-foreground">
          Tous les colis sont assurés jusqu'à 500€. En cas de perte, vol ou dommage, déposez une réclamation dans les 48h suivant la date de livraison prévue. Notre équipe enquête et vous indemnise sous 5-10 jours ouvrés selon les résultats.
        </p>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 gradient-subtle">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-6">Comment fonctionne Luggage ?</h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Un processus simple et sécurisé en quelques étapes, que vous soyez
              voyageur ou expéditeur
            </p>
          </div>
        </div>
      </section>

      {/* Pour les Voyageurs */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold mb-4">
              Pour les Voyageurs
            </div>
            <h2 className="mb-4">Monétisez votre espace bagage</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Transformez vos voyages en opportunité de revenus en 6 étapes
              simples
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {stepsVoyageurs.map((step, index) => (
              <Card
                key={index}
                className="relative border-2 hover:border-secondary transition-smooth"
              >
                <CardContent className="pt-6">
                  <div className="absolute -top-4 left-6 bg-secondary text-secondary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                    {index + 1}
                  </div>
                  <div className="bg-secondary/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                    <step.icon className="h-7 w-7 text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="cta" size="lg" asChild>
              <Link href="/voyageurs">
                En savoir plus sur les voyageurs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Pour les Expéditeurs */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
              Pour les Expéditeurs
            </div>
            <h2 className="mb-4">Envoyez vos colis en toute confiance</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Un processus rapide et économique pour envoyer vos colis
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {stepsExpediteurs.map((step, index) => (
              <Card
                key={index}
                className="relative border-2 hover:border-primary transition-smooth"
              >
                <CardContent className="pt-6">
                  <div className="absolute -top-4 left-6 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                    {index + 1}
                  </div>
                  <div className="bg-primary/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                    <step.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="default" size="lg" asChild>
              <Link href="/expediteurs">
                En savoir plus sur les expéditeurs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Garanties */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">Nos garanties pour votre tranquillité</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              La sécurité et la confiance sont au cœur de notre plateforme
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {garanties.map((garantie, index) => (
              <div key={index} className="text-center">
                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <garantie.icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-2">{garantie.title}</h3>
                <p className="text-muted-foreground">{garantie.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">Questions fréquentes</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Trouvez rapidement les réponses à vos questions
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* FAQ Voyageurs */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-secondary">
                Pour les voyageurs
              </h3>
              <Collapse 
                items={faqVoyageursItems}
                className="bg-background"
                bordered={false}
              />
            </div>

            {/* FAQ Expéditeurs */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-primary">
                Pour les expéditeurs
              </h3>
              <Collapse 
                items={faqExpediteursItems}
                className="bg-background"
                bordered={false}
              />
            </div>
          </div>
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Vous avez d'autres questions ?
            </p>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact">Contactez notre support</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Prêt à commencer ?"
        description="Rejoignez des milliers de voyageurs et expéditeurs qui font confiance à Luggage pour leurs envois entre l'Europe et l'Afrique."
        primaryText="S'inscrire maintenant"
        primaryLink="/contact"
        secondaryText="Explorer les destinations"
        secondaryLink="/destinations"
        variant="gradient"
      />

      <Footer />
    </div>
  );
}
