interface FormCheckboxProps {
  label: string
  id: string
  name: string
  checked?: boolean
  disabled?: boolean
  readOnly?: boolean
}

export function FormCheckbox({
  label,
  id,
  name,
  checked,
  disabled = false,
  readOnly = false,
}: FormCheckboxProps) {
  return (
    <div className="flex items-center gap-12">
      <input
        type="checkbox"
        name={name}
        id={id}
        checked={checked}
        disabled={disabled}
        readOnly={readOnly}
        className="h-18 w-18 rounded border-stone-400 text-stone-700 focus:ring-stone-500"
      />
      <label htmlFor={id} className="flex-1 font-mono text-sm leading-relaxed">
        {label}
      </label>
    </div>
  )
}
