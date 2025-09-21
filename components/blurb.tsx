import { cn } from '@/lib/utils'

interface Props {
  title: string
  description: string | React.ReactNode
  textAlignment?: 'left' | 'center' | 'right'
  titleAlignment?: 'left' | 'center' | 'right'
  descriptionAlignment?: 'left' | 'center' | 'right'
  fullWidth?: boolean
}

const Blurb = ({
  title,
  description,
  textAlignment = 'left',
  titleAlignment,
  descriptionAlignment,
  fullWidth = false
}: Props) => {
  const alignTitle = titleAlignment || textAlignment
  const alignDesc = descriptionAlignment || textAlignment
  return (
    <div
      className={cn(
        fullWidth
          ? 'w-full flex flex-col gap-4 md:gap-8'
          : cn(
              'w-full flex flex-col gap-4 md:gap-8 max-w-4xl',
              alignTitle === 'center' && 'items-center',
              alignTitle === 'right' && 'items-end'
            )
      )}
    >
      <h2
        className={cn(
          'text-foreground font-semibold text-[24px] md:text-[32px] leading-[24px] md:leading-[32px]',
          alignTitle === 'center' && 'text-center',
          alignTitle === 'right' && 'text-right'
        )}
      >
        {title}
      </h2>
      <p
        className={cn(
          'text-muted-foreground text-md',
          alignDesc === 'center' && 'text-center',
          alignDesc === 'right' && 'text-right'
        )}
      >
        {description}
      </p>
    </div>
  )
}

export default Blurb
