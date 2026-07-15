import { useMemo, useState } from 'react';
import { Link } from 'wouter';
import { Star, ArrowLeft, Play, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IMAGE_REVIEWS, TEXT_REVIEWS, VIDEO_REVIEWS } from '../constants/reviews';

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < count ? 'fill-primary text-primary' : 'text-foreground/20'}`} />
      ))}
    </div>
  );
}

type ReviewFilter = 'all' | 'text' | 'image' | 'video';

export default function Reviews() {
  const [activeFilter, setActiveFilter] = useState<ReviewFilter>('all');

  const visibleSections = useMemo(() => {
    const sections: Array<{ key: ReviewFilter; title: string; description: string; render: () => JSX.Element }> = [];

    if (activeFilter === 'all' || activeFilter === 'text') {
      sections.push({
        key: 'text',
        title: 'Text Reviews',
        description: 'Real client stories and feedback from our home salon visits.',
        render: () => (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {TEXT_REVIEWS.map((review) => (
              <div key={review.id} className="relative rounded-[28px] border border-border bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
                <div className="absolute right-8 top-8 text-6xl font-serif leading-none text-primary/20">“</div>
                <div className="mb-4"><Stars count={review.rating} /></div>
                <p className="relative z-10 mb-6 text-base leading-relaxed text-foreground/80">“{review.text}”</p>
                <div className="font-semibold text-foreground">{review.name}</div>
                <div className="text-xs text-foreground/50">{review.location}</div>
              </div>
            ))}
          </div>
        ),
      });
    }

    if (activeFilter === 'all' || activeFilter === 'image') {
      sections.push({
        key: 'image',
        title: 'Image Reviews',
        description: 'Snapshots of our beautiful at-home salon setup and glow sessions.',
        render: () => (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {IMAGE_REVIEWS.map((review) => (
              <div key={review.id} className="overflow-hidden rounded-[28px] border border-border bg-white shadow-sm transition-shadow hover:shadow-md">
                <img src={review.imageSrc} alt={`${review.name} review`} loading="lazy" className="h-56 w-full object-cover" />
                <div className="p-6">
                  <div className="mb-3"><Stars count={review.rating} /></div>
                  <p className="mb-4 text-sm leading-relaxed text-foreground/70">{review.caption}</p>
                  <div className="font-semibold text-foreground">{review.name}</div>
                  <div className="text-xs text-foreground/50">{review.location}</div>
                </div>
              </div>
            ))}
          </div>
        ),
      });
    }

    if (activeFilter === 'all' || activeFilter === 'video') {
      sections.push({
        key: 'video',
        title: 'Video Reviews',
        description: 'Watch real client reactions and beauty transformations.',
        render: () => (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {VIDEO_REVIEWS.map((review) => (
              <a key={review.id} href={review.instagramUrl} target="_blank" rel="noreferrer" className="group block overflow-hidden rounded-[28px] border border-border bg-white shadow-sm transition-shadow hover:shadow-md">
                <div className="relative aspect-[4/5] overflow-hidden bg-secondary/10">
                  <img src={review.thumbnail} alt={`${review.name} video review`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform group-hover:scale-110">
                      <Play className="ml-1 h-7 w-7 fill-primary text-primary" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="mb-3 text-sm leading-relaxed text-foreground/70">{review.caption}</p>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="font-semibold text-foreground">{review.name}</div>
                      <div className="text-xs text-foreground/50">{review.location}</div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary">
                      <Instagram className="h-4 w-4" /> Watch
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        ),
      });
    }

    return sections;
  }, [activeFilter]);

  const filters: Array<{ id: ReviewFilter; label: string }> = [
    { id: 'all', label: 'All Reviews' },
    { id: 'text', label: 'Text' },
    { id: 'image', label: 'Image' },
    { id: 'video', label: 'Video' },
  ];

  return (
    <div className="min-h-screen bg-[#FFFDFB] pb-20 pt-28">
      <div className="container mx-auto px-4 md:px-6">
        <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-foreground/60 transition-colors hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        <div className="mb-12 text-center">
          <h1 className="mb-4 font-serif text-3xl font-bold text-foreground md:text-5xl">Client Love</h1>
          <div className="mb-4 flex justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 fill-primary text-primary" />
            ))}
          </div>
          <p className="text-foreground/70">Real feedback from clients across Agra — in text, image, and video.</p>
        </div>

        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              type="button"
              variant={activeFilter === filter.id ? 'default' : 'outline'}
              className={`rounded-full px-5 py-2.5 ${activeFilter === filter.id ? 'bg-primary text-white' : 'bg-white'}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        <div className="space-y-10">
          {visibleSections.map((section) => (
            <section key={section.key}>
              <div className="mb-6">
                <h2 className="font-serif text-2xl font-semibold text-foreground">{section.title}</h2>
                <p className="mt-1 text-sm text-foreground/60">{section.description}</p>
              </div>
              {section.render()}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
