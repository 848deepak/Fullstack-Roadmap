import { useState } from 'react'

function MultiInputForm() {
  const [formData, setFormData] = useState({ name: '', email: '', role: '' })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((previous) => ({ ...previous, [name]: value }))
  }

  return (
    <form>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <input name="role" value={formData.role} onChange={handleChange} placeholder="Role" />
      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </form>
  )
}

export default MultiInputForm
