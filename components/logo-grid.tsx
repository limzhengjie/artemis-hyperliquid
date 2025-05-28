import Image from 'next/image'

import { DataPartner } from '@/constants/data-partners'

import ArtemisBWLogo from '@/public/artemis-bw.svg'

interface Props {
  dataPartners: DataPartner[]
}

const LogoGrid = ({ dataPartners }: Props) => {
  return (
    <div className="relative w-full max-w-[750px] border border-solid border-[var(--color-pluto-purple-100)] rounded-xl px-8 py-10 pb-12">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-10">
        {dataPartners.map(dataPartner => (
          <div
            key={dataPartner.name}
            className={`flex justify-center items-center`}
          >
            <Image
              src={dataPartner.image}
              alt={dataPartner.name}
              width={100}
              height={100}
              className="grayscale-100 brightness-75 transition-all duration-500"
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
