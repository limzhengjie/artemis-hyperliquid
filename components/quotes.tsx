interface Props {
  quotes: { quote: string; author: string }[]
}

const Quotes = ({ quotes }: Props) => {
  return (
    <div className="flex flex-col gap-12">
      {quotes.map(quote => (
        <div key={quote.quote}>{quote.quote}</div>
      ))}
    </div>
  )
}

export default Quotes
