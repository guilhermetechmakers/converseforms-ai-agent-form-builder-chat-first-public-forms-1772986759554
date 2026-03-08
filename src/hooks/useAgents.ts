import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { agentsApi } from '@/api/agents'
import { toast } from 'sonner'
import type { UpdateAgentInput } from '@/types/agent'

export const agentKeys = {
  all: ['agents'] as const,
  lists: () => [...agentKeys.all, 'list'] as const,
  list: (filters?: string) => [...agentKeys.lists(), filters] as const,
  details: () => [...agentKeys.all, 'detail'] as const,
  detail: (id: string) => [...agentKeys.details(), id] as const,
  bySlug: (slug: string) => [...agentKeys.all, 'slug', slug] as const,
}

export function useAgents() {
  return useQuery({
    queryKey: agentKeys.lists(),
    queryFn: agentsApi.getAll,
    staleTime: 1000 * 60 * 5,
  })
}

export function useAgent(id: string) {
  return useQuery({
    queryKey: agentKeys.detail(id),
    queryFn: () => agentsApi.getById(id),
    enabled: !!id,
  })
}

export function useAgentBySlug(slug: string) {
  return useQuery({
    queryKey: agentKeys.bySlug(slug),
    queryFn: () => agentsApi.getBySlug(slug),
    enabled: !!slug,
  })
}

export function useCreateAgent() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: agentsApi.create,
    onSuccess: (newAgent) => {
      queryClient.invalidateQueries({ queryKey: agentKeys.lists() })
      queryClient.setQueryData(agentKeys.detail(newAgent.id), newAgent)
      toast.success('Agent created successfully')
    },
    onError: (err: Error) => toast.error(`Failed to create agent: ${err.message}`),
  })
}

export function useUpdateAgent() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: UpdateAgentInput }) =>
      agentsApi.update(id, updates),
    onSuccess: (updated) => {
      queryClient.setQueryData(agentKeys.detail(updated.id), updated)
      queryClient.invalidateQueries({ queryKey: agentKeys.lists() })
      toast.success('Agent updated')
    },
    onError: (err: Error) => toast.error(`Failed to update: ${err.message}`),
  })
}

export function useDeleteAgent() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: agentsApi.delete,
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: agentKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: agentKeys.lists() })
      toast.success('Agent deleted')
    },
    onError: (err: Error) => toast.error(`Failed to delete: ${err.message}`),
  })
}

export function usePublishAgent() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: agentsApi.publish,
    onSuccess: (updated) => {
      queryClient.setQueryData(agentKeys.detail(updated.id), updated)
      queryClient.invalidateQueries({ queryKey: agentKeys.lists() })
      toast.success('Agent published')
    },
    onError: (err: Error) => toast.error(`Failed to publish: ${err.message}`),
  })
}
