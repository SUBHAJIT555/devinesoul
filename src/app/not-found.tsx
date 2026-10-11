import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <main className="px-6 pb-24 pt-40">
      <div className="mx-auto max-w-3xl">
        <p className="text-[14px] font-medium text-accent-deep">404</p>
        <h1 className="mt-4 text-[clamp(40px,5vw,56px)] font-medium leading-[1.15] tracking-[-0.03em]">
          This page is not on the map.
        </h1>
        <p className="mt-4 max-w-md text-[16px] leading-6 text-zinc-600">
          The link may be old. Home, courses, services, products, and contact are all still here.
        </p>
        <div className="mt-8">
          <Button href="/">Back home</Button>
        </div>
      </div>
    </main>
  );
}
