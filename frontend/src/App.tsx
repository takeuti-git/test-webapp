export default function App() {
    const msg = fetch("http://localhost:8000")
        .then(res => res.json())
        .then(data => data);
    console.log(msg);
    return (
        <h1>Hello, world!</h1>
    );
}
