import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { authApi } from '@/api/auth'
import { usersApi } from '@/api/users'
import { toast } from 'sonner'

export const authKeys = {
  user: ['auth', 'user'] as const,
}

export function useCurrentUser() {
  return useQuery({
    queryKey: authKeys.user,
    queryFn: usersApi.getCurrent,
    retry: false,
    staleTime: 1000 * 60 * 10,
    enabled: typeof window !== 'undefined' && !!localStorage.getItem('auth_token'),
  })
}

export function useSignIn() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: authApi.signIn,
    onSuccess: (data) => {
      if (data.user) queryClient.setQueryData(authKeys.user, data.user)
      toast.success('Signed in successfully')
    },
    onError: (err: Error) => toast.error(`Sign in failed: ${err.message}`),
  })
}

export function useSignUp() {
  return useMutation({
    mutationFn: authApi.signUp,
    onSuccess: () =>
      toast.success('Account created. Please check your email to verify.'),
    onError: (err: Error) => toast.error(`Sign up failed: ${err.message}`),
  })
}

export function useSignOut() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: authApi.signOut,
    onSuccess: () => {
      queryClient.clear()
      toast.success('Signed out')
    },
  })
}
