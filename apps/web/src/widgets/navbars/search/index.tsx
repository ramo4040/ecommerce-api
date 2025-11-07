import "./style.css";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useDebounceValue } from "usehooks-ts";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { Skeleton } from "@/components/ui/skeleton";
import { useInfinityProductsQuery } from "@/entities/product";
import { apiImgLoader } from "@/lib/utils";

export const NavbarSearch = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useDebounceValue("", 500);
  const { ref, inView } = useInView({ triggerOnce: true });

  const { data, fetchNextPage, isFetching } = useInfinityProductsQuery(
    { filter: searchValue },
    !!searchValue,
  );

  const products = data?.pages.flatMap((page) =>
    page.data ? page.data.data : [],
  );

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  return (
    <>
      <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)}>
        <Search strokeWidth={1.5} />
      </Button>

      <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
        <Command id="search-products-container">
          <CommandInput
            placeholder="Type a command or search..."
            onChangeCapture={(e) => {
              setSearchValue(e.currentTarget.value);
            }}
          />
          <CommandList>
            {products?.length === 0 && (
              <CommandEmpty>No results found.</CommandEmpty>
            )}

            <div className="products-item-container">
              {products?.map((e, i) => {
                return (
                  <Link
                    className="item"
                    key={e.id}
                    ref={i === products.length - 1 ? ref : null}
                    onClick={() => setSearchOpen(false)}
                    href={{ pathname: `/shop/${e.slug}` }}
                  >
                    <div className="product-item-image-container">
                      <Image
                        src={e.main_image}
                        loader={apiImgLoader}
                        alt={e.meta_title || "Product Image"}
                        fill
                        style={{ objectFit: "cover" }}
                        placeholder="blur"
                        blurDataURL={
                          process.env.NEXT_PUBLIC_IMG_BASE64_PLACEHOLDER
                        }
                      />
                    </div>
                    <div className="details">
                      <h4>{e.name}</h4>
                      <p>/shop/{e.slug}</p>
                    </div>
                  </Link>
                );
              })}

              {isFetching && (
                <div className="loading-skeleton item">
                  <Skeleton className="product-item-image-container" />
                  <div className="details">
                    <Skeleton className="h4" />
                    <Skeleton className="p" />
                  </div>
                </div>
              )}
            </div>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
};
