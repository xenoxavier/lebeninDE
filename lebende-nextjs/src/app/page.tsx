import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  GraduationCap,
  LineChart,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

const navItems = [
  { label: "Approach", href: "#approach" },
  { label: "Features", href: "#features" },
  { label: "Results", href: "#results" },
  { label: "Testimonials", href: "#voices" },
];

const heroMetrics = [
  { value: "310", label: "Official questions" },
  { value: "96.4%", label: "Average pass rate" },
  { value: "45k+", label: "Learners prepared" },
];

const features = [
  {
    title: "Official Question Bank",
    description:
      "Train with every federal question and the additional state-specific sets, curated and kept current.",
    icon: GraduationCap,
  },
  {
    title: "Adaptive Practice Engine",
    description:
      "Smart sessions surface the topics you miss, strengthen weak areas, and pace revision for exam day.",
    icon: Target,
  },
  {
    title: "Confidence Analytics",
    description:
      "Topic heatmaps, answer speed, and readiness scores make it easy to know exactly where you stand.",
    icon: LineChart,
  },
  {
    title: "Exam-Ready Simulations",
    description:
      "Timed simulations mirror the official flow so you build calm, consistent exam performance.",
    icon: ShieldCheck,
  },
];

const pillars = [
  {
    title: "Start with clarity",
    description:
      "A five minute diagnostic sets your baseline and builds a personalised path through the 310 questions.",
    icon: Sparkles,
  },
  {
    title: "Practice with purpose",
    description:
      "Micro sessions, streak tracking, and instant explanations keep momentum high and revision efficient.",
    icon: Clock,
  },
  {
    title: "Finish exam confident",
    description:
      "Full simulations, review sessions, and last minute cram decks ensure nothing on test day feels new.",
    icon: CheckCircle2,
  },
];

const workflow = [
  {
    step: "01",
    title: "Calibrate",
    description:
      "Run the quick-start quiz, pick your Bundesland, and set your study targets.",
  },
  {
    step: "02",
    title: "Train",
    description:
      "Adaptive practice blends official questions with focused drills on the topics you need most.",
  },
  {
    step: "03",
    title: "Validate",
    description:
      "Weekly simulations and streak insights show progress while highlighting final polish areas.",
  },
];

