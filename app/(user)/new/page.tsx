import { CreateNewSip } from '@/components/form/create-new-sip'
import { Card } from '@/components/ui/card'

export default function AddNewSip() {
  return (
    <Card className='p-4 border-none'>
      <CreateNewSip />
    </Card>
  )
}
