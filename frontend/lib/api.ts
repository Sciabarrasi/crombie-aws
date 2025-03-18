export async function getTestData() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/test`);
    if (!res.ok) {
      throw new Error('Error al obtener datos del backend');
    }
    return res.json();
  }
  