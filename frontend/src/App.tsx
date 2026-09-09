import { useEffect, useState } from "react";

type User = {
    id: number;
    name: string;
}

export default function App() {
    const apiUrl = import.meta.env.VITE_API_BASE_URL as string | undefined;
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | undefined>(undefined);

    if (!apiUrl) {
        console.error("apiUrl is undefined");
        throw new Error("apiUrl is undefined");
    }

    useEffect(() => {
        fetch(apiUrl)
            .then((res) => {
                if (!res.ok) throw new Error("network error occured")
                return res.json();
            })
            .then((data: User[]) => {
                setUsers(data);
            })
            .catch((err) => {
                setError(err.message);
            });
    }, [apiUrl]);

    if (error) return <div>Error: {error}</div>

    return (
        <table border={1}>
            <thead>
                <tr>
                    <th>id</th>
                    <th>name</th>
                </tr>
            </thead>
            <tbody>
                {users.map(u => (
                    <tr key={u.id}>
                        <td>{u.id}</td>
                        <td>{u.name}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
