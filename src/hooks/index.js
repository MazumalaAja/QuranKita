import { useQuery } from "@tanstack/react-query";
import { GetApi, GetDetail } from "../services";

function useSurat() {
     return useQuery({
          queryKey: ['surat'],
          queryFn: GetApi("surat"),
          staleTime: 1000 * 60 * 10,
          suspense: true,
     })
}

function useDetailSurat(id) {
     return useQuery({
          queryKey: ["surat", id],
          queryFn: GetDetail("surat", id),
          enabled: !!id,
          staleTime: 1000 * 60 * 10,
          suspense: true
     })
}

export { useSurat, useDetailSurat }