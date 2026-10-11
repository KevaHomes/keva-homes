import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { getBusiness } from "@/lib/business";
import { businessJsonLd } from "@/lib/seo";
import { getServices } from "@/sanity/lib/queries";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [business, services] = await Promise.all([getBusiness(), getServices()]);
  const serviceLinks: { title: string; slug: string }[] = services.map(
    (s: { title: string; slug: string }) => ({ title: s.title, slug: s.slug }),
  );

  return (
    <>
      <JsonLd data={businessJsonLd(business, serviceLinks)} />
      <Header services={serviceLinks} phone={business.phone} />
      <main className="flex-1">{children}</main>
      <Footer business={business} services={serviceLinks} />
    </>
  );
}
