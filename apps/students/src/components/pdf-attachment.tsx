import { HugeiconsIcon } from "@hugeicons/react"
import { Download01Icon, File01Icon } from "@hugeicons/core-free-icons"
import Image from "next/image"

interface PdfAttachmentProps {
  fileName: string
  fileUrl: string
  /** Optional: URL to an image preview of the first page */
  thumbnailUrl?: string
}

export function PdfAttachment({
  fileName,
  fileUrl,
  thumbnailUrl,
}: PdfAttachmentProps) {
  return (
    <a
      href={fileUrl}
      download
      target="_blank"
      rel="noopener noreferrer"
      className="group flex w-full flex-col overflow-hidden rounded-2xl border bg-accent/20 transition-all duration-300 hover:shadow-md"
    >
      {/* Top: Preview Area */}
      <div className="relative m-1 flex h-36 items-center justify-center overflow-hidden rounded-2xl bg-accent/15">
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt={`Preview of ${fileName}`}
            fill
            className="rounded-xl object-cover object-top transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 192px"
          />
        ) : (
          // Fallback UI if you don't have a thumbnail image generated
          <div className="flex flex-col items-center text-black">
            <HugeiconsIcon icon={File01Icon} />
            <span className="mt-2 text-[10px] font-semibold tracking-widest text-black uppercase">
              PDF Document
            </span>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-blue-900/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Bottom: File Info & Download Action */}
      <div className="flex items-center justify-between px-3 py-1">
        <span
          className="truncate pr-3 text-sm font-medium text-foreground"
          title={fileName}
        >
          {fileName}
        </span>

        {/* Download Button Icon */}
        <div className="shrink-0 rounded-full bg-accent p-1.5 text-foreground transition-colors duration-300 group-hover:bg-muted-foreground group-hover:text-white">
          <HugeiconsIcon icon={Download01Icon} />
        </div>
      </div>
    </a>
  )
}

export function NoFileCard({ fileName, thumbnailUrl }: { fileName: string; thumbnailUrl?: string }) {
  return (
    <div className="group flex w-full flex-col overflow-hidden rounded-2xl border bg-accent/20 transition-all duration-300 hover:shadow-md">
      {/* Top: Preview Area */}
      <div className="relative m-1 flex h-36 items-center justify-center overflow-hidden rounded-2xl bg-accent/15">
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt={`Preview of ${fileName}`}
            fill
            className="rounded-xl object-cover object-top transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 192px"
          />
        ) : (
          // Fallback UI if you don't have a thumbnail image generated
          <div className="flex flex-col items-center text-black">
            <HugeiconsIcon icon={File01Icon} />
            <span className="mt-2 text-[10px] font-semibold tracking-widest text-black uppercase">
              PDF Document
            </span>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-blue-900/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Bottom: File Info & Download Action */}
      <div className="flex items-center justify-between px-3 py-1">
        <span
          className="truncate px-3 text-sm font-medium text-foreground"
          title={fileName}
        >
          {fileName}
        </span>

        {/* Download Button Icon */}

      </div>
    </div>
  )
}