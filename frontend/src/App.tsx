export default function App() {
    const apiUrl = import.meta.env.VITE_API_BASE_URL as string | undefined;
    if (!apiUrl) {
        console.error("apiUrl is undefined");
    } else {
        const msg = fetch(apiUrl)
            .then(res => res.json())
            .then(data => data);
        console.log(msg);
    }
    return (
        <h1>Hello, world!</h1>
    );
}
