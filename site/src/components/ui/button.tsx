import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'cn'
import { Slot } from 'radix-ui'

const buttonVariants = cva(
  'inline-flex min-h-11 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-transparent px-6 text-sm font-semibold leading-5 transition-colors duration-[var(--motion-fast)] motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:outline-destructive [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary-hover',
        outline: 'border-foreground bg-card text-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground',
        secondary: 'border-foreground bg-secondary text-secondary-foreground hover:bg-muted',
        ghost: 'text-foreground hover:bg-muted',
        destructive: 'text-destructive hover:bg-muted',
        link: 'text-primary hover:text-primary-hover hover:underline',
      },
      size: {
        default: 'px-6',
        sm: 'px-4',
        lg: 'min-h-12 px-8',
        icon: 'w-11 px-0',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
)

function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : 'button'

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
