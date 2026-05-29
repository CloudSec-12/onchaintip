'use client'

import { useState } from 'react'
import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther, isAddress } from 'viem'
import { base } from 'wagmi/chains'

const PRESETS = ['0.0001', '0.001', '0.005', '0.01']

export function TipForm() {
  const { isConnected, chainId } = useAccount()
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const { sendTransaction, data: txHash, isPending } = useSendTransaction()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash: txHash })

  const isWrongNetwork = isConnected && chainId !== base.id
  const isValidAddress = isAddress(recipient)
  const isValidAmount = !!amount && parseFloat(amount) > 0
  const canSubmit = isConnected && isValidAddress && isValidAmount && !isPending && !isConfirming && !isWrongNetwork

  function handleSend() {
    setError('')
    if (!isValidAddress) return setError('Invalid wallet address.')
    if (!isValidAmount) return setError('Enter a valid ETH amount.')
    sendTransaction(
      {
        to: recipient as `0x${string}`,
        value: parseEther(amount),
        ...(message ? { data: `0x${Buffer.from(message, 'utf8').toString('hex')}` as `0x${string}` } : {}),
      },
      { onError: (e) => setError(e.message?.split('\n')[0] || 'Transaction failed.') }
    )
  }

  if (isSuccess && txHash) {
    return (
      <div className="flex flex-col items-center gap-6 py-4">
        <div className="w-14 h-14 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-2xl text-blue-400">✓</div>
        <div className="text-center">
          <p className="font-bold text-lg">Tip sent!</p>
          <p className="text-base-sub text-sm mt-1">{amount} ETH → {recipient.slice(0,6)}...{recipient.slice(-4)}</p>
        </div>
        <a href={`https://basescan.org/tx/${txHash}`} target="_blank" rel="noopener noreferrer"
          className="text-blue-400 text-sm underline underline-offset-4 hover:text-blue-300">
          View on Basescan ↗
        </a>
        <button onClick={() => { setRecipient(''); setAmount(''); setMessage('') }}
          className="text-base-sub text-sm hover:text-base-text transition-colors">
          Send another tip
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5 w-full">

      <div className="flex flex-col gap-2">
        <label className="text-xs text-base-sub uppercase tracking-widest">Recipient</label>
        <input
          type="text" placeholder="0x... wallet address" value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className={`w-full bg-base-card border rounded-lg px-4 py-3 text-sm text-base-text transition-colors
            ${recipient && !isValidAddress ? 'border-red-500/50' : 'border-base-border focus:border-blue-500/50'}`}
        />
        {recipient && !isValidAddress && <p className="text-red-400 text-xs">Not a valid address</p>}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs text-base-sub uppercase tracking-widest">Amount (ETH)</label>
        <div className="grid grid-cols-4 gap-2 mb-1">
          {PRESETS.map((p) => (
            <button key={p} onClick={() => setAmount(p)}
              className={`py-2 rounded-lg text-xs border transition-all
                ${amount === p ? 'bg-base-blue border-base-blue text-white' : 'bg-base-card border-base-border text-base-sub hover:text-base-text hover:border-base-muted'}`}>
              {p}
            </button>
          ))}
        </div>
        <input type="number" placeholder="Custom amount" value={amount}
          onChange={(e) => setAmount(e.target.value)} min="0" step="0.0001"
          className="w-full bg-base-card border border-base-border focus:border-blue-500/50 rounded-lg px-4 py-3 text-sm text-base-text transition-colors"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs text-base-sub uppercase tracking-widest">
          Message <span className="normal-case text-base-muted">(optional)</span>
        </label>
        <input type="text" placeholder="gm, great work, keep building..." value={message}
          maxLength={100} onChange={(e) => setMessage(e.target.value)}
          className="w-full bg-base-card border border-base-border focus:border-blue-500/50 rounded-lg px-4 py-3 text-sm text-base-text transition-colors"
        />
      </div>

      {isWrongNetwork && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg px-4 py-3 text-yellow-400 text-xs">
          ⚠ Switch to Base network in your wallet
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 text-red-400 text-xs">{error}</div>
      )}

      <button onClick={handleSend} disabled={!canSubmit}
        className={`w-full py-4 rounded-xl font-bold text-base transition-all duration-200
          ${canSubmit ? 'bg-base-blue hover:bg-blue-500 text-white active:scale-[0.98]' : 'bg-base-card border border-base-border text-base-muted cursor-not-allowed'}`}>
        {isPending ? 'Confirm in wallet...' : isConfirming ? 'Confirming...' : 'Send Tip →'}
      </button>

      {!isConnected && (
        <p className="text-center text-xs text-base-sub">Connect your wallet above to send a tip</p>
      )}
    </div>
  )
}
