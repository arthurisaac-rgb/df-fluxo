import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TrafficMap } from './components/TrafficMap';
import { AlertsPanel } from './components/AlertsPanel';
import { KPICard } from './components/KPICard';
import { TrafficChart } from './components/TrafficChart';
import { FilterPanel, FilterState } from './components/FilterPanel';
import { LiveStats } from './components/LiveStats';
import { Clock, Camera, AlertTriangle, TrendingUp } from 'lucide-react';

export default function App() {
  const [filters, setFilters] = useState<FilterState>({
    region: 'Todas as Regiões',
    severity: ['low', 'medium', 'high'],
    showCameras: true
  });

  return (
    <div className="size-full flex bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-6">

          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard
              title="Tempo Médio de Resposta"
              value="7.2 min"
              icon={Clock}
              trend={{ value: '65%', positive: true }}
              color="bg-blue-600"
            />
            <KPICard
              title="Câmeras Ativas"
              value="142"
              icon={Camera}
              color="bg-green-600"
            />
            <KPICard
              title="Incidentes Detectados"
              value="4"
              icon={AlertTriangle}
              trend={{ value: '12%', positive: false }}
              color="bg-orange-600"
            />
            <KPICard
              title="Congestionamentos Previstos"
              value="2"
              icon={TrendingUp}
              color="bg-purple-600"
            />
          </div>

          {/* Live Stats */}
          <LiveStats />

          {/* Filters and Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <FilterPanel onFilterChange={setFilters} />
            </div>
            <div className="lg:col-span-3">
              <TrafficChart />
            </div>
          </div>

          {/* Map and Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Map - takes 2 columns */}
            <div className="lg:col-span-2 h-[600px]">
              <TrafficMap filters={filters} />
            </div>

            {/* Alerts Panel - takes 1 column */}
            <div className="h-[600px]">
              <AlertsPanel />
            </div>
          </div>

          {/* Legend */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="mb-4">Legenda do Mapa de Calor</h3>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span className="text-sm">Tráfego Fluido (&gt;50 km/h)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                <span className="text-sm">Tráfego Moderado (30-50 km/h)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                <span className="text-sm">Congestionamento (&lt;30 km/h)</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
import { Map, AlertCircle, BarChart3, Settings, Activity } from 'lucide-react';
import { useState } from 'react';

const menuItems = [
  { id: 'map', icon: Map, label: 'Mapa de Calor' },
  { id: 'alerts', icon: AlertCircle, label: 'Alertas' },
  { id: 'analytics', icon: BarChart3, label: 'Análises' },
  { id: 'monitoring', icon: Activity, label: 'Monitoramento' },
  { id: 'settings', icon: Settings, label: 'Configurações' },
];

export function Sidebar() {
  const [activeItem, setActiveItem] = useState('map');

  return (
    <div className="bg-gradient-to-b from-purple-900 to-purple-800 text-white h-full flex flex-col shadow-xl">
      <div className="p-6 border-b border-purple-700">
        <h1 className="text-2xl mb-1">DF FLUXO</h1>
        <p className="text-sm text-purple-200">Sistema Inteligente de Tráfego</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveItem(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeItem === item.id
                    ? 'bg-purple-700 shadow-md'
                    : 'hover:bg-purple-800/50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-purple-700">
        <div className="text-xs text-purple-200">
          <p>DETRAN-DF • DER-DF • PMDF</p>
          <p className="mt-1">Última atualização: Agora</p>
        </div>
      </div>
    </div>
  );
}
import { useState } from 'react';
import { Camera } from 'lucide-react';

interface TrafficPoint {
  id: string;
  x: number;
  y: number;
  location: string;
  level: 'low' | 'medium' | 'high';
  vehicles: number;
  speed: number;
  cameraId: string;
}

const trafficData: TrafficPoint[] = [
  { id: '1', x: 350, y: 180, location: 'Eixo Rodoviário Norte', level: 'high', vehicles: 342, speed: 15, cameraId: 'CAM-001' },
  { id: '2', x: 370, y: 250, location: 'EPNB (DF-047)', level: 'high', vehicles: 298, speed: 18, cameraId: 'CAM-047' },
  { id: '3', x: 180, y: 280, location: 'Via Taguatinga', level: 'medium', vehicles: 156, speed: 35, cameraId: 'CAM-TAG' },
  { id: '4', x: 120, y: 240, location: 'Ceilândia Centro', level: 'medium', vehicles: 178, speed: 32, cameraId: 'CAM-CEI' },
  { id: '5', x: 420, y: 200, location: 'Plano Piloto', level: 'low', vehicles: 89, speed: 52, cameraId: 'CAM-PP1' },
  { id: '6', x: 360, y: 320, location: 'Eixo Rodoviário Sul', level: 'high', vehicles: 315, speed: 20, cameraId: 'CAM-002' },
  { id: '7', x: 160, y: 380, location: 'Samambaia', level: 'medium', vehicles: 142, speed: 38, cameraId: 'CAM-SAM' },
  { id: '8', x: 440, y: 140, location: 'Lago Norte', level: 'low', vehicles: 67, speed: 58, cameraId: 'CAM-LN1' },
];

interface TrafficMapProps {
  filters: {
    severity: string[];
    showCameras: boolean;
  };
}

const getColor = (level: 'low' | 'medium' | 'high') => {
  switch (level) {
    case 'low': return '#10b981';
    case 'medium': return '#f59e0b';
    case 'high': return '#ef4444';
  }
};

const getStatusText = (level: 'low' | 'medium' | 'high') => {
  switch (level) {
    case 'low': return 'Fluido';
    case 'medium': return 'Moderado';
    case 'high': return 'Congestionado';
  }
};

export function TrafficMap({ filters }: TrafficMapProps) {
  const [selectedPoint, setSelectedPoint] = useState<TrafficPoint | null>(null);

  const filteredData = trafficData.filter(point =>
    filters.severity.includes(point.level)
  );

  return (
    <div className="h-full w-full bg-white rounded-lg shadow-lg overflow-hidden relative">
      <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow">
        <h3 className="text-sm">Mapa de Calor - Brasília/DF</h3>
      </div>

      <svg className="w-full h-full" viewBox="0 0 600 500">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
          </pattern>
        </defs>

        <rect width="600" height="500" fill="#f9fafb"/>
        <rect width="600" height="500" fill="url(#grid)"/>

        {/* Main roads - Eixo Rodoviário */}
        <line x1="350" y1="100" x2="350" y2="400" stroke="#9ca3af" strokeWidth="8" strokeLinecap="round"/>
        <line x1="360" y1="100" x2="360" y2="400" stroke="#9ca3af" strokeWidth="8" strokeLinecap="round"/>

        {/* EPNB Road */}
        <path d="M 150 150 Q 250 180, 370 250" stroke="#9ca3af" strokeWidth="6" fill="none" strokeLinecap="round"/>

        {/* Via Taguatinga */}
        <path d="M 120 240 L 280 280" stroke="#9ca3af" strokeWidth="6" strokeLinecap="round"/>

        {/* Heat map zones */}
        {filteredData.map((point) => (
          <g key={`zone-${point.id}`}>
            <circle
              cx={point.x}
              cy={point.y}
              r="40"
              fill={getColor(point.level)}
              opacity="0.15"
            />
          </g>
        ))}

        {/* Camera icons */}
        {filters.showCameras && filteredData.map((point) => (
          <g key={`camera-${point.id}`}>
            <rect
              x={point.x - 28}
              y={point.y - 35}
              width="16"
              height="16"
              fill="#6b7280"
              rx="2"
            />
            <text
              x={point.x - 20}
              y={point.y - 38}
              fontSize="8"
              fill="#9ca3af"
              className="font-mono"
            >
              {point.cameraId}
            </text>
          </g>
        ))}

        {/* Traffic points */}
        {filteredData.map((point) => (
          <g key={point.id}>
            <circle
              cx={point.x}
              cy={point.y}
              r="16"
              fill={getColor(point.level)}
              stroke="#fff"
              strokeWidth="3"
              opacity="0.9"
              className="cursor-pointer transition-transform hover:scale-110"
              onMouseEnter={() => setSelectedPoint(point)}
              onMouseLeave={() => setSelectedPoint(null)}
            />
            {point.level === 'high' && (
              <circle
                cx={point.x}
                cy={point.y}
                r="20"
                fill="none"
                stroke={getColor(point.level)}
                strokeWidth="2"
                opacity="0.5"
              >
                <animate
                  attributeName="r"
                  from="20"
                  to="30"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.5"
                  to="0"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              </circle>
            )}
          </g>
        ))}

        {/* Labels */}
        <text x="300" y="40" textAnchor="middle" className="text-xs fill-gray-600">
          REGIÃO NORTE
        </text>
        <text x="300" y="470" textAnchor="middle" className="text-xs fill-gray-600">
          REGIÃO SUL
        </text>
      </svg>

      {selectedPoint && (
        <div
          className="absolute bg-white rounded-lg shadow-xl p-4 border-2 z-20 pointer-events-none animate-in fade-in duration-200"
          style={{
            left: `${(selectedPoint.x / 600) * 100}%`,
            top: `${(selectedPoint.y / 500) * 100}%`,
            transform: 'translate(-50%, -120%)',
            borderColor: getColor(selectedPoint.level)
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Camera className="w-4 h-4 text-gray-600" />
            <span className="text-xs text-gray-600">{selectedPoint.cameraId}</span>
          </div>
          <p className="font-semibold mb-2">{selectedPoint.location}</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="bg-gray-50 rounded p-2">
              <p className="text-xs text-gray-600">Veículos</p>
              <p className="font-semibold">{selectedPoint.vehicles}</p>
            </div>
            <div className="bg-gray-50 rounded p-2">
              <p className="text-xs text-gray-600">Velocidade</p>
              <p className="font-semibold">{selectedPoint.speed} km/h</p>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t">
            <p className="text-sm">
              Status: <span style={{ color: getColor(selectedPoint.level), fontWeight: 'bold' }}>
                {getStatusText(selectedPoint.level)}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
import { AlertTriangle, Clock, MapPin, Car, Construction, TrafficCone } from 'lucide-react'; // 1. Importe os novos ícones

interface Incident {
  id: string;
  type: 'accident' | 'congestion' | 'roadwork';
  location: string;
  time: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
}

const incidents: Incident[] = [
  {
    id: '1',
    type: 'accident',
    location: 'Eixo Rodoviário Norte, altura do SGAN 910',
    time: '5 min atrás',
    severity: 'high',
    description: 'Colisão entre 2 veículos bloqueando faixa da esquerda'
  },
  {
    id: '2',
    type: 'congestion',
    location: 'EPNB (DF-047) sentido Taguatinga',
    time: '12 min atrás',
    severity: 'high',
    description: 'Congestionamento de 3.2 km previsto crescer'
  },
  {
    id: '3',
    type: 'roadwork',
    location: 'Via Samambaia, próximo ao viaduto',
    time: '18 min atrás',
    severity: 'medium',
    description: 'Obra em andamento, tráfego desviado para faixa direita'
  }
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'high': return 'bg-red-100 text-red-800 border-red-200';
    case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'low': return 'bg-green-100 text-green-800 border-green-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

// 2. Função atualizada para usar ícones do Lucide em vez de emojis
const getTypeIcon = (type: string) => {
  switch (type) {
    case 'accident': return <Car className="w-6 h-6" />;
    case 'congestion': return <TrafficCone className="w-6 h-6" />;
    case 'roadwork': return <Construction className="w-6 h-6" />;
    default: return <AlertTriangle className="w-6 h-6" />;
  }
};

export function AlertsPanel() {
  // 3. Função para lidar com o clique e evitar erros de console
  const handleAlertClick = (id: string) => {
    console.log("Alerta visualizado:", id);
    // Aqui você pode adicionar um comando para focar no mapa futuramente
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-full overflow-auto">
      <h2 className="mb-4 flex items-center gap-2 font-bold text-gray-800">
        <AlertTriangle className="w-5 h-5 text-orange-600" />
        Alertas em Tempo Real
      </h2>

      <div className="space-y-3">
        {incidents.map((incident) => (
          <div
            key={incident.id}
            onClick={() => handleAlertClick(incident.id)} // 4. Adicionado evento de clique
            className={`p-4 rounded-lg border-2 cursor-pointer hover:shadow-md transition-all active:scale-[0.98] ${getSeverityColor(incident.severity)}`}
          >
            <div className="flex items-start gap-3">
              {/* 5. Renderização do ícone profissional */}
              <div className="mt-1">
                {getTypeIcon(incident.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <p className="text-sm font-semibold truncate">{incident.location}</p>
                </div>
                <p className="text-sm mb-2 leading-tight">{incident.description}</p>
                <div className="flex items-center gap-2 text-xs opacity-75">
                  <Clock className="w-3 h-3" />
                  <span>{incident.time}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
  color: string;
}

export function KPICard({ title, value, icon: Icon, trend, color }: KPICardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <span className={`text-sm px-2 py-1 rounded ${
            trend.positive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {trend.positive ? '↑' : '↓'} {trend.value}
          </span>
        )}
      </div>
      <div>
        <p className="text-sm text-gray-600 mb-1">{title}</p>
        <p className="text-3xl">{value}</p>
      </div>
    </div>
  );
}
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { hora: '07:00', veiculos: 180, velocidade: 45 },
  { hora: '08:00', veiculos: 320, velocidade: 25 },
  { hora: '09:00', veiculos: 280, velocidade: 35 },
  { hora: '10:00', veiculos: 150, velocidade: 50 },
  { hora: '11:00', veiculos: 140, velocidade: 52 },
  { hora: '12:00', veiculos: 200, velocidade: 42 },
  { hora: '13:00', veiculos: 190, velocidade: 44 },
  { hora: '14:00', veiculos: 160, velocidade: 48 },
];

export function TrafficChart() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="mb-4">Fluxo de Tráfego - Últimas 8 Horas</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hora" />
          <YAxis yAxisId="left" label={{ value: 'Veículos', angle: -90, position: 'insideLeft' }} />
          <YAxis yAxisId="right" orientation="right" label={{ value: 'Velocidade (km/h)', angle: 90, position: 'insideRight' }} />
          <Tooltip />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="veiculos"
            stroke="#8b5cf6"
            strokeWidth={3}
            name="Veículos"
            dot={{ fill: '#8b5cf6', r: 5 }}
            animationDuration={1000}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="velocidade"
            stroke="#10b981"
            strokeWidth={3}
            name="Velocidade (km/h)"
            dot={{ fill: '#10b981', r: 5 }}
            animationDuration={1000}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
import { Filter, MapPin, AlertCircle, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface FilterPanelProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  region: string;
  severity: string[];
  showCameras: boolean;
}

const regions = [
  'Todas as Regiões',
  'Eixo Rodoviário Norte',
  'Eixo Rodoviário Sul',
  'EPNB (DF-047)',
  'Taguatinga',
  'Ceilândia',
  'Samambaia',
  'Plano Piloto'
];

export function FilterPanel({ onFilterChange }: FilterPanelProps) {
  const [region, setRegion] = useState('Todas as Regiões');
  const [severity, setSeverity] = useState<string[]>(['low', 'medium', 'high']);
  const [showCameras, setShowCameras] = useState(true);

  const handleRegionChange = (newRegion: string) => {
    setRegion(newRegion);
    onFilterChange({ region: newRegion, severity, showCameras });
  };

  const toggleSeverity = (level: string) => {
    const newSeverity = severity.includes(level)
      ? severity.filter(s => s !== level)
      : [...severity, level];
    setSeverity(newSeverity);
    onFilterChange({ region, severity: newSeverity, showCameras });
  };

  const toggleCameras = () => {
    const newShowCameras = !showCameras;
    setShowCameras(newShowCameras);
    onFilterChange({ region, severity, showCameras: newShowCameras });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-purple-600" />
        <h3>Filtros</h3>
      </div>

      <div className="space-y-4">
        {/* Region Filter */}
        <div>
          <label className="block text-sm mb-2">Região</label>
          <select
            value={region}
            onChange={(e) => handleRegionChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {regions.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        {/* Severity Filter */}
        <div>
          <label className="block text-sm mb-2">Nível de Tráfego</label>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={severity.includes('low')}
                onChange={() => toggleSeverity('low')}
                className="w-4 h-4 text-green-600 rounded"
              />
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm">Fluido</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={severity.includes('medium')}
                onChange={() => toggleSeverity('medium')}
                className="w-4 h-4 text-yellow-600 rounded"
              />
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-sm">Moderado</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={severity.includes('high')}
                onChange={() => toggleSeverity('high')}
                className="w-4 h-4 text-red-600 rounded"
              />
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm">Congestionado</span>
            </label>
          </div>
        </div>

        {/* Camera Toggle */}
        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showCameras}
              onChange={toggleCameras}
              className="w-4 h-4 text-purple-600 rounded"
            />
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Mostrar Câmeras Ativas</span>
          </label>
        </div>
      </div>
    </div>
  );
}
import { Activity, TrendingDown, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export function LiveStats() {
  const [activeIncidents, setActiveIncidents] = useState(4);
  const [avgSpeed, setAvgSpeed] = useState(32);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIncidents(prev => Math.max(0, prev + (Math.random() > 0.5 ? 1 : -1)));
      setAvgSpeed(prev => Math.max(15, Math.min(60, prev + (Math.random() - 0.5) * 5)));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-purple-900 to-purple-700 text-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-5 h-5" />
        <h3>Status ao Vivo</h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-sm opacity-90 mb-1">Incidentes Ativos</p>
          <div className="flex items-center gap-2">
            <p className="text-3xl">{activeIncidents}</p>
            <div className="flex-1 flex justify-end">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-sm opacity-90 mb-1">Velocidade Média</p>
          <div className="flex items-center gap-2">
            <p className="text-3xl">{avgSpeed.toFixed(0)}</p>
            <span className="text-sm">km/h</span>
          </div>
        </div>

        <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-sm opacity-90 mb-1">Tendência</p>
          <div className="flex items-center gap-2">
            {avgSpeed > 35 ? (
              <>
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span className="text-sm">Melhorando</span>
              </>
            ) : (
              <>
                <TrendingDown className="w-5 h-5 text-red-400" />
                <span className="text-sm">Piorando</span>
              </>
            )}
          </div>
        </div>

        <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-sm opacity-90 mb-1">Previsão 30min</p>
          <div className="flex items-center gap-2">
            <p className="text-sm">2 congestionamentos</p>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/20">
        <p className="text-xs opacity-75">Atualização automática a cada 5 segundos</p>
      </div>
    </div>
  );
}
