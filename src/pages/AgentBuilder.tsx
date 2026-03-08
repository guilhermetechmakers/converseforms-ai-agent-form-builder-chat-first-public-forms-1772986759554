import { useParams, useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Skeleton } from '@/components/ui/skeleton'
import { AnimatedPage } from '@/components/AnimatedPage'
import { useAgent, useUpdateAgent, useCreateAgent } from '@/hooks/useAgents'
import { ArrowLeft } from 'lucide-react'

export default function AgentBuilder() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isNew = id === 'new'
  const { data: agent, isLoading } = useAgent(isNew ? '' : id ?? '')
  const updateAgent = useUpdateAgent()
  const createAgent = useCreateAgent()

  if (!isNew && isLoading) {
    return (
      <AnimatedPage className="p-6">
        <Skeleton className="mx-auto h-96 max-w-2xl" />
      </AnimatedPage>
    )
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const name = (form.elements.namedItem('name') as HTMLInputElement).value
    const description = (form.elements.namedItem('description') as HTMLInputElement).value
    if (isNew) {
      createAgent.mutate(
        { name, description },
        { onSuccess: (data) => navigate(`/dashboard/agents/${data.id}`) }
      )
    } else if (id) {
      updateAgent.mutate(
        { id, updates: { name, description } },
        { onSuccess: () => navigate(`/dashboard/agents/${id}`) }
      )
    }
  }

  return (
    <AnimatedPage className="p-6 md:p-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/dashboard/agents">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-semibold text-foreground">
            {isNew ? 'New agent' : agent?.name ?? 'Edit agent'}
          </h1>
        </div>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>Basic info</CardTitle>
            <p className="text-sm text-muted-foreground">
              Name and description. Add fields, persona, and appearance in the full editor.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={agent?.name}
                  placeholder="e.g. Lead capture"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={agent?.description}
                  placeholder="What this agent collects"
                  rows={3}
                />
              </div>
              <div className="flex gap-3">
                <Button type="submit" disabled={updateAgent.isPending || createAgent.isPending}>
                  {isNew ? 'Create' : 'Save'}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link to="/dashboard/agents">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {!isNew && agent && (
          <Card className="mt-6 border-border">
            <CardHeader>
              <CardTitle>Fields & persona</CardTitle>
              <p className="text-sm text-muted-foreground">
                Field palette, validation, persona editor, and appearance live in the full Agent Builder. 
                This is a simplified view for routing; extend with field list and persona form.
              </p>
            </CardHeader>
          </Card>
        )}
      </div>
    </AnimatedPage>
  )
}
