interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

interface StatsSectionProps {
  stats: Stat[];
  title?: string;
  description?: string;
}

const StatsSection = ({ stats, title, description }: StatsSectionProps) => {
  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {(title || description) && (
          <div className="text-center mb-12">
            {title && <h2 className="mb-4">{title}</h2>}
            {description && (
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-2">
                {stat.value}
                {stat.suffix && (
                  <span className="text-secondary">{stat.suffix}</span>
                )}
              </div>
              <div className="text-sm md:text-base text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
