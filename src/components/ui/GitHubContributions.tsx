import React, { useEffect, useState } from "react";

interface ContributionDay {
  date: string;
  count: number;
  level: number; // 0-4
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface ContributionData {
  total: number;
  weeks: ContributionWeek[];
}

interface GitHubContributionsProps {
  username: string;
}


const GitHubContributions: React.FC<GitHubContributionsProps> = ({ username }) => {
  const [data, setData] = useState<ContributionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [year, setYear] = useState<'last' | '2024'>('last');

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${username}?y=${year}`
        );
        
        if (!response.ok) {
          throw new Error("Failed to fetch contributions");
        }
        
        const result = await response.json();
        
        const weeks: ContributionWeek[] = [];
        let currentWeek: ContributionDay[] = [];
        let totalContributions = 0;
        
        const contributions = result.contributions || [];
        
        contributions.forEach((day: { date: string; count: number; level: number }, index: number) => {
          totalContributions += day.count;
          currentWeek.push({
            date: day.date,
            count: day.count,
            level: day.level,
          });
          
          if ((index + 1) % 7 === 0) {
            weeks.push({ contributionDays: currentWeek });
            currentWeek = [];
          }
        });
        
        if (currentWeek.length > 0) {
          weeks.push({ contributionDays: currentWeek });
        }
        
        setData({
          total: year === '2024' ? result.total?.[2024] || totalContributions : result.total?.lastYear || totalContributions,
          weeks: weeks.slice(-53),
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, [username, year]);

  const getLevelColor = (level: number): string => {
    switch (level) {
      case 0: return "bg-gray-200";
      case 1: return "bg-green-200";
      case 2: return "bg-green-400";
      case 3: return "bg-green-500";
      case 4: return "bg-green-700";
      default: return "bg-gray-200";
    }
  };

  const getMonthLabels = () => {
    const labels: { label: string; position: number; isYear: boolean }[] = [];
    if (!data?.weeks.length) return labels;
    
    let lastMonth = -1;
    let lastYear = -1;
    const totalWeeks = data.weeks.length;
    
    data.weeks.forEach((week, index) => {
      if (week.contributionDays.length > 0) {
        const date = new Date(week.contributionDays[0].date);
        const month = date.getMonth();
        const year = date.getFullYear();
        
        // Add year label when year changes
        if (year !== lastYear) {
          labels.push({
            label: year.toString(),
            position: (index / totalWeeks) * 100,
            isYear: true,
          });
          lastYear = year;
          lastMonth = month;
        } else if (month !== lastMonth) {
          labels.push({
            label: date.toLocaleDateString('en-US', { month: 'short' }),
            position: (index / totalWeeks) * 100,
            isYear: false,
          });
          lastMonth = month;
        }
      }
    });
    
    return labels;
  };

  if (loading) {
    return (
      <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="animate-pulse">
          <div className="h-3 bg-gray-200 rounded w-32 mb-2"></div>
          <div className="h-16 bg-gray-100 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
        <p className="text-gray-500 text-xs">Unable to load contributions</p>
      </div>
    );
  }

  if (!data) return null;

  const monthLabels = getMonthLabels();

  return (
    <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200 shadow-sm relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-gray-600">
          {data.total.toLocaleString()} contributions
        </span>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-green-600 hover:text-green-700 font-medium"
        >
          @{username}
        </a>
      </div>
      {/* Compact contribution grid - auto-scaling */}
      <div 
        className="grid gap-[2px]"
        style={{ 
          gridTemplateColumns: `repeat(${data.weeks.length}, 1fr)`,
          gridTemplateRows: 'repeat(7, 1fr)'
        }}
      >
        {data.weeks.map((week, weekIndex) => (
          week.contributionDays.map((day, dayIndex) => (
            <div
              key={`${weekIndex}-${dayIndex}`}
              className={`aspect-square rounded-[2px] ${getLevelColor(day.level)} hover:ring-1 hover:ring-gray-400 cursor-pointer`}
              style={{ gridColumn: weekIndex + 1, gridRow: dayIndex + 1 }}
              title={`${day.count} contributions on ${new Date(day.date).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
              })}`}
            />
          ))
        ))}
      </div>
      
      {/* Timeline bar */}
      <div className="relative mt-2">
        <div className="h-1 bg-gray-200 rounded-full">
          <div 
            className="h-full bg-gradient-to-r from-green-300 via-green-500 to-green-600 rounded-full"
            style={{ width: '100%' }}
          />
        </div>
        {/* Year and month labels */}
        <div className="relative h-5 mt-1">
          {/* Year labels - always show */}
          {monthLabels.filter(item => item.isYear).map((item, i) => (
            <span
              key={`year-${i}`}
              className="absolute text-[10px] font-semibold text-gray-600 -translate-x-1/2"
              style={{ left: `${Math.min(Math.max(item.position, 5), 95)}%` }}
            >
              {item.label}
            </span>
          ))}
          {/* Month labels - show select months */}
          {monthLabels
            .filter(item => !item.isYear)
            .filter((_, i) => i % 3 === 1) // Show every 3rd month
            .map((item, i) => (
              <span
                key={`month-${i}`}
                className="absolute text-[8px] text-gray-400 -translate-x-1/2 top-3"
                style={{ left: `${item.position}%` }}
              >
                {item.label}
              </span>
            ))}
        </div>
        {/* Year toggle button - bottom left */}
        <div className="absolute left-0 -bottom-8">
          {year === 'last' ? (
            <button
              className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 transition"
              onClick={() => setYear('2024')}
            >
              ← Back to 2024
            </button>
          ) : (
            <button
              className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 transition"
              onClick={() => setYear('last')}
            >
              Show Latest
            </button>
          )}
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex items-center justify-end gap-1 mt-2 text-[9px] text-gray-400">
        <span>Less</span>
        <div className="w-2 h-2 rounded-[2px] bg-gray-200"></div>
        <div className="w-2 h-2 rounded-[2px] bg-green-200"></div>
        <div className="w-2 h-2 rounded-[2px] bg-green-400"></div>
        <div className="w-2 h-2 rounded-[2px] bg-green-500"></div>
        <div className="w-2 h-2 rounded-[2px] bg-green-700"></div>
        <span>More</span>
      </div>
    </div>
  );
};

export default GitHubContributions;
