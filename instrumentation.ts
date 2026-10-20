export async function register() {
  // El backend simulado necesita APIs de Node (Buffer), así que solo se
  // instala en el runtime de Node, que es donde corren los Server
  // Components y las Server Actions.
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { installMockFetch } = await import("./mock/installFetch");
    installMockFetch();
  }
}
