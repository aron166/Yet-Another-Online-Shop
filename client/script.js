async function fetchDatas() {
    try {
        const response = await fetch(`/api/product/:1`);
        if (!response.ok) throw new Error("Fetch failed", response.status);

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Could not fetch:", error.message);
    }
}

async function main() {
  fetchDatas();  
}
main();
//window.addEventListener('load', main);