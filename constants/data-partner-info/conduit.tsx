export default function ConduitInfo() {
  return (
    <div className="w-full flex flex-col items-start gap-4">
      <p>
        At Conduit, we enable businesses to seamlessly transact in and out of
        stablecoins and local fiat currencies, between a wide network of
        domestic payment rails. By integrating with our API, payment platforms,
        fintechs and neobanks can provide{' '}
        <strong>stablecoin-assisted cross-border payments</strong> for their
        customers - allowing them to make fast, low-fee payments in US dollars
        and 10+ other currencies.
      </p>

      <p>
        <strong>Why stablecoin-powered payments matter to businesses</strong>
      </p>

      <ul className="list-disc pl-5 space-y-4">
        <li>
          Near-instant settlement speeds vastly reduce the amount of time
          payments are in transit, freeing up working capital and credit
          requirements for businesses.
        </li>
        <p>
          <strong>
            Businesses in Brazil settle payments in Euros over 500x faster with
            Conduit, saving thousands of hours of transaction settlement time
            yearly
          </strong>
        </p>

        <li>
          In markets with volatile local currencies, stablecoins allow
          businesses to keep their treasury dollar-denominated, while remaining
          liquid for fast domestic payments.
        </li>
        <p>
          <strong>
            Companies in Colombia holding their treasury in USD-pegged
            stablecoins in 2024 halved inflation on their funds, from 6.6% to
            2.9
          </strong>
        </p>

        <li>
          Blockchain transparency and increased settlement speed remove the
          black box of cross border payments, eliminating the need for MT103s
          and other legacy methods of verifying transactions.
        </li>
        <p>
          <strong>
            Pay-outs in stablecoins are instant and immutable, improving time
            spent on reconciliation and lowering operational overhead.
          </strong>
        </p>
      </ul>
    </div>
  )
}
