import { useParams, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { AnimatedPage } from '@/components/AnimatedPage'
import { useSession } from '@/hooks/useSessions'
import { ArrowLeft } from 'lucide-react'
import { format } from 'date-fns'

export default function SessionViewer() {
  const { id } = useParams()
  const { data: session, isLoading } = useSession(id ?? '')

  if (isLoading || !session) {
    return (
      <AnimatedPage className="p-6">
        <Skeleton className="mx-auto h-96 max-w-4xl" />
      </AnimatedPage>
    )
  }

  return (
    <AnimatedPage className="p-6 md:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/dashboard/sessions">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-semibold text-foreground">Session</h1>
        </div>

        <Card className="mb-6 border-border">
          <CardHeader>
            <CardTitle>Transcript</CardTitle>
            <p className="text-sm text-muted-foreground">
              {session.messages?.length ?? 0} messages · {session.status}
            </p>
          </CardHeader>
          <CardContent className="max-h-80 overflow-y-auto space-y-2">
            {session.messages?.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <span
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                    m.role === 'user' ? 'bg-primary/10' : 'bg-muted'
                  }`}
                >
                  {m.content}
                </span>
                <span className="ml-2 self-end text-xs text-muted-foreground">
                  {format(new Date(m.timestamp), 'HH:mm')}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>Extracted fields</CardTitle>
            <p className="text-sm text-muted-foreground">
              Structured data collected during the conversation.
            </p>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Field</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Validated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {session.extractedFields?.map((f) => (
                  <TableRow key={f.fieldId}>
                    <TableCell className="font-medium">{f.label}</TableCell>
                    <TableCell>
                      {Array.isArray(f.value) ? f.value.join(', ') : String(f.value)}
                    </TableCell>
                    <TableCell>{f.validated ? 'Yes' : 'No'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {(!session.extractedFields || session.extractedFields.length === 0) && (
              <p className="py-6 text-center text-muted-foreground">No fields extracted yet.</p>
            )}
          </CardContent>
        </Card>

        <div className="mt-4 flex gap-2">
          <Button variant="outline" asChild>
            <Link to="/dashboard/sessions">Back to sessions</Link>
          </Button>
        </div>
      </div>
    </AnimatedPage>
  )
}
