import ContentWrapper from '@/components/(layout)/content-wrapper'

const Methodology = () => {
  return (
    <div className="w-full pt-12 pb-12 flex flex-col items-center gap-6 font-[family-name:var(--font-geist-sans)]">
      <ContentWrapper>
        <div className="flex flex-col gap-6">
          <h1 className="text-foreground font-semibold text-[28px] md:text-[32px] leading-[28px] md:leading-[32px] text-left">
            Methodology
          </h1>
          <p>
            For this study, we aggregate transaction data from 20 payment
            service providers<sup>1</sup> and other firms facilitating
            stablecoin payments, supplemented with estimates derived from
            on-chain data and other ancillary data sources for an additional 11
            firms<sup>2</sup>, for a total of 31 stablecoin payments companies.
            All the data, with the exception of Binance Pay, which settles
            transactions directly between users with accounts on the exchange,
            pertains to stablecoin transactions settling onchain. Generally
            speaking, these payments are made on behalf of end users (consumer
            or enterprise) for card transactions, business-to-consumer payments,
            business-to-business payments, or p2p payments. The exception is
            Lending, which refers to loans made in stablecoin terms to other
            stablecoin-based payment processors. Other forms of lending were not
            considered (even if associated transactions are all settled in
            stablecoins), since these do not pertain to payments. Some of the
            firms listed are service providers for other firms in the dataset;
            therefore, some duplication in volumes is possible, although we
            tried to de-duplicate whenever we had flow-through data. For certain
            providers, we opted to use only a subset of data, such as with
            Binance Pay, where we excluded intra-country transfers (which we
            felt had a higher probability of being &apos;non-economic&apos;
            transactions). Generally, we opted for conservative estimates
            wherever possible.
          </p>
          <p>
            For the study, we aimed to limit our data collection exclusively to
            transactions that involved some sort of payment reflecting genuine
            payment activity (excluding flows pertaining to investment). There
            are trillions of dollars worth of stablecoin transactions on-chain
            every year, but we were only interested in a bottom-up analysis of
            firms settling payments for known individuals and businesses. As of
            publication date, Artemis estimates $26 trillion dollars of onchain
            stablecoin settlement per year (adjusted to remove known sources of
            noise), but a large percentage of these are transactions associated
            with trading (on exchanges and DeFi), MEV, and other non-payment
            type transactions. In our study we were able to characterize
            approximately one percent of all of the nominal stablecoin
            settlement activity on blockchains. While this figure seems small,
            it amounts to $72.3 billion worth of known stablecoin-based payments
            on an annualized basis for our most recent month of data (February
            2025). The firms represented are a subset of all stablecoin-based
            payment service providers and do not exhaustively represent the
            sector, but we believe that we have captured a meaningful share of
            transaction volume. We expect to grow our coverage in future
            iterations of the study.{' '}
          </p>
          <p>
            The data request was made for monthly transaction data broken down
            by user type (b2b, b2c, p2p, etc), blockchain, sending and receiving
            countries (where available), and specific stablecoin employed. In
            some cases, charts are derived from a subset of firms (as not all
            contributing firms provided exhaustive breakdowns). Data was
            collected in May 2025 and dates to 2020. Naturally, some firms only
            started operating recently, so the growth in some charts reflects
            both growth in payment volumes on a per-firm basis, but also the
            emergence of more firms in the sector. Data is aggregated by
            transaction type and anonymized at the company level.
          </p>
          <div className="w-1/2 h-[1px] bg-border" />
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <p>
              <sup>1</sup> Contributing firms are named above under &apos;Data
              Partners&apos;. They gave us express permission to share their
              data in aggregated and anonymized format.
            </p>
            <p>
              <sup>2</sup> These 11 firms include: Bitpay, Bitpanda, Bridge,
              Cypher card, Exa, Gnosis Pay, Helio, Holyheld, MiniPay, Request,
              and Sling.
            </p>
          </div>
        </div>
      </ContentWrapper>
    </div>
  )
}

export default Methodology
