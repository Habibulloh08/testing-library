import axios from "axios";
export const baseURL = "http://45.138.158.137:84/api/";
const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const api = axios.create({
    baseURL,
    withCredentials: false,
    headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6ImRiODNhYmRiLTA5Y2EtNDcwOC1hMmVkLTdkZTI3NDg1ZjdmNyIsInJvbGUiOiJCdXNpbmVzc093bmVyIiwidW5pcXVlX25hbWUiOiJIYWJpYnVsbG9oIiwiQnVzaW5lc3NPd25lcklkIjoiZGI4M2FiZGItMDljYS00NzA4LWEyZWQtN2RlMjc0ODVmN2Y3IiwiQ29tcGFueUlkIjoiZmQ1YTM0YjQtY2Y1ZC00NGQ2LThjZTYtMzFhM2UwMWU0MDA5IiwiQ29tcGFueUVtcGxveWVlSWQiOiJhZTNjOGI2MS0yZTJjLTQ0MmUtYTM5OC1kMTgyZTE1NzE0MzkiLCJIb2xkaW5nSWQiOiJmZDVhMzRiNC1jZjVkLTQ0ZDYtOGNlNi0zMWEzZTAxZTQwMDkiLCJuYmYiOjE3MzY5NTQ5ODQsImV4cCI6MTczNzA0MTM4NCwiaWF0IjoxNzM2OTU0OTg0LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MDgxIiwiYXVkIjoiRVJQLVN5c3RlbV9TZXJ2ZXIifQ.802HNEKps0jGIgkTC6QOgEoszb17rHv2oItLbPw6MYQ`,
        "X-User-TimeZone": timeZone,
        Accept: "application/json, text/plain, */*",
    },
});

export default api;