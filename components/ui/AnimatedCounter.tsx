"use client"

import CountUp from 'react-countup'


const AnimatedCounter = ({ amount }: { amount: number }) => {
  return (
    <span>
      <CountUp
        decimals={2}
        decimal=","
        prefix="$"
        end={amount}
      />
    </span>
  )
}

export default AnimatedCounter