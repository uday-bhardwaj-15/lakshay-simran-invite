"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Volume2, VolumeX } from "lucide-react";

const TITLE = "Lakshay & Simran — Wedding Invitation";
const DESC = "With joy, we invite you to celebrate the wedding of Lakshay and Simran.";

// ✏️ Wedding details
const D = {
  groom: "Lakshay",
  bride: "Simran",
  grandparents: "Mr. Rajendra Arora & Mrs. Bala Arora",
  groomParents: "Mr. Pankaj Arora & Mrs. Manisha Arora",
  brideParents: "Mr. Vikas Kheterpal & Mrs. Sangeeta Kheterpal",
  sister: "Lisha Arora",
  chachaChachi: [
    "Neeraj Arora & Varsha Arora",
    "Tanuj Arora & Kavita Arora",
    "Rahul Arora & Seema Arora",
  ],
  cousins: ["Anchal Arora", "Dev Arora", "Yash Arora", "Aaryan Arora"],
  contacts: [
    { name: "Mr. Pankaj Arora", phone: "9897901846" },
    { name: "Mr. Lakshay Arora", phone: "8267953383" },
  ],
  mapUrl:
    "https://maps.google.com/?q=Hotel+Bravura+Gold+Resort+Delhi+Roorkee+Bypass+Partapur+Meerut",
  mapEmbedUrl:
    "https://maps.google.com/maps?q=Hotel+Bravura+Gold+Resort+Partapur+Meerut&t=&z=14&ie=UTF8&iwloc=&output=embed",
  venue: "Hotel Bravura Gold Resort",
  venueAddress: "Delhi Roorkee Bypass, Partapur, Meerut",
};

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, set] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => set(!!e?.isIntersecting), { threshold: 0.45 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, inView };
}

function Section({
  video,
  children,
  top = "20%",
}: {
  video: string;
  children: ReactNode;
  top?: string;
}) {
  const { ref, inView } = useInView<HTMLElement>();
  const vid = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = vid.current;
    if (!v) return;
    if (inView) {
      v.currentTime = 0;
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [inView]);
  return (
    <section
      ref={ref}
      className={`relative h-[100svh] w-full snap-start overflow-hidden ${inView ? "in" : ""}`}
    >
      <video
        ref={vid}
        src={video}
        muted
        playsInline
        loop
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-x-[12%] flex flex-col break-words leading-snug items-center text-center"
        style={{ top }}
      >
        {children}
      </div>
    </section>
  );
}

