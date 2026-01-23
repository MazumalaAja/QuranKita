// ===== Base URL =====
const baseURL = "https://equran.id/api/v2/"

// ===== GET API =====
async function get(path) {
     const response = await fetch(baseURL + path);

     const result = await response.json();
     return result;
}

// ===== POST API =====
async function post(path, body) {
     const response = await fetch(baseURL + path, {
          method: "POST",
          headers: {
               "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
     });

     const result = await response.json();
     return result;
}

// ===== GET DETAIL =====
async function getDetail(path, id) {
     const response = await fetch(baseURL + path + id, {
          method: "GET",
          headers: {
               "Content-Type": "application/json"
          }
     });

     const result = await response.json();
     return result;
}

// ===== Exports =====
export { get, post, getDetail }