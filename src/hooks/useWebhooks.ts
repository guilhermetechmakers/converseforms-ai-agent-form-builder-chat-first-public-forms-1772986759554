import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { webhooksApi } from '@/api/webhooks'
import { toast } from 'sonner'
import type { Webhook } from '@/types/webhook'

export const webhookKeys = {
  all: ['webhooks'] as const,
  lists: () => [...webhookKeys.all, 'list'] as const,
}

export function useWebhooks() {
  return useQuery({
    queryKey: webhookKeys.lists(),
    queryFn: webhooksApi.getAll,
    staleTime: 1000 * 60 * 2,
  })
}

export function useCreateWebhook() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: webhooksApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: webhookKeys.lists() })
      toast.success('Webhook created')
    },
    onError: (err: Error) => toast.error(`Failed: ${err.message}`),
  })
}

export function useUpdateWebhook() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Webhook> }) =>
      webhooksApi.update(id, updates),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: webhookKeys.lists() }),
    onError: (err: Error) => toast.error(`Failed: ${err.message}`),
  })
}

export function useDeleteWebhook() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: webhooksApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: webhookKeys.lists() })
      toast.success('Webhook deleted')
    },
    onError: (err: Error) => toast.error(`Failed: ${err.message}`),
  })
}
