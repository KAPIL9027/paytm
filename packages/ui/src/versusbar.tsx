import React from 'react'

const versusbar = ({totalMoney, moneyMade}: {totalMoney: number,moneyMade: number}) => {
    const percentage = (moneyMade / totalMoney) * 100;
  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
      type="range"
      min="0"
      max={totalMoney}
      value={moneyMade}
      readOnly
      className="w-full h-2 rounded-lg appearance-none cursor-pointer"
      style={{
        background: `linear-gradient(to right, green 0%, green ${percentage !== 0 ? percentage : 100}%, red ${percentage}%, red 100%)`,
      }}
      />
    </div>
  )
}

export default versusbar
