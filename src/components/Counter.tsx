import { useState } from 'react'

export const Counter = () => {
  const [count, setCount] = useState(0)
  const [amount, setAmount] = useState(0)
  return (
    <div className='space-y-2 space-x-2'>
      <h1 className='text-2xl'>{count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <input
        type="number"
        name="amount"
        value={amount}
        className='text-black p-1'
        onChange={(e) => setAmount(parseInt(e.target.value))}
      />
      <button onClick={() => setCount(amount)}>Set</button>
    </div>
  )
}