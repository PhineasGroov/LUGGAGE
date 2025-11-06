"use client";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Mail, Phone, MessageSquare, MapPin } from "lucide-react";
import { Form, Input, Button } from "antd";
const { TextArea } = Input;

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 gradient-subtle">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-6">Contactez-nous</h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Notre équipe est là pour répondre à toutes vos questions
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <h2 className="mb-6">Envoyez-nous un message</h2>
              <Card>
                <CardContent className="pt-6">
                  <Form layout="vertical" size="large">
                    <Form.Item
                      label="Nom complet"
                      name="name"
                      rules={[{ required: true, message: 'Veuillez entrer votre nom' }]}
                    >
                      <Input placeholder="Votre nom" />
                    </Form.Item>
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        { required: true, message: 'Veuillez entrer votre email' },
                        { type: 'email', message: 'Email invalide' }
                      ]}
                    >
                      <Input placeholder="votre@email.com" />
                    </Form.Item>
                    <Form.Item
                      label="Sujet"
                      name="subject"
                      rules={[{ required: true, message: 'Veuillez entrer un sujet' }]}
                    >
                      <Input placeholder="Comment pouvons-nous vous aider ?" />
                    </Form.Item>
                    <Form.Item
                      label="Message"
                      name="message"
                      rules={[{ required: true, message: 'Veuillez entrer votre message' }]}
                    >
                      <TextArea rows={6} placeholder="Décrivez votre demande..." />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="submit" size="large" block>
                        Envoyer le message
                      </Button>
                    </Form.Item>
                  </Form>
                </CardContent>
              </Card>
            </div>

            <div>
              <h2 className="mb-6">Autres moyens de contact</h2>
              <div className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <Mail className="h-6 w-6 text-primary flex-shrink-0" />
                      <div>
                        <h3 className="font-bold mb-1">Email</h3>
                        <p className="text-muted-foreground text-sm">contact@luggage.app</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <Phone className="h-6 w-6 text-primary flex-shrink-0" />
                      <div>
                        <h3 className="font-bold mb-1">Téléphone</h3>
                        <p className="text-muted-foreground text-sm">+33 1 23 45 67 89</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <MessageSquare className="h-6 w-6 text-primary flex-shrink-0" />
                      <div>
                        <h3 className="font-bold mb-1">Chat en direct</h3>
                        <p className="text-muted-foreground text-sm">Disponible 24/7 sur notre plateforme</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <MapPin className="h-6 w-6 text-primary flex-shrink-0" />
                      <div>
                        <h3 className="font-bold mb-1">Adresse</h3>
                        <p className="text-muted-foreground text-sm">123 Avenue des Champs-Élysées<br />75008 Paris, France</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
