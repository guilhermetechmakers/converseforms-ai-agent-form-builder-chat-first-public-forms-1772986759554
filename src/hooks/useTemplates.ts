import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { templatesApi } from '@/api/templates'
import { toast } from 'sonner'
import { agentKeys } from './useAgents'

export const templateKeys = {
  all: ['templates'] as const,
  lists: () => [...templateKeys.all, 'list'] as const,
  detail: (id: string) => [...templateKeys.all, 'detail', id] as const,
}

export function useTemplates() {
  return useQuery({
    queryKey: templateKeys.lists(),
    queryFn: templatesApi.getAll,
    staleTime: 1000 * 60 * 10,
  })
}

export function useCloneTemplate() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: templatesApi.clone,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: agentKeys.lists() })
      toast.success('Template cloned. Opening agent editor.')
    },
    onError: (err: Error) => toast.error(`Clone failed: ${err.message}`),
  })
}
