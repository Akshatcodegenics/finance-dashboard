import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, Radar
} from 'recharts';
import { useStore } from '../../store/useStore';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

export function SpendingChart() {
  const transactions = useStore(state => state.transactions);
  
  // 1. Area Data
  const dataMap = transactions.reduce((acc, tx) => {
    if (!acc[tx.date]) acc[tx.date] = { date: tx.date, income: 0, expense: 0 };
    if (tx.type === 'income') acc[tx.date].income += tx.amount;
    if (tx.type === 'expense') acc[tx.date].expense += tx.amount;
    return acc;
  }, {} as Record<string, { date: string; income: number; expense: number }>);
  let areaData = Object.values(dataMap).sort((a, b) => a.date.localeCompare(b.date));

  // 2. Pie Data (Expenses)
  const expenseMap = transactions.filter(t => t.type === 'expense').reduce((acc, tx) => {
    if (!acc[tx.category]) acc[tx.category] = 0;
    acc[tx.category] += tx.amount;
    return acc;
  }, {} as Record<string, number>);
  const pieData = Object.keys(expenseMap).map(key => ({
    name: key,
    value: expenseMap[key]
  }));

  // 3. Radar Data (Balance mapping)
  const radarData = pieData.map(val => ({
    subject: val.name,
    A: val.value,
    fullMark: Math.max(...pieData.map(p => p.value)) + 500
  }));

  const chartContainerStyle = "w-full bg-surface backdrop-blur-xl border border-white rounded-[2rem] p-6 relative overflow-hidden group shadow-[0_15px_40px_-15px_rgba(59,130,246,0.05)]";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
      
      {/* 1. Area Chart: Cash Flow */}
      <div className={`${chartContainerStyle} lg:col-span-2 h-[350px]`}>
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
        <h3 className="text-sm font-bold tracking-wider text-text-muted mb-4 uppercase">Cash Flow (Trend)</h3>
        <ResponsiveContainer width="100%" height="85%">
          <AreaChart data={areaData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#E2E8F0" />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dy={10} tickFormatter={(val) => val.substring(val.length - 2) || val} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
            <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#E2E8F0', borderRadius: '16px', color: '#0F172A', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }} />
            <Area type="monotone" dataKey="income" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
            <Area type="monotone" dataKey="expense" stroke="#EF4444" strokeWidth={3} fillOpacity={1} fill="url(#colorExpense)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* 2. Radar Chart: Vector Breakdown */}
      <div className={`${chartContainerStyle} h-[350px]`}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/5 blur-[50px] rounded-full pointer-events-none" />
        <h3 className="text-sm font-bold tracking-wider text-text-muted mb-4 uppercase text-right">Spend Matrix</h3>
        <ResponsiveContainer width="100%" height="85%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
            <PolarGrid stroke="#E2E8F0" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748B', fontSize: 11 }} />
            <Radar name="Expenses" dataKey="A" stroke="#3B82F6" strokeWidth={2} fill="#3B82F6" fillOpacity={0.3} />
            <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#E2E8F0', borderRadius: '16px', color: '#0F172A', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* 3. Bar Chart: Daily Summaries */}
      <div className={`${chartContainerStyle} lg:col-span-2 h-[320px]`}>
        <h3 className="text-sm font-bold tracking-wider text-text-muted mb-4 uppercase">Volume View</h3>
        <ResponsiveContainer width="100%" height="85%">
          <BarChart data={areaData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dy={10} tickFormatter={(val) => val.substring(val.length - 2) || val} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
            <Tooltip cursor={{fill: '#F1F5F9'}} contentStyle={{ backgroundColor: '#ffffff', borderColor: '#E2E8F0', borderRadius: '16px', color: '#0F172A', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }} />
            <Bar dataKey="income" fill="#10B981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="expense" fill="#EF4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 4. Pie Chart: Expenses Breakdown */}
      <div className={`${chartContainerStyle} h-[320px]`}>
        <h3 className="text-sm font-bold tracking-wider text-text-muted mb-4 uppercase text-right">Categorical</h3>
        <ResponsiveContainer width="100%" height="85%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
              animationBegin={200}
              animationDuration={800}
            >
              {pieData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#E2E8F0', borderRadius: '16px', color: '#0F172A', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }} formatter={(value) => `₹${Number(value).toLocaleString('en-IN')}`} />
            <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#64748B' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
    </div>
  );
}
