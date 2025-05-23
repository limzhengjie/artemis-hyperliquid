export default function HumaInfo() {
  return (
    <div className="w-full flex flex-col items-start gap-4">
      <p>
        Huma Finance provides on-demand stablecoin liquidity through its PayFi
        Network, enabling licensed financial institutions to settle crossborder
        transactions and stablecoin-backed card payments without traditional
        pre-funding. This innovative approach addresses the $4 trillion
        currently locked in bank accounts worldwide for payment settlements.
      </p>

      <p>
        <strong>Key Use Cases</strong>
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>
          Cross-Border Payment Financing: Working with global payment
          institutions through regulated entity Arf Financia
        </li>
        <li>
          Stablecoin-Backed Card Solutions: Enabling settlement with
          VISA/Mastercard network
        </li>
        <li>
          Marketplace Payment Acceleration: Pilot with Amazon's payment partners
          enables supplier payments in Asia in under 3 hours instead of days.
          Amazon makes ~$1T in payments annually, typically collecting from US
          buyers and paying Asian suppliers
        </li>
        <li>
          Instant Merchant Settlements: Eliminating multi-day wait times for
          card payment processing
        </li>
      </ul>

      <p>
        <strong>Performance Metrics</strong>
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>
          Zero Defaults: No credit defaults on $4B in transactions to date,
          compared to industry average of 0.25% (per S&P
        </li>
        <li>
          Daily partner transactions typically range from $1-5 million,
          sometimes up to $50 million/da
        </li>
        <li>Majority of liquidity settles back in 1-6 day</li>
        <li>Daily rates of 6-10 basis point</li>
        <li>
          First blockchain company to work with Circle and leverage USDC for the
          above PayFi use cases<sup>1</sup>
        </li>
      </ul>

      <p>
        Huma minimizes risk by funding transactions already in the system with
        safeguarded incoming capital. Growth is primarily driven by expanding
        stablecoin liquidity, particularly since launching on Solana. In
        addition, the recent launch of Huma 2.0 represents significant protocol
        innovation, broadening PayFi access beyond institutions to everyday
        retail investors. Finally, through Arf, Huma serves licensed financial
        institutions globally, working to expand as regulatory frameworks for
        stablecoins become clearer worldwide.
      </p>
      <div className="w-1/2 h-[1px] bg-border" />
      <div className="flex flex-col gap-2 text-sm text-muted-foreground">
        <p>
          <sup>1</sup>
          <a
            href="https://www.circle.com/case-studies/arf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Global Liquidity for Real-Time Payments with Arf and USDC
          </a>
          (2025)
        </p>
      </div>
    </div>
  )
}
