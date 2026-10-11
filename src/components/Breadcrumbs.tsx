import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-keva-gray-400">
        {items.map((item, i) => (
          <li key={item.path} className="inline-flex items-center gap-1">
            {i > 0 && <ChevronRight className="w-4 h-4 text-keva-gray-600" aria-hidden="true" />}
            {i < items.length - 1 ? (
              <Link href={item.path} className="hover:text-keva-orange transition-colors">
                {item.name}
              </Link>
            ) : (
              <span className="text-keva-gray-300" aria-current="page">
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
