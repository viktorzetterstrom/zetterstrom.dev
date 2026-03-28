interface FormTextareaProps {
  label: string
  id: string
  name: string
  rows?: number
}

export function FormTextarea({ label, id, name, rows = 1 }: FormTextareaProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-mono text-sm text-stone-600">
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        rows={rows}
        className="w-full resize-none border-0 border-b-2 border-dashed border-stone-300 bg-transparent px-0 py-4 font-mono focus:border-stone-600 focus:ring-0 focus:outline-none"
      />
    </div>
  )
}
