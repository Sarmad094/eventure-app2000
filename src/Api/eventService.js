export async function fetchEvents(id) {
  const response = await fetch(`http://localhost:8080/api/events/${id}`);
  if (!response.ok) {
    throw new Error("Feil ved henting av events");
  }
  return await response.json();
}
