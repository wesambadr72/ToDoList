import Image from "next/image"

export default function Copyright() {
  return (
    <div className="fixed bottom-4 left-4 z-10 flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-lg">
      <span className="text-xs text-foreground">This website was developed by wesam dev.</span>
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1740786687175-RMCh0VZym7h6FB8Ezo5pKRHR1A0oXk.png"
        alt="Wesam Dev Logo"
        width={20}
        height={20}
        className="transition-all duration-300"
      />
    </div>
  )
}

