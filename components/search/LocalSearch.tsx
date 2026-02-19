"use client";
import Image from "next/image";
import { Input } from "../ui/input";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/url";

interface Props {
  route: string;
  imgSrc: string;
  placeholder: string;
  otherClasses?: string;
}

const LocalSearch = ({ route, imgSrc, placeholder, otherClasses }: Props) => {
  const pathname = usePathname(); // Get the current pathname
  const router = useRouter();

  const searchParams = useSearchParams(); // Get the current search parameters
  const query = searchParams.get("query") || "";

  const [searchQuery, setSearchQuery] = useState(query);

  const previousSearchRef = useRef(searchQuery);

  useEffect(() => {
    const delayDebuounceFn = setTimeout(() => {
      if (previousSearchRef.current === searchQuery) return; // If the search query hasn't changed, do nothing
      previousSearchRef.current = searchQuery; // Update the previous search query

      if (searchQuery) {
        const newUrl = formUrlQuery({ params: searchParams.toString(), key: "query", value: searchQuery });

        router.push(newUrl, { scroll: false });
      } else {
        if (pathname === route) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ["query"],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);

    return () => clearTimeout(delayDebuounceFn);
  }, [searchQuery, router, route, searchParams, pathname]);

  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
    >
      <Image src={imgSrc} width={24} height={24} alt="Search" className="cursor-pointer" />
      <Input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="paragraph-regular no-focus placeholder text-dark400_light700 border-none shadow-none outline-none"
      />
    </div>
  );
};

export default LocalSearch;
