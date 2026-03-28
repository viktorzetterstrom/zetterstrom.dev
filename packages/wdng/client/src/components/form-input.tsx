interface FormInputProps {
  label: string
  id: string
  name: string
  type?: "text" | "email"
  required?: boolean
}

export function FormInput({ label, id, name, type = "text", required = false }: FormInputProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-mono text-sm text-stone-600">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        required={required}
        className="w-full border-0 border-b-2 border-dashed border-stone-300 bg-transparent px-0 py-4 font-mono focus:border-stone-600 focus:ring-0 focus:outline-none"
      />
    </div>
  )
}
