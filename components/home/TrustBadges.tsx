import { Truck, ShieldCheck, RotateCcw, Headphones } from 'lucide-react';

const BADGES = [
  { Icon: Truck,        title: 'Free Shipping',   desc: 'On all orders over $50' },
  { Icon: ShieldCheck,  title: '2-Year Warranty', desc: 'Every product, no questions' },
  { Icon: RotateCcw,    title: '30-Day Returns',  desc: 'Hassle-free, prepaid label' },
  { Icon: Headphones,   title: '24/7 Support',    desc: 'Real humans, real answers' },
];

export default function TrustBadges() {
  return (
    <section
      className="py-16 px-5 lg:px-10 border-y"
      style={{ borderColor: 'var(--border)', background: 'var(--background)' }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
        {BADGES.map(({ Icon, title, desc }) => (
          <div key={title} className="flex items-start gap-4">
            <div
              className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl"
              style={{ background: 'var(--accent)' }}
            >
              <Icon size={18} style={{ color: 'var(--primary)' }} strokeWidth={1.8} />
            </div>
            <div>
              <h4
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: 'var(--foreground)',
                  letterSpacing: '-0.01em',
                  marginBottom: '2px',
                }}
              >
                {title}
              </h4>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.76rem',
                  color: 'var(--muted-fg)',
                  lineHeight: 1.5,
                }}
              >
                {desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
