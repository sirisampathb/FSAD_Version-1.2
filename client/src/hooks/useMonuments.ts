import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMonuments, getMonument, createMonument } from "@/lib/api";
import { InsertMonument } from "@shared/schema";

export function useMonuments() {
  return useQuery({
    queryKey: ["monuments"],
    queryFn: getMonuments,
  });
}

export function useMonument(id: string) {
  return useQuery({
    queryKey: ["monument", id],
    queryFn: () => getMonument(id),
    enabled: !!id,
  });
}

export function useCreateMonument() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (monument: InsertMonument) => createMonument(monument),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["monuments"] });
    },
  });
}