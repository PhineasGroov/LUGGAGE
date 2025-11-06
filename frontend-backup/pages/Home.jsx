import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { travelAPI, packageAPI } from '../services/api';
import { motion } from 'framer-motion';
import {
  Package,
  Plane,
  Plus,
  TrendingUp,
  Clock,
  MapPin,
  Star,
  MessageSquare,
  CalendarClock,
  ArrowRight,
} from 'lucide-react';

const Home = () => {
  const { user } = useAuth();
  const userMode = user?.current_role || 'sender';

  // Data state
  const [loading, setLoading] = useState(true);
  const [packages, setPackages] = useState([]);
  const [travels, setTravels] = useState([]);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const [pkgRes, travelsRes] = await Promise.all([
          packageAPI.getMy().catch(() => packageAPI.getAll()), // fallback if my-packages not available
          travelAPI.getAll(),
        ]);
        if (!mounted) return;
        setPackages(pkgRes?.data || []);
        setTravels(travelsRes?.data || []);
      } catch (e) {
        // Keep graceful empty state
        console.warn('Home data fetch failed', e);
      } finally {
        mounted && setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const activePackages = useMemo(
    () => (Array.isArray(packages) ? packages.filter(p => !p.status || p.status !== 'delivered') : []),
    [packages],
  );

  const upcomingTravels = useMemo(() => {
    if (!Array.isArray(travels)) return [];
    const now = new Date();
    return travels
      .filter(t => (t.travel_date ? new Date(t.travel_date) : now) >= now)
      .sort((a, b) => new Date(a.travel_date || 0) - new Date(b.travel_date || 0))
      .slice(0, 3);
  }, [travels]);

  return (
    <div className="space-y-6 md:space-y-8 pb-8">
      {/* Hero + Right panel */}
      <div className="grid md:grid-cols-3 gap-4 md:gap-6">
        {/* Left hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="md:col-span-2 rounded-3xl bg-white border border-gray-200 p-6 sm:p-8 relative overflow-hidden"
        >
          <div className="absolute -right-8 -bottom-8 h-48 w-48 rounded-full bg-gradient-to-br from-blue-100 to-purple-100" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
            Envoyez vos colis avec confiance,
            <br className="hidden sm:block" />
            partout dans le monde.
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl">
            Une communauté de voyageurs vérifiés qui transportent vos colis de façon fiable et rapide.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link to="/explore">
              <Button size="lg" className="h-12 px-6 rounded-2xl shadow-lg">
                Trouver un voyageur
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <Link to="/create-trip">
              <Button size="lg" variant="secondary" className="h-12 px-6 rounded-2xl">
                Proposer un voyage
              </Button>
            </Link>
          </div>

          {/* Steps */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[{
              id: 1, label: 'Créez un compte'
            }, { id: 2, label: "Proposez un envoi ou un voyage" }, { id: 3, label: 'Échangez et confirmez' }].map((s) => (
              <div key={s.id} className="rounded-2xl border border-gray-200 bg-white p-4 flex items-start gap-3">
                <div className="h-8 w-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                  {s.id}
                </div>
                <div className="text-sm sm:text-base font-medium text-gray-800">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right panel dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="md:col-span-1 rounded-3xl text-white overflow-hidden"
          style={{ backgroundColor: '#0f1b2d' }}
        >
          <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
            <span className="font-bold tracking-wide">LUGGAGE</span>
            <CalendarClock className="w-5 h-5 text-white/70" />
          </div>

          <div className="p-5 space-y-4">
            <h3 className="text-xl font-semibold">Tableau de bord</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/10 p-4">
                <div className="text-3xl font-extrabold">{upcomingTravels.length}</div>
                <div className="text-sm text-white/80">Prochains voyages</div>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <div className="text-3xl font-extrabold">{activePackages.length}</div>
                <div className="text-sm text-white/80">Colis en cours</div>
              </div>
            </div>

            <div className="mt-3">
              <div className="text-sm font-semibold mb-2">Aperçu</div>
              <div className="space-y-2">
                {(loading ? Array.from({ length: 3 }) : upcomingTravels).map((t, idx) => (
                  <div
                    key={t?.id || idx}
                    className="rounded-xl bg-white/5 border border-white/10 p-3 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <Plane className="w-4 h-4 text-blue-200" />
                      <div className="text-sm">
                        <div className="font-medium">
                          {t?.origin || '—'} → {t?.destination || '—'}
                        </div>
                        <div className="text-xs text-white/70">
                          {t?.travel_date ? new Date(t.travel_date).toLocaleDateString() : 'à venir'}
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-yellow-400 text-black border-none">{t?.status || 'En attente'}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick actions */}
      <Card className="p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Actions rapides</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
          <Link to="/explore">
            <Button variant="outline" className="w-full h-16 sm:h-20 flex-col gap-1 sm:gap-2">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm">Explorer</span>
            </Button>
          </Link>
          <Link to="/chat">
            <Button variant="outline" className="w-full h-16 sm:h-20 flex-col gap-1 sm:gap-2">
              <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm">Messages</span>
            </Button>
          </Link>
          <Link to="/my-trips">
            <Button variant="outline" className="w-full h-16 sm:h-20 flex-col gap-1 sm:gap-2">
              {userMode === 'traveler' ? (
                <Plane className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Package className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
              <span className="text-xs sm:text-sm">{userMode === 'traveler' ? 'Mes voyages' : 'Mes colis'}</span>
            </Button>
          </Link>
          <Link to="/help">
            <Button variant="outline" className="w-full h-16 sm:h-20 flex-col gap-1 sm:gap-2">
              <Star className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm">Aide</span>
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Home;
