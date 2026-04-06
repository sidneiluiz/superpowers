import { getLatestContent } from "@/lib/content";

export async function ContentFeed() {
  const items = await getLatestContent(3);

  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-16">
      <h2 className="mb-4 text-2xl font-serif font-semibold">Conteudo recente</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.id}
            className="rounded-2xl border border-slate-700 bg-slate-900/70 p-4"
          >
            <p className="text-xs uppercase tracking-wide text-sky-300">{item.type}</p>
            <h3 className="mt-2 text-lg font-semibold text-white">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-300">{item.description}</p>
            <a
              className="mt-4 inline-block text-sm font-semibold text-amber-300 hover:text-amber-200"
              href={item.url}
            >
              Ver conteudo
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
