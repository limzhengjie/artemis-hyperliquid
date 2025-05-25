import { VALUE_FORMAT } from '@/constants/chart'
import Chart from '@/components/chart'
import ContentWrapper from '@/components/(layout)/content-wrapper'
import Blurb from '@/components/blurb'

import {
  B2B_VOLUMES_DATA,
  B2B_VOLUMES_DATA_CONFIG,
  CRYPTO_CARD_LINKED_VOLUMES_DATA,
  CRYPTO_CARD_LINKED_VOLUMES_CONFIG,
  P2P_VOLUMES_DATA,
  P2P_VOLUMES_CONFIG,
  B2C_VOLUMES_DATA,
  B2C_VOLUMES_CONFIG,
  PREFUNDING_DATA,
  PREFUNDING_CONFIG
} from '@/constants/data/use-case'

const UseCase = () => {
  return (
    <div className="w-full pt-12 pb-12 flex flex-col items-center gap-12 font-[family-name:var(--font-geist-sans)]">
      <ContentWrapper>
        <Blurb
          title="Stablecoin Use Cases"
          description="Stablecoins are increasingly being used for a variety of use cases, including B2B payments, card-based spending, peer-to-peer payments, and loans."
        />
      </ContentWrapper>

      <ContentWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-16">
          <div className="md:order-1">
            <Blurb
              title="B2B"
              description="While stablecoins are often associated with retail usage and remittances, a growing share of volume is being driven by business-to-business (B2B) transactions. Aggregate B2B stablecoin volumes among companies in the study have grown substantially, from under $100 million in monthly volume at the start of 2023 to over $3.0 billion by early 2025."
            />
          </div>
          <div className="col-span-2 md:order-2">
            <Chart
              title="B2B Stablecoin Volumes"
              data={B2B_VOLUMES_DATA}
              dataConfig={B2B_VOLUMES_DATA_CONFIG}
              valueFormat={VALUE_FORMAT.currency}
              isTimeSeries
              hideLegend
              hidePoweredBy
            />
          </div>
        </div>
      </ContentWrapper>

      <ContentWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-16">
          <div className="md:order-1">
            <Blurb
              title="Card"
              description="As stablecoin infrastructure matures, one of the fastest-growing applications has been card-based spending. Enabled through fintech issuers and crypto-native platforms, stablecoin-linked cards allow users globally to spend digital dollars in real-world settings."
            />
          </div>
          <div className="col-span-2 md:order-2">
            <Chart
              title="Crypto Card Linked Volumes"
              data={CRYPTO_CARD_LINKED_VOLUMES_DATA}
              dataConfig={CRYPTO_CARD_LINKED_VOLUMES_CONFIG}
              valueFormat={VALUE_FORMAT.currency}
              isTimeSeries
              hideLegend
              hidePoweredBy
            />
          </div>
        </div>
      </ContentWrapper>

      <ContentWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-16">
          <div className="md:order-1">
            <Blurb
              title="P2P"
              description="Peer-to-peer (P2P) payments were among the earliest use cases for stablecoins, offering a faster, cheaper, and more accessible alternative to traditional remittance and money transfer channels. This use case gained early traction in regions facing currency instability, limited banking access, or high cross-border fees."
            />
          </div>
          <div className="col-span-2 md:order-2">
            <Chart
              title="P2P Stablecoin Volumes"
              data={P2P_VOLUMES_DATA}
              dataConfig={P2P_VOLUMES_CONFIG}
              valueFormat={VALUE_FORMAT.currency}
              isTimeSeries
              hideLegend
              hidePoweredBy
            />
          </div>
        </div>
      </ContentWrapper>

      <ContentWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-16">
          <div className="md:order-1">
            <Blurb
              title="B2C"
              description="B2C payments represent another fast-growing area of stablecoin adoption, particularly in use cases where individuals receive payouts, such as payroll transactions, or make recurring purchases using digital dollars."
            />
          </div>
          <div className="col-span-2 md:order-2">
            <Chart
              title="B2C Stablecoin Volumes"
              data={B2C_VOLUMES_DATA}
              dataConfig={B2C_VOLUMES_CONFIG}
              valueFormat={VALUE_FORMAT.currency}
              isTimeSeries
              hideLegend
              hidePoweredBy
            />
          </div>
        </div>
      </ContentWrapper>

      <ContentWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-16">
          <div className="md:order-1">
            <Blurb
              title="Prefunding"
              description="Stablecoin-based loan volume from Arf and Mansa, two lending platforms focused on serving digital asset and crossborder payment firms, has grown steadily since late 2022. These platforms provide short-term credit lines denominated in USDT and USDC, specifically tailored for use cases like pre-funding cross-border transfers, supplier payouts, and working capital needs."
            />
          </div>
          <div className="col-span-2 md:order-2">
            <Chart
              title="Stablecoin Prefunding"
              data={PREFUNDING_DATA}
              dataConfig={PREFUNDING_CONFIG}
              valueFormat={VALUE_FORMAT.currency}
              isTimeSeries
              hidePoweredBy
            />
          </div>
        </div>
      </ContentWrapper>
    </div>
  )
}

export default UseCase