function Invite() {
  const [stage, setStage] = useState<"tap" | "playing" | "done">("tap");
  const [isPlaying, setIsPlaying] = useState(false);
  const entryRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const start = () => {
    if (stage !== "tap") return;
    setStage("playing");
    // Unlock/prime audio on user gesture for seamless playback when names appear
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        audioRef.current?.pause();
        if (audioRef.current) audioRef.current.currentTime = 0;
      }).catch(() => {});
    }
    entryRef.current?.play().catch(() => setStage("done"));
  };

  useEffect(() => {
    if (stage === "done" && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  }, [stage]);

  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  return (
    <main className="relative mx-auto h-[100svh] w-[min(100vw,calc(100svh*9/16))] snap-y snap-mandatory overflow-y-auto bg-background shadow-2xl">
      <audio ref={audioRef} src="/jashn-e-bahara.mp3" loop preload="auto" />

      {/* Floating Audio Control */}
      {stage === "done" && (
        <button
          onClick={toggleAudio}
          type="button"
          aria-label={isPlaying ? "Mute music" : "Play music"}
          className="fixed top-4 right-[max(1rem,calc((100vw-min(100vw,calc(100svh*9/16)))/2+1rem))] z-50 flex h-10 w-10 items-center justify-center rounded-full border border-gold/60 bg-background/85 text-maroon shadow-lg backdrop-blur-md transition-all hover:scale-105 active:scale-95"
        >
          {isPlaying ? (
            <Volume2 className="h-5 w-5 animate-pulse text-maroon" />
          ) : (
            <VolumeX className="h-5 w-5 text-muted-foreground" />
          )}
        </button>
      )}
      {/* 1. Entry */}
      <section
        onClick={start}
        className={`relative h-[100svh] w-full snap-start overflow-hidden ${stage === "done" ? "in" : ""}`}
      >
        <video
          ref={entryRef}
          src="/videos/entry.mp4"
          muted
          playsInline
          preload="auto"
          onEnded={() => setStage("done")}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {stage === "tap" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 justify-end pb-[18%]">
            <div className="pulse-soft px-4 py-2 text-base font-semibold tracking-[0.35em] text-maroon">
              TAP TO OPEN
            </div>
          </div>
        )}
        <div className="absolute inset-x-[20%] top-[24%] flex flex-col break-words leading-snug items-center text-center">
          <p className="reveal text-xs tracking-[0.2em] text-maroon font-semibold">
            ॥ श्री गणेशाय नमः ॥
          </p>
          <p className="reveal d1 mt-5 text-sm italic text-foreground">
            Together with their families
          </p>
          <h1 className="reveal d2 mt-3 font-[family-name:var(--font-script)] text-[clamp(2.2rem,11vw,3.4rem)] leading-tight gold-text">
            {D.groom}
          </h1>
          <span className="reveal d2 my-0.5 font-[family-name:var(--font-script)] text-[clamp(1.5rem,7.5vw,2.25rem)] text-gold">
            &amp;
          </span>
          <h1 className="reveal d3 font-[family-name:var(--font-script)] text-[clamp(2.2rem,11vw,3.4rem)] leading-tight gold-text">
            {D.bride}
          </h1>
          <p className="reveal d4 mt-5 text-sm italic text-foreground">
            request the pleasure of your presence
          </p>
          <p className="reveal d4 mt-5 animate-bounce text-xs tracking-[0.2em] text-maroon font-semibold">
            SCROLL ↓
          </p>
        </div>
      </section>

      {stage === "done" && (
        <>
          {/* 2. Blessings & Parents */}
          <Section video="/videos/partents_name.mp4" top="30%">
            <p className="reveal text-xs tracking-[0.2em] text-maroon font-semibold">
              WITH THE BLESSINGS OF
            </p>
            <p className="reveal d1 mt-2 text-xs uppercase tracking-widest text-muted-foreground">
              Grandparents
            </p>
            <p className="reveal d1 text-[clamp(0.85rem,3.8vw,1.05rem)] font-semibold text-foreground">
              {D.grandparents}
            </p>

            <div className="reveal d2 my-3 h-px w-20 bg-gold/70" />

            <p className="reveal d2 font-[family-name:var(--font-script)] text-[clamp(1.3rem,6vw,1.9rem)] gold-text">
              Lakshay
            </p>
            <p className="reveal d2 mt-1 text-[clamp(0.85rem,3.8vw,1.05rem)] font-semibold text-foreground">
              S/o {D.groomParents}
            </p>

            <div className="reveal d3 my-3 h-px w-20 bg-gold/70" />

            <p className="reveal d3 font-[family-name:var(--font-script)] text-[clamp(1.3rem,6vw,1.9rem)] gold-text">
              Simran
            </p>
            <p className="reveal d3 mt-1 text-[clamp(0.85rem,3.8vw,1.05rem)] font-semibold text-foreground">
              D/o {D.brideParents}
            </p>
          </Section>

          {/* 3. Ring Ceremony & Cocktails */}
          <Section video="/videos/engagement.mp4" top="32%">
            <p className="reveal text-xs tracking-[0.2em] text-maroon font-semibold">
              YOU ARE INVITED TO
            </p>
            <h2 className="reveal d1 mt-2 font-[family-name:var(--font-script)] text-[clamp(1.8rem,8vw,2.6rem)] leading-tight gold-text">
              Ring Ceremony &amp; Cocktails
            </h2>
            <p className="reveal d2 mt-3 text-[clamp(0.95rem,4.2vw,1.2rem)] font-semibold text-foreground">
              16 November 2026
            </p>
            <p className="reveal d2 text-[clamp(0.85rem,3.8vw,1.05rem)] font-semibold text-maroon">
              7:00 PM
            </p>
            <div className="reveal d3 mt-2">
              <p className="text-[clamp(0.9rem,4vw,1.1rem)] font-medium text-foreground">GRAND 5</p>
              <p className="text-xs text-muted-foreground">NH-58 Kanker Khera, Meerut</p>
            </div>
            <p className="reveal d4 mt-2 text-xs italic text-muted-foreground">
              Cocktails &amp; Dinner
            </p>
          </Section>

          {/* 4. Haldi & Lunch */}
          <Section video="/videos/haldi.mp4" top="22%">
            <p className="reveal text-xs tracking-[0.2em] text-maroon font-semibold">
              YOU ARE INVITED TO
            </p>
            <h2 className="reveal d1 mt-2 font-[family-name:var(--font-script)] text-[clamp(1.9rem,9vw,2.8rem)] leading-tight gold-text">
              Haldi &amp; Carnival
            </h2>
            <p className="reveal d2 mt-3 text-[clamp(0.95rem,4.2vw,1.2rem)] font-semibold text-foreground">
              25 November 2026
            </p>
            <p className="reveal d2 text-[clamp(0.85rem,3.8vw,1.05rem)] font-semibold text-maroon">
              11:00 AM
            </p>
            <div className="reveal d3 mt-2 ">
              <p className="text-[clamp(0.9rem,4vw,1.1rem)] font-medium text-foreground">
                CHOWKI DHANI
              </p>
              <p className="text-xs text-muted-foreground">
                NH-58 near Bharat Petroleum Petrol Pump, Meerut
              </p>
            </div>
            <p className="reveal d4 mt-2 text-xs italic text-muted-foreground">
              Haldi ceremony followed by lunch
            </p>
          </Section>

          {/* 5. Wedding */}
          <Section video="/videos/wedding.mp4" top="25%">
            <p className="reveal text-xs tracking-[0.2em] text-maroon font-semibold">
              YOU ARE INVITED TO
            </p>
            <h2 className="reveal d1 mt-1 font-[family-name:var(--font-script)] text-[clamp(2.1rem,9.5vw,3rem)] leading-tight gold-text">
              Wedding
            </h2>
            <p className="reveal d2 mt-2 text-[clamp(0.95rem,4.2vw,1.2rem)] font-semibold text-foreground">
              26 November 2026
            </p>
            <div className="reveal d3 mt-1">
              <p className="text-[clamp(0.9rem,4vw,1.1rem)] font-medium text-foreground">
                HOTEL BRAVURA GOLD RESORT
              </p>
              <p className="text-xs text-muted-foreground">
                Delhi Roorkee Bypass, Partapur, Meerut
              </p>
            </div>

            <div className="reveal d4 mt-2.5 space-y-1 rounded-xl border border-gold/40 bg-background/80 px-3 py-2 text-xs text-foreground backdrop-blur-sm">
              <p className="font-medium">
                <span className="text-maroon font-semibold">Ghud chadi (at Residence):</span> 4:00
                PM
              </p>
              {/* <p className="font-medium">
                <span className="text-maroon font-semibold">Chadhat:</span> 7:00 PM •{" "}
                <span className="text-maroon font-semibold">Jaimala:</span> 9:00 PM
              </p> */}
              <p className="font-medium">
                <span className="text-maroon font-semibold">Dinner:</span> 8:00 PM
              </p>
            </div>
          </Section>

          {/* 6. Sundarkand Path */}
          <Section video="/videos/sunderkand.mp4" top="20%">
            <p className="reveal text-xs tracking-[0.2em] text-maroon font-semibold">
              YOU ARE INVITED TO
            </p>
            <h2 className="reveal d1 mt-2 font-[family-name:var(--font-script)] text-[clamp(1.9rem,9vw,2.8rem)] leading-tight gold-text">
              Sundarkand Path
            </h2>
            <p className="reveal d2 mt-3 text-[clamp(0.95rem,4.2vw,1.2rem)] font-semibold text-foreground">
              28 November 2026
            </p>
            <p className="reveal d2 text-[clamp(0.85rem,3.8vw,1.05rem)] font-semibold text-maroon">
              3:30 PM
            </p>
            <div className="reveal d3 mt-2">
              <p className="text-[clamp(0.9rem,4vw,1.1rem)] font-medium text-foreground">
                At Residence
              </p>
            </div>
            <p className="reveal d4 mt-2 text-xs italic text-maroon font-medium">
              Followed by Prasad: 6:00 PM onwards
            </p>
          </Section>

          {/* 7. Family Chart & R.S.V.P */}
          <section className="relative flex h-[100svh] snap-start flex-col items-center justify-center bg-gradient-to-b from-background via-secondary/40 to-background px-6 text-center in">
            <p className="reveal text-xs tracking-[0.25em] text-maroon font-semibold">
              FAMILY &amp; WARM REGARDS
            </p>
            <h2 className="reveal d1 mt-1 font-[family-name:var(--font-script)] text-[clamp(1.8rem,8vw,2.5rem)] gold-text">
              With Best Compliments
            </h2>

            <div className="reveal d2 mt-4 w-full max-w-sm rounded-2xl border border-gold/30 bg-background/80 p-4 shadow-sm backdrop-blur-sm">
              <p className="text-[11px] uppercase tracking-widest text-maroon font-semibold">
                Sister
              </p>
              <p className="mt-0.5 text-xs sm:text-sm font-[family-name:var(--font-script)] text-[clamp(1.8rem,8vw,2.5rem)] gold-text">
                {D.sister}
              </p>
              <p className="mt-0.5 text-xs sm:text-sm font-semibold text-foreground">
                A brother by birth, a friend for life. With all my love, I invite you to celebrate
                his forever.
              </p>

              <div className="my-2 h-px w-16 mx-auto bg-gold/40" />

              <p className="text-[11px] uppercase tracking-widest text-maroon font-semibold">
                Family
              </p>
              <div className="mt-1 space-y-0.5 text-xs sm:text-sm text-foreground font-medium">
                {D.chachaChachi.map((pair) => (
                  <p key={pair}>{pair}</p>
                ))}
              </div>

              <div className="my-2 h-px w-16 mx-auto bg-gold/40" />

              <p className="text-[11px] uppercase tracking-widest text-maroon font-semibold">
                Cousins
              </p>
              <p className="mt-0.5 text-xs sm:text-sm text-foreground font-medium">
                {D.cousins.join(" • ")}
              </p>
            </div>

            <div className="reveal d3 mt-4 flex flex-col items-center gap-1 text-xs text-muted-foreground">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-maroon">
                R.S.V.P.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs font-semibold text-foreground">
                {D.contacts.map((c) => (
                  <a
                    key={c.phone}
                    href={`tel:${c.phone}`}
                    className="hover:text-primary transition-colors underline decoration-gold/60 underline-offset-2"
                  >
                    {c.name}: {c.phone}
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* 8. Location & Interactive Map */}
          <section className="relative flex h-[100svh] snap-start flex-col items-center justify-center bg-gradient-to-b from-background via-secondary/40 to-background px-6 text-center in">
            <p className="reveal font-[family-name:var(--font-script)] text-[clamp(2rem,9vw,2.8rem)] gold-text">
              See you there
            </p>

            <div className="reveal d1 mt-1">
              <p className="text-[clamp(1rem,4.5vw,1.25rem)] font-semibold text-foreground">
                {D.venue}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{D.venueAddress}</p>
            </div>

            {/* Embedded Google Map Iframe */}
            <div className="reveal d2 mt-3 w-full max-w-[340px] rounded-2xl overflow-hidden border border-gold/50 shadow-md bg-background/60">
              <iframe
                title="Hotel Bravura Gold Resort Location Map"
                src={D.mapEmbedUrl}
                className="w-full h-[180px] sm:h-[200px] border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <a
              href={D.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="reveal d3 mt-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-maroon to-primary px-8 py-3 text-[clamp(0.85rem,3.8vw,1rem)] tracking-widest text-primary-foreground shadow-[var(--shadow-gold)] transition-transform active:scale-95"
            >
              📍 OPEN IN GOOGLE MAPS
            </a>

            <p className="reveal d4 mt-3 font-[family-name:var(--font-script)] text-3xl text-maroon">
              {D.groom} &amp; {D.bride}
            </p>
          </section>
        </>
      )}
    </main>
  );
}

export default function Page() {
  return <Invite />;
}
