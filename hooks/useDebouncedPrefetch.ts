import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useRef } from "react";

type UseDebouncedPrefetchOptions<T> = {
  queryKeyBuilder: (id: string) => unknown[];
  fetchFn: (id: string) => Promise<T>;
  routeBuilder: (id: string) => string;
  debounceDelay?: number;
};

const useDebouncedPrefetch = <T>({
  queryKeyBuilder,
  fetchFn,
  routeBuilder,
  debounceDelay,
}: UseDebouncedPrefetchOptions<T>) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = async (id: string) => {
    debounceTimer.current = setTimeout(() => {
      queryClient.prefetchQuery({
        queryKey: queryKeyBuilder(id),
        queryFn: () => fetchFn(id),
        staleTime: 3 * 60, //
      });

      router.prefetch(routeBuilder(id));
    }, debounceDelay || 500);
  };

  const handleMouseLeave = () => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
  };

  const handleClick = (id: string) => {
    router.push(routeBuilder(id));
  };

  return {
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
  };
};

export default useDebouncedPrefetch;
