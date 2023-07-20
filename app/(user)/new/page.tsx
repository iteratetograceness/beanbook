import { CreateNewSip } from '@/components/add-new/create-new-sip'
import { TastingGuide } from '@/components/add-new/tasting-guide'
import { Card } from '@/components/ui/card'

export default function AddNewSip() {
  return (
    <Card className='p-4 border-none'>
      <div className='flex gap-4 mb-4'>
        <h1 className='font-semibold text-3xl'>New Sip</h1>
        <TastingGuide />
      </div>
      <CreateNewSip />
    </Card>
  )
}