const testimonials = [
  {
    quote:
      "I studied in short bursts during my commute and still walked into the exam feeling completely prepared. The dashboard made it obvious what to review each day.",
    name: "Aylin K.",
    detail: "Passed in Hamburg",
  },
  {
    quote:
      "The state questions were always my worry. Having them seamlessly woven into practice turned a stress point into a strength.",
    name: "Marco R.",
    detail: "Passed in Bayern",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f8f7f4] text-slate-900">
      <header className="relative overflow-hidden bg-slate-900 text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-gradient-to-br from-amber-300/60 via-amber-500/40 to-transparent blur-3xl" />
          <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-gradient-to-br from-sky-400/40 via-slate-700/60 to-transparent blur-3xl" />
        </div>

        <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-600 font-semibold text-slate-900">
              DE
            </span>
            <div className="leading-tight">
              <p className="text-lg font-semibold tracking-tight">LebenDE</p>
              <p className="text-sm text-slate-200/80">Citizenship Prep Studio</p>
            </div>
          </div>

          <div className="hidden items-center gap-8 text-sm font-medium text-slate-200/90 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900 shadow-sm shadow-slate-900/10 transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              Launch Practice
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </nav>

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 pb-24 pt-12 sm:pt-20 lg:grid-cols-2 lg:px-8 lg:pb-32">
          <div className="flex flex-col gap-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-amber-200/90 backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Exam readiness in half the study time
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                The confident way to pass{" "}
                <span className="text-amber-300">Leben in Deutschland</span>.
              </h1>
              <p className="max-w-xl text-base text-slate-200/80 sm:text-lg">
                Blend adaptive practice, realistic simulations, and elegant
                analytics. Every session moves you closer to the certificate,
                without the overwhelm.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-amber-200"
              >
                Start free practice
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#features"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-white"
              >
                Explore the platform
              </Link>
            </div>
            <p className="max-w-xl text-sm text-white/70">
              Diese Trainingsumgebung nutzt unveränderte Fragen des offiziellen
              Fragenkatalogs, ersetzt aber nicht den staatlich beaufsichtigten
              Einbürgerungstest.
            </p>

            <div className="grid grid-cols-3 gap-6 text-white/80">
              {heroMetrics.map((metric) => (
                <div key={metric.label} className="space-y-1">
                  <p className="text-2xl font-semibold text-white sm:text-3xl">
                    {metric.value}
                  </p>
                  <p className="text-xs uppercase tracking-wide text-white/70">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-6 -left-6 hidden h-44 w-44 rounded-3xl border border-white/10 bg-white/5 backdrop-blur lg:block" />
            <div className="relative rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-slate-900/40 backdrop-blur">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-wide text-white/60">
                    Today&apos;s focus
                  </p>
                  <p className="mt-1 text-lg font-semibold text-white">
                    Democracy & rights
                  </p>
                </div>
                <span className="rounded-full bg-amber-300 px-3 py-1 text-xs font-semibold text-slate-900">
                  Adaptive
                </span>
              </div>

              <div className="mt-6 space-y-4 rounded-2xl bg-white/10 p-5">
                <div className="space-y-2 text-sm text-white/80">
                  <p className="font-medium text-white">
                    What does the rule of law guarantee in Germany?
                  </p>
                  <div className="space-y-2">
                    <div className="rounded-xl border border-white/20 bg-white/10 px-4 py-3">
                      Equal protection before the law for everyone
                    </div>
                    <div className="rounded-xl border border-white/10 px-4 py-3 text-white/60">
                      Exclusive law making by parliament
                    </div>
                    <div className="rounded-xl border border-white/10 px-4 py-3 text-white/60">
                      A government without judicial oversight
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-white/70">
                  <span>Question 18 of 30</span>
                  <span>Confidence: 82%</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-4 text-white/80">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-wide text-white/60">
                    Session streak
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-white">7</p>
                  <p className="text-xs text-white/60">Days in a row</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-wide text-white/60">
                    Average accuracy
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-white">91%</p>
                  <p className="text-xs text-white/60">Last 3 sessions</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-wide text-white/60">
                    Time invested
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-white">42m</p>
                  <p className="text-xs text-white/60">Today</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-24 px-6 py-16 lg:px-8">
        <section id="approach" className="space-y-12">
          <div className="max-w-3xl space-y-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              A method that respects your time
            </p>
            <h2 className="text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl">
              Every moment in the platform is engineered to build certainty and
              calm before your exam appointment.
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/40 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <pillar.icon className="h-10 w-10 text-amber-500" />
                <h3 className="mt-6 text-xl font-semibold text-slate-900">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="features"
          className="rounded-[2.5rem] border border-slate-200 bg-white px-6 py-16 shadow-md shadow-slate-200/50 sm:px-10"
        >
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Platform highlights
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
              Tools that think like a personal coach, not a question dump.
            </h2>
            <p className="mt-4 text-base text-slate-600">
              A clean interface and meaningful analytics help you stay focused on
              progress, not spreadsheets.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col gap-5 rounded-3xl border border-slate-200 bg-slate-50 p-8 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <feature.icon className="h-10 w-10 text-amber-500" />
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="results" className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2.5rem] border border-slate-200 bg-white p-10 shadow-md shadow-slate-200/60">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              From first session to exam day
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
              A guided workflow that keeps you progressing without guesswork.
            </h2>
            <p className="mt-4 text-base text-slate-600">
              Each stage unlocks once you are ready, blending Bundesland content,
              review loops, and simulations so you finish confident.
            </p>
            <div className="mt-10 space-y-6">
              {workflow.map((item) => (
                <div
                  key={item.title}
                  className="flex gap-6 rounded-2xl border border-slate-200 bg-slate-50 p-6"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-6 rounded-[2.5rem] border border-slate-200 bg-slate-900 p-10 text-white shadow-xl shadow-slate-900/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-wide text-white/60">
                  Community snapshot
                </p>
                <p className="mt-2 text-3xl font-semibold text-white">
                  Learners this month
                </p>
              </div>
              <Users className="h-10 w-10 text-amber-300" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
                <p className="text-xs uppercase tracking-wide text-white/70">
                  Average score
                </p>
                <p className="mt-2 text-3xl font-semibold text-white">88%</p>
                <p className="text-xs text-white/60">After 3 weeks of practice</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
                <p className="text-xs uppercase tracking-wide text-white/70">
                  Time saved
                </p>
                <p className="mt-2 text-3xl font-semibold text-white">47%</p>
                <p className="text-xs text-white/60">
                  Compared with manual study plans
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
                <p className="text-xs uppercase tracking-wide text-white/70">
                  Pass confirmations
                </p>
                <p className="mt-2 text-3xl font-semibold text-white">1,204</p>
                <p className="text-xs text-white/60">Past 12 months</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
                <p className="text-xs uppercase tracking-wide text-white/70">
                  Study streaks
                </p>
                <p className="mt-2 text-3xl font-semibold text-white">12 days</p>
                <p className="text-xs text-white/60">Median active learner</p>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-5 text-sm text-white/70">
              <p>
                We anonymise and aggregate scores to refine the adaptive engine
                while keeping every learner&apos;s data private.
              </p>
            </div>
          </div>
        </section>

        <section
          id="voices"
          className="rounded-[2.5rem] border border-slate-200 bg-white px-6 py-16 shadow-md shadow-slate-200/60 sm:px-12"
        >
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Voices from the community
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
              Learners across Germany trust the process.
            </h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {testimonials.map((testimonial) => (
              <figure
                key={testimonial.name}
                className="flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <blockquote className="text-lg font-medium text-slate-900">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6">
                  <p className="font-semibold text-slate-900">{testimonial.name}</p>
                  <p className="text-sm text-slate-600">{testimonial.detail}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section
          id="legal"
          className="rounded-[2.5rem] border border-slate-200 bg-slate-50 px-6 py-16 shadow-md shadow-slate-200/50 sm:px-12"
        >
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Transparenz & Rechte
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
              Wir üben mit amtlich veröffentlichten Fragen und nennen die Quelle.
            </h2>
            <p className="mt-4 text-base text-slate-600">
              Unser Ziel ist es, die Vorbereitung zu erleichtern, ohne den offiziellen
              Prüfungsprozess zu ersetzen oder zu verändern.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <article className="h-full rounded-3xl border border-slate-200 bg-white p-8 text-left shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">
                Amtliche Fragenbank
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Alle Aufgaben stammen unverändert aus dem offiziellen
                Fragenkatalog des Bundesamts für Migration und Flüchtlinge. Sie können die
                Originalfassung jederzeit direkt beim BAMF einsehen.
              </p>
              <a
                href="https://oet.bamf.de/ords/oetut/f?p=514"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 underline decoration-amber-400 decoration-2 underline-offset-4 hover:text-amber-500"
              >
                Zum BAMF Fragenkatalog
                <ArrowRight className="h-4 w-4" />
              </a>
            </article>
            <article className="h-full rounded-3xl border border-slate-200 bg-white p-8 text-left shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">
                Nutzung nach Paragraf&nbsp;5 UrhG
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Amtliche Werke, die zur allgemeinen Kenntnisnahme veröffentlicht werden,
                genießen keinen Urheberrechtsschutz. Wir geben die Quelle an, ändern die
                Inhalte nicht und verweisen auf den offiziellen Testtermin.
              </p>
              <a
                href="https://www.gesetze-im-internet.de/urhg/__5.html"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 underline decoration-amber-400 decoration-2 underline-offset-4 hover:text-amber-500"
              >
                Paragraf&nbsp;5 Urheberrechtsgesetz
                <ArrowRight className="h-4 w-4" />
              </a>
            </article>
          </div>
          <div className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-white/70 p-6 text-sm text-slate-600">
            <ul className="space-y-3 list-disc pl-4">
              <li>
                Diese Plattform speichert Fortschritt ausschließlich lokal im Browser und
                erhebt keine personenbezogenen Daten.
              </li>
              <li>
                Für das staatliche Zertifikat ist weiterhin ein Termin in einer
                zugelassenen Prüfungsstelle erforderlich.
              </li>
              <li>
                Bitte informieren Sie sich bei Ihrer Kommune über die Anmeldung zum
                offiziellen Einbürgerungstest.
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-16 rounded-[2.5rem] border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-8 py-16 text-white shadow-xl shadow-slate-900/40 sm:px-12">
          <div className="mx-auto flex max-w-4xl flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-wide text-white/60">
                Ready when you are
              </p>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                Make your exam date feel like a formality.
              </h2>
              <p className="text-base text-white/70">
                Launch your personalised practice workspace in minutes. No credit card
                required, just a clear roadmap to your certificate.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-amber-200"
              >
                Begin now
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#approach"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-white"
              >
                See how it works
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
