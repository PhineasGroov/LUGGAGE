import { useEffect, useMemo, useState } from 'react';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import EmptyState from '../components/ui/empty-state';
import { travelAPI } from '../services/api';
import { Plane, Search, Calendar } from 'lucide-react';

export default function Explore() {
  const [allTravels, setAllTravels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState({ origin: '', destination: '', date: '' });

  useEffect(() => {
    const load = async () => {
      try {
        const res = await travelAPI.getAll();
        setAllTravels(res.data || []);
      } catch (e) {
        console.warn('Explore fetch failed', e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    return (allTravels || []).filter((t) => {
      const okOrigin = q.origin ? (t.origin || '').toLowerCase().includes(q.origin.toLowerCase()) : true;
      const okDest = q.destination ? (t.destination || '').toLowerCase().includes(q.destination.toLowerCase()) : true;
      const okDate = q.date ? new Date(t.travel_date).toDateString() === new Date(q.date).toDateString() : true;
      return okOrigin && okDest && okDate;
    });
  }, [allTravels, q]);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="p-4 sm:p-6">
        <div className="grid sm:grid-cols-3 gap-3">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Origin</label>
            <Input placeholder="Paris" value={q.origin} onChange={(e) => setQ({ ...q, origin: e.target.value })} className="h-11 rounded-xl" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Destination</label>
            <Input placeholder="Dakar" value={q.destination} onChange={(e) => setQ({ ...q, destination: e.target.value })} className="h-11 rounded-xl" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Date</label>
            <Input type="date" value={q.date} onChange={(e) => setQ({ ...q, date: e.target.value })} className="h-11 rounded-xl" />
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <Button variant="secondary" className="rounded-xl">
            <Search className="w-4 h-4 mr-1" />
            Search
          </Button>
        </div>
      </Card>

      {/* Results */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={<Plane className="w-12 h-12 text-blue-600" />}
          title="No trips found"
          description="Try adjusting your filters or come back later."
          className="bg-gradient-to-br from-white to-blue-50 border-blue-100"
        />
      ) : (
        <div className="grid gap-4">
          {filtered.map((t) => (
            <Card key={t.id} className="p-5 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-blue-50">
                  <Plane className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{t.origin} → {t.destination}</div>
                  <div className="text-sm text-gray-600 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(t.travel_date).toLocaleDateString()}
                  </div>
                </div>
                <Button className="rounded-xl">Ask to carry</Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
