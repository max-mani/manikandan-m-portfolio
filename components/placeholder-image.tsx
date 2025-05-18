import Image from "next/image"

interface PlaceholderImageProps {
  width: number
  height: number
  alt: string
  className?: string
}

export default function PlaceholderImage({ width, height, alt, className }: PlaceholderImageProps) {
  // Create a data URL for a simple SVG placeholder
  const svgPlaceholder = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f0f0f0"/>
      <text x="50%" y="50%" fontFamily="Arial" fontSize="20" textAnchor="middle" dominantBaseline="middle" fill="#888">
        ${alt}
      </text>
    </svg>
  `

  const dataUrl = `data:image/svg+xml;base64,${Buffer.from(svgPlaceholder).toString("base64")}`

  return <Image src={dataUrl || "/placeholder.svg"} width={width} height={height} alt={alt} className={className} />
}
