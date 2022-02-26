import { useEffect, useState } from "react";

const letterMap = {};
"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach(
    (c, i) =>
        (letterMap[c] = `${Array((i % 26) + 1)
            .fill("-")
            .join("")}`)
);

export default function App() {
    const [input, setInput] = useState("A zoo");
    const [isWide, setIsWide] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [isDark, setIsDark] = useState(false);

    function translate(string) {
        const words = string.split(" ");
        const mapped = words
            .map(word =>
                word
                    .split("")
                    .map(char => (letterMap[char] ? letterMap[char] : char))
                    .join(`${isWide ? "/" : "_"}`)
            )
            .join(`${isWide ? "\\" : "="}`);

        return mapped;
    }

    useEffect(() => {
        document.body.className = isDark ? "bg-dark text-secondary" : "bg-light text-dark";
    }, [isDark]);

    function toaster() {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    }

    return (
        <div className="container">
            <div className="mt-3 row justify-content-center text-center">
                <h1>
                    {isWide ? "Long" : "Tall"} Alphabet v1 <span onClick={() => setIsDark(!isDark)}>{isDark ? "☀️" : "🌚"}</span>
                </h1>
            </div>
            <div className="row justify-content-center text-center">
                <div className="col-12 col-md-4">
                    <button className={`btn ${isDark ? "btn-outline-warning" : "btn-dark"}`} onClick={() => setIsWide(!isWide)}>
                        Set to {isWide ? "Tall" : "Wide"} mode?
                    </button>
                </div>
            </div>

            <div className="row my-2 justify-content-center">
                <form>
                    <textarea className={`shadow-lg form-control ${isDark ? "bg-secondary text-light" : "bg-white"}`} value={input} onChange={e => setInput(e.target.value)} rows="6"></textarea>
                </form>
            </div>

            {input && (
                <div className="row justify-content-center text-center">
                    <div className="row justify-content-center">
                        <button onClick={() => setInput("It's reset!")} className={`col-11 col-sm-4 m-2 btn ${isDark ? "btn-outline-warning" : "btn-dark"}`}>
                            Reset Input
                        </button>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(translate(input));
                                toaster();
                            }}
                            className={`col-11 col-sm-4 m-2 btn ${isDark ? "btn-outline-warning" : "btn-dark"}`}>
                            Copy to clipboard?
                        </button>
                    </div>
                    {showToast && (
                        <div className="row text-warning">
                            <h4>Copied! Don't you dare paste this elsewhere.</h4>
                        </div>
                    )}
                    <h2>The input of "{input}" now becomes:</h2>
                    {isWide ? (
                        <h3>{translate(input)}</h3>
                    ) : (
                        <>
                            {translate(input)
                                .split("")
                                .map((c, i) => (
                                    <h3 key={`char-h3-${i}`} style={{ marginBottom: "-0.5rem" }}>
                                        {c}
                                    </h3>
                                ))}
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
