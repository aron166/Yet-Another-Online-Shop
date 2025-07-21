async function fetchDatas() {
    try {
        const response = await fetch(``);
        if (!response.ok) throw new Error("Fetch failed", response.status);

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Could not fetch:", error.message);
    }
}