import { SignupForm } from "@/components/signup-form";
import { TrackEventLink } from "@/components/track-event-link";

export default function Home() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,#0ea5e933,transparent_55%),radial-gradient(circle_at_bottom,#f9731622,transparent_45%)]" />
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-16 sm:py-24 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <p className="inline-flex rounded-full border border-sky-300/25 bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-sky-200">
            Momentos de fé
          </p>
          <h1 className="max-w-xl text-balance font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
            Conteúdo diário para fortalecer sua fé e sua rotina.
          </h1>
          <p className="max-w-xl text-lg text-slate-300">
            Receba mensagens, estudos e novidades do canal em primeira mão. Sem spam, só conteúdo que ajuda você a manter constância e paz.
          </p>
          <div className="flex flex-wrap gap-3">
            <TrackEventLink
              href="https://www.youtube.com"
              className="rounded-xl bg-amber-500 px-5 py-3 text-sm font-bold text-slate-900 transition hover:bg-amber-400"
            >
              Assistir agora
            </TrackEventLink>
            <TrackEventLink
              href="#signup"
              className="rounded-xl border border-slate-500 px-5 py-3 text-sm font-bold transition hover:border-slate-300"
            >
              Entrar na lista VIP
            </TrackEventLink>
          </div>
        </div>

        <div id="signup" className="justify-self-center lg:justify-self-end">
          <SignupForm />
        </div>
      </section>
    </main>
  );
}
