import { cn } from '@/lib/utils'

interface Props {
  title: string
  description: string | React.ReactNode
  textAlignment?: 'left' | 'center' | 'right'
}

const Blurb = ({ title, description, textAlignment = 'left' }: Props) => {
  return (
    <div
      className={cn(
        'w-full flex flex-col gap-4 md:gap-8 max-w-4xl',
        textAlignment === 'center' && 'items-center',
        textAlignment === 'right' && 'items-end'
      )}
    >
      <h2
        className={cn(
          'text-foreground font-semibold text-[24px] md:text-[32px] leading-[24px] md:leading-[32px]',
          textAlignment === 'center' && 'text-center',
          textAlignment === 'right' && 'text-right'
        )}
      >
        {title}
      </h2>
      <p className="text-muted-foreground text-md">{description}</p>
    </div>
  )
}

export default Blurb
