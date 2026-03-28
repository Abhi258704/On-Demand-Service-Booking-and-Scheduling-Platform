export const getServicesByCategory = async (categoryId: string) => {

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/services/category/${categoryId}`,
    { credentials: "include" }
  )

  const data = await res.json()
  return data.data
}

export const deleteService = async (id: string) => {

  await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/services/deleteService/${id}`,
    {
      method: "DELETE",
      credentials: "include"
    }
  )
}