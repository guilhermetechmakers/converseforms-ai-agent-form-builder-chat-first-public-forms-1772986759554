import { useQuery } from '@tanstack/react-query'
import { sessionsApi } from '@/api/sessions'

export const sessionKeys = {
  all: ['sessions'] as const,
  lists: (agentId?: string) => [...sessionKeys.all, 'list', agentId] as const,
  detail: (id: string) => [...sessionKeys.all, 'detail', id] as const,
}

export function useSessions(agentId?: string) {
  return useQuery({
    queryKey: sessionKeys.lists(agentId),
    queryFn: () => sessionsApi.getAll(agentId),
    staleTime: 1000 * 60 * 2,
  })
}

export function useSession(id: string) {
  return useQuery({
    queryKey: sessionKeys.detail(id),
    queryFn: () => sessionsApi.getById(id),
    enabled: !!id,
  })
}
