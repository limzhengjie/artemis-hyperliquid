import { cn } from '@/lib/utils'

interface Props {
  title: string
  description: string
  textAlignment?: 'left' | 'center' | 'right'
}

const Blurb = ({ title, description, textAlignment = 'left' }: Props) => {
  return (
    <div
      className={cn(
        'w-full flex flex-col gap-8 max-w-3xl',
        textAlignment === 'center' && 'items-center',
        textAlignment === 'right' && 'items-end'
      )}
    >
      <h3 className="text-foreground font-semibold text-[40px] leading-[40px]">
        {title}
      </h3>
      <p className="text-muted-foreground text-md">{description}</p>
    </div>
  )
}

export default Blurb
