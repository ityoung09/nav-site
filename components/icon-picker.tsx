"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { iconNames, getIconComponent } from "@/lib/icons"
import { cn } from "@/lib/utils"

interface IconPickerProps {
  value?: string
  onChange: (iconName: string) => void
  className?: string
}

export default function IconPicker({ value, onChange, className }: IconPickerProps) {
  const [search, setSearch] = useState("")
  const [open, setOpen] = useState(false)

  const filteredIcons = iconNames.filter((name) => name.toLowerCase().includes(search.toLowerCase()))

  const SelectedIcon = value ? getIconComponent(value) : null

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn("w-full justify-start", className)}>
          {SelectedIcon ? (
            <div className="flex items-center space-x-2">
              <SelectedIcon className="h-4 w-4" />
              <span>{value}</span>
            </div>
          ) : (
            <span>Select an icon...</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        <div className="p-3 border-b">
          <Input placeholder="Search icons..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <ScrollArea className="h-64">
          <div className="grid grid-cols-6 gap-1 p-2">
            {filteredIcons.map((iconName) => {
              const IconComponent = getIconComponent(iconName)
              return (
                <Button
                  key={iconName}
                  variant="ghost"
                  size="sm"
                  className="h-10 w-10 p-0"
                  onClick={() => {
                    onChange(iconName)
                    setOpen(false)
                  }}
                  title={iconName}
                >
                  <IconComponent className="h-4 w-4" />
                </Button>
              )
            })}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}
