import { useQuery } from "@tanstack/react-query";
import { GetApi } from "../services";

function useSurat() {
     return useQuery({
          queryKey: ['surat'],
          queryFn: GetApi("surat"),
          staleTime: 1000 * 60 * 10,
          suspense: true,
     })
}

export { useSurat }