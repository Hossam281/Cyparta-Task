"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Breadcrumbs: React.FC = () => {
  const pathname = usePathname();

  const pathnames = pathname
    .split('/')
    .filter((x) => x)
    .map((name, index, array) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      link: `/${array.slice(0, index + 1).join('/')}`, // Keep link format
    }));

  return (
    <nav className="flex items-center text-gray-700">
      {pathnames.map((p, index) => (
        <span key={p.link} className="flex items-center">
          {index > 0 && <span className="mx-2 font-semibold">{'>'}</span>}
          {index === pathnames.length - 1 ? (
            <span className="font-semibold">{p.name}</span>
          ) : (
            <span  className="font-semibold">
              {p.name}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
