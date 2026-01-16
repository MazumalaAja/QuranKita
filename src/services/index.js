const baseURL = "https://equran.id/api/v2/";

// function delay(ms) {
//      return new Promise((resolve) => setTimeout(resolve, ms));
// }

function GetApi(path) {
     return async () => {
          // // 🔴 Delay supaya loading kelihatan
          // await delay(5000);

          const response = await fetch(baseURL + path);

          if (!response.ok) {
               throw new Response("Gagal mengambil data", {
                    status: response.status,
               });
          }

          const result = await response.json();
          return result.data;
     };
}

export { GetApi };
