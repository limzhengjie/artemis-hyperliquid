import Image from 'next/image'

import { Member } from '@/constants/members'

import ArtemisLogo from '@/public/artemis-light.svg'

interface Props {
  members: Member[]
}

const LogoGrid = ({ members }: Props) => {
  return (
    <div className="relative w-full max-w-[550px] border border-solid border-[var(--color-pluto-purple-100)] rounded-xl px-8 py-10 pb-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {members.map((member, index) => (
          <div
            key={member.name}
            className={`flex justify-center items-center ${
              members.length === 18 && index >= 16
                ? 'lg:col-span-1 lg:col-start-' + (index === 16 ? '2' : '3')
                : ''
            }`}
          >
            <Image
              src={member.image}
              alt={member.name}
              width={70}
              height={70}
            />
          </div>
        ))}
      </div>
      <Image
        src={ArtemisLogo}
        alt="Artemis Logo"
        width={130}
        height={130}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white px-2"
      />
    </div>
  )
}

export default LogoGrid
