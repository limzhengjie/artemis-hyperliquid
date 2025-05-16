import Image from 'next/image'

import { DataPartner } from '@/constants/data-partners'

import ArtemisBWLogo from '@/public/artemis-bw.svg'

interface Props {
  dataPartners: DataPartner[]
}

const LogoGrid = ({ dataPartners }: Props) => {
  return (
    <div className="relative w-full max-w-[550px] border border-solid border-[var(--color-pluto-purple-100)] rounded-xl px-8 py-10 pb-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {dataPartners.map((dataPartner, index) => (
          <div
            key={dataPartner.name}
            className={`flex justify-center items-center ${
              dataPartners.length === 18 && index >= 16
                ? 'lg:col-span-1 lg:col-start-' + (index === 16 ? '2' : '3')
                : ''
            }`}
          >
            <Image
              src={dataPartner.image}
              alt={dataPartner.name}
              width={70}
              height={70}
            />
          </div>
        ))}
      </div>
      <Image
        src={ArtemisBWLogo}
        alt="Artemis Logo"
        width={100}
        height={100}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white px-2"
      />
    </div>
  )
}

export default LogoGrid
