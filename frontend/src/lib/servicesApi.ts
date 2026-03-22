export const getServicesByCategory = async (categoryId: string) => {

  const res = await fetch(
    `http://localhost:8000/api/v1/services/category/${categoryId}`,
    { credentials: "include" }
  )

  const data = await res.json()
  return data.data
}

export const deleteService = async (id: string) => {

  await fetch(
    `http://localhost:8000/api/v1/services/deleteService/${id}`,
    {
      method: "DELETE",
      credentials: "include"
    }
  )
}