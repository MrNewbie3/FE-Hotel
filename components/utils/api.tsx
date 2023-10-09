import { cookies } from "next/headers";

export const getData = async () => {
  const token = cookies();
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API}kamar`, {
      headers: {
        Authorization: `Bearer ${token.get("token")?.value}`,
      },
    });
    const res = await data.json();
    if (res.statusCode === 403) {
      return "forbidden";
    }
    if (!res.success) {
      throw new Error(res.statusCode);
    }
    return res;
  } catch (error) {
    throw new Error(error as string);
  }
};
export const getDataRoomTypes = async () => {
  const token = cookies();
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API}types`, {
      headers: {
        Authorization: `Bearer ${token.get("token")?.value}`,
      },
      next: {
        revalidate: 5,
      },
    });
    const res = await data.json();
    if (res.statusCode === 403) {
      return "forbidden";
    }
    if (!res.success) {
      throw new Error(res.statusCode);
    }
    return res;
  } catch (error) {
    throw new Error(error as string);
  }
};
export const getDataUser = async () => {
  const token = cookies();
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API}user`, {
      headers: {
        Authorization: `Bearer ${token.get("token")?.value}`,
      },
    });
    const res = await data.json();
    if (res.statusCode === 403) {
      return "forbidden";
    }
    if (!res.success) {
      throw new Error(res.msg);
    }
    return res;
  } catch (error) {
    throw new Error(error as string);
  }
};
export const getDataTrx = async (id: number) => {
  const token = cookies();
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API}transaksi/${id}`, {
      headers: {
        Authorization: `Bearer ${token.get("token")?.value}`,
      },
    });
    const res = await data.json();
    if (res.statusCode === 403) {
      return "forbidden";
    }
    if (!res.success) {
      throw new Error(data.status as any as string);
    }
    return res;
  } catch (error) {
    throw new Error(error as string);
  }
};
export const getAllDataTrx = async () => {
  const token = cookies();
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API}transaksi`, {
      headers: {
        Authorization: `Bearer ${token.get("token")?.value}`,
      },
    });
    const res = await data.json();
    if (res.statusCode === 403) {
      return "forbidden";
    }
    if (!res.success) {
      throw new Error(data.status as any as string);
    }
    return res;
  } catch (error) {
    throw new Error(error as string);
  }
};
export const getAuth = async () => {
  const token = cookies();
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API}auth/user`, {
      headers: {
        Authorization: `Bearer ${token.get("token")?.value}`,
      },
    });
    const res = await data.json();
    if (!data.ok) {
      throw new Error(res);
    }
    return res;
  } catch (error) {
    throw new Error(error as string);
  }
};
