export function StaticRedirect({ href }: { href: string }) {
  return (
    <main className="bg-white px-6 pb-24 pt-[140px]">
      <meta httpEquiv="refresh" content={`0;url=${href}`} />
      <p className="text-[16px] leading-6 text-ink">
        <a href={href}>Continue</a>
      </p>
    </main>
  );
}
