import Image from "next/image"

export default function Logo() {
  return (
    <div className="fixed top-4 left-4 z-10">
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/To_do_LOGO-vPnrNShViwxBPXtuUpo8SwsBjSvNAk.png"
        alt="Todo Logo"
        width={60}
        height={60}
        className="invert-0 dark:invert transition-all duration-300"
      />
    </div>
  )
}

