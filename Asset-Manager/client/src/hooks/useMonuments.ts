import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMonuments, getMonument, createMonument, updateMonument, deleteMonument } from "@/lib/api";
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

export function useUpdateMonument() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, monument }: { id: string; monument: Partial<InsertMonument> }) => 
      updateMonument(id, monument),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["monuments"] });
    },
  });
}

export function useDeleteMonument() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteMonument(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["monuments"] });
    },
  });
}